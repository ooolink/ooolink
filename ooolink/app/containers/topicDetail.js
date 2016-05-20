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
    View,
    TouchableOpacity,
    PropTypes
} from 'react-native';
import LoadingBlock from '../common/components/loadingBlock';
import TopicBar from '../components/topicbar';
import HtmlComponent from '../common/htmlRender/htmlComponent';
import Publish from '../containers/publish';
import {USER_DEFAULT_HEAD} from '../constants/config';
import {UriDeal, WordLineDeal, timeDeal} from '../utils';
import {getGlobal} from '../store';
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

// class CommentBlock extends Component {
//     render() {
//         let data = this.props.data, avatar = UriDeal(data.author.avatar_url);
//         return (
//             <View style={styles.commentBlock}>
//                 <Text style={styles.rowNumber}>{(parseInt(this.props.rowID) + 1) + '楼'}</Text>
//                 <HtmlComponent
//                     content={data.content}
//                 />
//                 <View style={styles.commentInfo}>
//                     <Image
//                         style={styles.authorHead}
//                         source={{uri: avatar ? avatar : USER_DEFAULT_HEAD }}/>
//                     <Text style={styles.authorName}>{data.author.loginname}</Text>
//                     <Text style={styles.createTime}>{timeDeal(data.create_at)}</Text>
//                 </View>
//             </View>
//         );
//     }
// }

class TopicDetail extends Component {

    static propTypes = {
        style: View.propTypes.style,
        navigator: PropTypes.object,
        topicId: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            likeStatus: 'loading'
        }
    }

    render() {
        let topic = this.props.state.content.topic;
        let com;
        if (topic) {
            com = <ContentBlock data={topic}/>
        } else {
            com = <LoadingBlock/>
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
            </View>
        );
    }

    componentDidMount() {
        // let {currentSite} = this.props.state.app;
        // collectService.judgeCollected(getGlobal('oooLinkToken'), currentSite, this.props.topicId, (rs)=>{
        //     let status = rs && rs.result ? 'ok' : 'none',
        //         collectionId = rs.id;
        //     this.setState({likeStatus: status, collectionId});
        // });   
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
        let {currentSite, siteInfo} = this.props.state.app;
        let {themeSelected} = this.props.state.home;

        if (this.state.likeStatus === 'none') {
            let {data} = this.props.state.content.comments[this.props.topicId];
            collectService.collected(currentSite, siteInfo[currentSite].title, data.title, data.content.substr(0, 1000), this.props.topicId, themeSelected, getGlobal('oooLinkToken'), (rs)=> {
                if (rs && rs.result) {
                    this.props.actions.collectTopic(rs.id, currentSite, siteInfo[currentSite].title, this.props.topicId, data.title, rs.created);
                    this.setState({
                        likeStatus: 'ok',
                        collectionId: rs.id
                    });
                } else {
                    this.setState({
                        likeStatus: 'none'
                    });
                }
            })
        } else if (this.state.likeStatus === 'ok') {
            let collections = this.props.state.content.collections, len = collections.length;
            if (this.state.collectionId === null) {
                return;
            }
            collectService.uncollected(this.state.collectionId, getGlobal('oooLinkToken'), (rs)=> {
                if (rs && rs.result) {
                    this.props.actions.unCollectionTopic(this.state.collectionId, currentSite, this.props.topicId);
                    this.setState({
                        likeStatus: 'none',
                        collectionId: null
                    });
                } else {
                    this.setState({
                        likeStatus: 'ok'
                    });
                }
            })
        }
        this.setState({
            likeStatus: 'loading'
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
        backgroundColor: '#2F85A7dd',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: '900'
    }
});

export default TopicDetail;