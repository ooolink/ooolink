/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React,{
    Component,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    Dimensions,
    TextInput,
    View,
    Picker,
    TouchableOpacity,
    PropTypes,
    Alert
} from 'react-native';
import LoadingBlock from '../common/components/loadingBlock';
import WebView from '../common/components/webview';
import TopicBar from '../components/topicbar';
import TypeChooseModal from '../components/typeChooseModal';
import HtmlComponent from '../common/htmlRender/htmlComponent';
import OperateLoading from '../common/components/operateLoading'
import Comments from './comments';
import Login from './loginContainer';
import {updateUserCollectionType} from '../actions/user';
import {USER_DEFAULT_HEAD} from '../constants/config';
import {UriDeal, WordLineDeal, timeDeal, numberDeal} from '../utils';
import {getGlobal, setGlobal} from '../store';
import {TO_PUBLISH_COMMENT} from '../constants/passAgreement';
import * as collectService from '../services/collectService';

let {height, width} = Dimensions.get('window');

class ContentBlock extends Component {
    render() {
        let data = this.props.data,
            avatar = UriDeal(data.author.author_avatar);
        return (
            <ScrollView style={styles.contentBlock}>
                <Text style={styles.contentTitle}>{data.title}</Text>
                <View style={styles.infoBlock}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.authorHead}
                            source={{uri:avatar ? avatar : USER_DEFAULT_HEAD}}
                        />
                        <Text style={styles.authorName}>{data.author.author_name + ' 发表于' + timeDeal(data.created)}</Text>
                    </View>
                    <Text style={styles.readtime}>{'约需' + timeDeal(data.quantity.view_avetime_general, 'read')}</Text>
                </View>
                <View style={styles.line}/>
                <View style={{padding: 8, paddingBottom: 40}}>
                    <HtmlComponent
                        content={data.content}
                    />
                    <TouchableOpacity 
                    onPress={this.props.openOrigin.bind(this, data.url)}
                    style={{width: 100, height: 50}}>
                    <Text style={styles.watchOrigin}>查看原文</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

class TopicDetail extends Component {

    static propTypes = {
        style: View.propTypes.style,
        topicId: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            likeStatus: 'loading',
            isPressLike: false,
            isOperating: false,
            isRequested: false
        }
    }

    render() {
        let contentid = this.props.topicId;
            content = this.props.state.content.content[contentid];

        let com, modalCom = null;
        if (this.state.isRequested && content) {
            com = <ContentBlock 
            openOrigin={this.openOrigin.bind(this)}
            data={content}/>
        } else {
            com = <LoadingBlock/>
        }

        if (this.state.isPressLike){
            modalCom = <TypeChooseModal 
                            state={this.props.state}
                            userCollectionTypes={this.props.state.user.userCollectionTypes}
                            onCollect = {this.onCollect.bind(this)}
                            onClose={()=>{this.setState({isPressLike: false})}}
                        />
        }

        return (
            <View style={styles.container}>
                <TopicBar
                    likeStatus={this.state.likeStatus}
                    onLike={this.onLike.bind(this)}
                    onBack={this.onBack.bind(this)}/>
                {com}
                <TouchableOpacity
                    style={styles.publishBlockWrap}
                    onPress={this.onPublish.bind(this)}
                >
                    <Image
                        style={styles.icon}
                        source={require('../images/content-comment.png')}/>
                    <Text style={styles.countText}>{numberDeal(content ? content.quantity.comment_count : 0)}</Text>
                </TouchableOpacity>
                {modalCom}
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        );
    }

    componentDidMount() {
        let token = this.props.state.user.userToken,
            contentid = this.props.topicId;

        collectService.judgeCollected(token, contentid, rs=>{
            let status = rs && rs.result === 1 && rs.data === 1 ? 'ok' : 'none';
            this.setState({likeStatus: status});
        });
        setTimeout(()=>{
            let contentid = this.props.topicId,
                content = this.props.state.content.content[contentid];
            !content && this.props.actions.getTopic(this.props.topicId);
            this.setState({isRequested: true});
        }, 500);
    }

    onPublish(){
        let contentid = this.props.topicId;
        this.props.navigator.push({
            name: 'Comments',
            component: Comments,
            props: {
                contentid,
                type: TO_PUBLISH_COMMENT
            }
        });
    }

    openOrigin(url){
        let contentid = this.props.topicId;
        this.props.navigator.push({
            name: 'WebView',
            component: WebView,
            props: {
                contentid,
                url
            }
        })
    }

    onBack() {
        this.props.navigator.pop();
    }

    onLike() {
        let token = this.props.state.user.userToken,
            userIsLogon = this.props.state.user.userIsLogon;
        //未登陆直接跳出
        if (!token || !userIsLogon){    
            this.goToLogin();
        }

        let types = this.props.state.user.userCollectionTypes;
        if (this.state.likeStatus === 'none') {
            this.setState({operateLoading: true});
                if (types){
                    this.setState({
                        isPressLike: true,
                        operateLoading: false
                    });
                } else {
                        collectService.getUserCollectionType(token, rs=>{
                            if (rs && rs.result === 1){
                                this.props.actions.updateUserCollectionType(rs.data);
                                this.setState({operateLoading: false, isPressLike: true});
                            } else {
                                this.setState({operateLoading: false});
                                if (rs && rs.result === 401){
                                    this.props.navigator.push({
                                        name: 'Login',
                                        component: Login
                                    });
                                }
                            }                            
                        });
                }
        } else if (this.state.likeStatus === 'ok') {
            this.setState({likeStatus: 'loading'});
                collectService.uncollected(this.props.topicId, token, rs=>{
                    if (rs && rs.result === 1){
                        this.setState({likeStatus: 'none'});
                    } else {
                        this.setState({likeStatus: 'ok'});
                        if (rs && rs.result === 401){
                            this.goToLogin();
                        }
                    }
                });
        }
    }

    onCollect(type){
        this.setState({likeStatus: 'loading', isPressLike: false});
        let token = this.props.state.user.userToken;
            collectService.collected(this.props.topicId, token, type, rs=>{
                if (rs && rs.result === 1) {
                    this.setState({likeStatus: 'ok'});
                } else {
                    this.setState({likeStatus: 'none'});
                    if (rs && rs.result === 401){
                        this.goToLogin();
                    }
                }
            });
    }

    goToLogin(){
        this.props.navigator.push({
            name: 'Login',
            component: Login
        });  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentBlock: {
        marginTop: 50
    },
    contentTitle: {
        fontWeight: '900',
        fontSize: 20,
        margin: 5,
        lineHeight: 30
    },
    line: {
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        width
    },
    commentBlock: {
        width,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 10
    },
    rowNumber: {
        color: '#2F85A7',
        fontSize: 12,
        fontWeight: '900'
    },
    createTime: {
        color: '#333',
        fontSize: 11,
        marginTop: 15.5,
        marginLeft: 10
    },
    commentInfo: {
        flexDirection: 'row'
    },
    authorName: {
        color: '#333',
        fontSize: 11,
        lineHeight: 18,
        marginLeft: 4
    },
    authorHead: {
        width: 24,
        height: 24,
        borderRadius: 12
    },
    infoBlock: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 10
    },
    readtime: {
        color: '#333',
        fontSize: 11,
        lineHeight: 18
    },
    publishBlockWrap:{
        position: 'absolute',
        left: width - 100,
        top: height - 120,
        height: 60,
        width: 60,
        backgroundColor: '#65b278dd',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 15,
        width: 15
    },
    countText: {
        color: '#fff',
        backgroundColor: '#00000000',
        fontSize: 11,
        width: 30,
        textAlign:'center'
    },
    countBlock:{
        flexDirection: 'row'
    },
    watchOrigin:{
        margin: 10,
        marginBottom: 0,
        fontWeight: '900',
        color: '#333',
        fontSize: 16
    }
});

export default TopicDetail;