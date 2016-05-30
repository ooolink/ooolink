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
    ListView,
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
import TopicBar from '../components/topicbar';
import HtmlComponent from '../common/htmlRender/htmlComponent';
import OperateLoading from '../common/components/operateLoading'
import Publish from './publish';
import Login from './loginContainer';
import {USER_DEFAULT_HEAD} from '../constants/config';
import {UriDeal, WordLineDeal, timeDeal} from '../utils';
import {getGlobal, setGlobal} from '../store';
import {TO_PUBLISH_COMMENT} from '../constants/passAgreement';
import * as collectService from '../services/collectService';

let {height, width} = Dimensions.get('window');

function getId(arr, name){
    for (let i = 0, len = arr.length; i < len; i++){
        if (arr[i].name === name){
            return arr[i].id;
        }
    }
}

class ContentBlock extends Component {
    render() {
        let data = this.props.data,
            avatar = UriDeal(data.author.author_avatar);
        return (
            <ScrollView style={styles.contentBlock}>
                <Text style={styles.contentTitle}>{data.title}</Text>
                <Image
                    style={styles.authorHead}
                    source={{uri:avatar ? avatar : USER_DEFAULT_HEAD}}
                />
                <HtmlComponent
                    content={data.content}
                />
            </ScrollView>
        );
    }
}

class TypeChooseModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemChoose: 'default',
            isCreating: false,
            createValue: '',
            isOperating: false,
            userCollectionTypes: this.props.userCollectionTypes
        }
    }

    render(){
        let createCom = this.state.isCreating ? 
        <View style={{flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1}}>
            <TextInput 
            placeholder={'输入收藏夹名字'}
            style={{fontSize: 12, width: 150, height: 30, padding: 5}}
            onChangeText={(text) => this.setState({createValue: text})}
            value={this.state.createValue}/>
            <Text 
            onPress={this.create.bind(this)}
            style={{width: 50, height: 30, backgroundColor: '#65b278', color: '#fff', textAlign: 'center', lineHeight: 20}}>确定</Text>
        </View>
         : null;
        let pickerItems = [];
        this.state.userCollectionTypes.forEach((item, idx)=>{
            pickerItems.push(
                <Picker.Item key={idx+1} style={styles.typePikerItem} label={`${item.name}`} value={`${item.name}`} />
            );
        });
        return (
            <View style={styles.wrap}>
                <View
                    style={styles.typePicker}
                >
                    <View>
                        <Text style={styles.typePickerTitle}>
                            选择收藏夹
                        </Text>
                        <TouchableOpacity
                                style={{position: 'absolute', top: 10, left: 10}}
                                onPress={this.props.onClose.bind(this)}
                            >
                            <Image style={{width: 10, height: 10}} source={require('../images/login-close.png')}/>
                        </TouchableOpacity> 
                        <Text 
                        onPress={this.onCreateCollectionFolder.bind(this)}
                        style={{position: 'absolute', top: 6, left: 165, backgroundColor:'#00000000', color:'#fff', fontWeight: '900'}}>
                        {this.state.isCreating ? '取消' : '新建'}
                        </Text>                       
                    </View>
                    {createCom}
                    <Picker
                        style={{height: 200}}
                        selectedValue={this.state.itemChoose}
                        onValueChange={itemChoose=>this.setState({itemChoose})}
                    >
                    {pickerItems}
                    </Picker>
                    <Text 
                        onPress={this.props.onCollect.bind(this, getId(this.state.userCollectionTypes, this.state.itemChoose))}
                        style={styles.typePickerButton}>收藏</Text>
                </View>
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        )
    }

    onCreateCollectionFolder(){
        this.setState({isCreating: !this.state.isCreating});
    }

    create(){
        if (!this.state.createValue){
            return;
        }
        this.setState({isOperating: true});
        getGlobal('oooLinkToken', token=>{
            collectService.createUserCollectionType(token, this.state.createValue, rs=>{
                if (rs && rs.result === 1){
                    let uct = this.state.userCollectionTypes;
                    uct.unshift({name: this.state.createValue, id: rs.data});
                    setGlobal('userCollectionTypes', uct, 1000*60*5);
                    this.setState({isOperating: false, createValue: '', userCollectionTypes: uct, isCreating: false});
                } else if (rs && rs.result === 0) {
                    Alert.alert('新建失败');
                    this.setState({isOperating: false});
                }
            });
        });
    }
}

class TopicDetail extends Component {

    static propTypes = {
        style: View.propTypes.style,
        navigator: PropTypes.object,
        topicId: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            likeStatus: 'loading',
            isPressLike: false,
            isOperating: false,
            userCollectionTypes: []
        }
    }

    render() {
        let topic = this.props.state.content.topic;
        let com, modalCom = null;
        if (topic && topic.content_id === this.props.topicId) {
            com = <ContentBlock data={topic}/>
        } else {
            com = <LoadingBlock/>
        }

        if (this.state.isPressLike){
            modalCom = <TypeChooseModal 
                            userCollectionTypes={this.state.userCollectionTypes}
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
                <Text style={styles.publishButton} onPress={this.onPublish.bind(this)}>
                    跟帖
                </Text>
                {modalCom}
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        );
    }

    componentDidMount() {
        getGlobal('oooLinkToken', token=>{
            collectService.judgeCollected(token, this.props.topicId, rs=>{
                let status = rs && rs.result === 1 && rs.data === 1 ? 'ok' : 'none';
                this.setState({likeStatus: status});
            });
        });
        setTimeout(()=>{
            this.props.actions.getTopic(this.props.topicId);
        }, 500);
    }

    onPublish(){
        this.props.navigator.push({
            name: 'publish',
            index: 5,
            component: Publish,
            props: {
                type: TO_PUBLISH_COMMENT
            }
        });
    }

    onBack() {
        this.props.navigator.pop();
    }

    onLike() {
        if (this.state.likeStatus === 'none') {
            this.setState({operateLoading: true});
            getGlobal('userCollectionTypes', types=>{
                if (types !== undefined){
                    this.setState({
                        userCollectionTypes: types,
                        isPressLike: true
                    });
                } else {
                    getGlobal('oooLinkToken', token=>{
                        collectService.getUserCollectionType(token, rs=>{
                            if (rs && rs.result === 1){
                                this.setState({userCollectionTypes: rs.data, operateLoading: false, isPressLike: true});
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
                    });
                }
            });
        } else if (this.state.likeStatus === 'ok') {
            this.setState({likeStatus: 'loading'});
            getGlobal('oooLinkToken', token=>{
                collectService.uncollected(this.props.topicId, token, rs=>{
                    if (rs && rs.result === 1){
                        this.setState({likeStatus: 'none'});
                    } else {
                        this.setState({likeStatus: 'ok'});
                        if (rs && rs.result === 401){
                            this.props.navigator.push({
                                name: 'Login',
                                component: Login
                            });
                        }
                    }
                });
            });
        }
    }

    onCollect(type){
        this.setState({likeStatus: 'loading', isPressLike: false})
        getGlobal('oooLinkToken', token=>{
            collectService.collected(this.props.topicId, token, type, rs=>{
                if (rs && rs.result === 1) {
                    this.setState({likeStatus: 'ok'});
                } else {
                    this.setState({likeStatus: 'none'});
                    if (rs && rs.result === 401){
                        this.props.navigator.push({
                            name: 'Login',
                            component: Login
                        });
                    }
                }
            });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentBlock: {
        marginTop: 50,
        padding: 6
    },
    contentTitle: {
        fontWeight: '900'
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
        marginTop: 15.5,
        marginLeft: 10
    },
    authorHead: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginTop: 10
    },
    publishButton: {
        position: 'absolute',
        top: height - 40,
        height: 40,
        width,
        backgroundColor: '#65b278dd',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: '900'
    },
    wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: '#999999cc'
    },
    typePicker:{
        top: height/2 - 130,
        width: 200,
        height: 260,
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    typePikerItem:{
        fontWeight: '900'
    },
    typePickerTitle:{
        backgroundColor:'rgb(41,44,52)',
        width: 200,
        height: 30,
        textAlign: 'center',
        color: '#fff',
        lineHeight: 20
    },
    typePickerButton:{
        width: 200,
        height: 30,
        textAlign: 'center',
        color: '#fff',
        lineHeight: 20,
        fontWeight: '900',
        backgroundColor: '#65b278'
    }
});

export default TopicDetail;