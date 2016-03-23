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
import {USER_DEFAULT_HEAD} from '../constants/config';
import {UriDeal, WordLineDeal, timeDeal} from '../utils';
import * as collectService from '../services/collectService';

let {height, width} = Dimensions.get('window');

class ContentBlock extends Component {
    render() {
        let data = this.props.data,
            avatar = UriDeal(data.author.avatar_url);
        return (
            <View style={styles.contentBlock}>
                <Text style={styles.contentTitle}>{data.title}</Text>
                <Image
                    style={styles.authorHead}
                    source={{uri:avatar ? avatar : USER_DEFAULT_HEAD}}
                />
                <HtmlComponent
                    content={data.content}
                />
            </View>
        );
    }
}

class CommentBlock extends Component {
    render() {
        let data = this.props.data, avatar = UriDeal(data.author.avatar_url);
        return (
            <View style={styles.commentBlock}>
                <Text style={styles.rowNumber}>{(parseInt(this.props.rowID) + 1) + '楼'}</Text>
                <HtmlComponent
                    content={data.content}
                />
                <View style={styles.commentInfo}>
                    <Image
                        style={styles.authorHead}
                        source={{uri: avatar ? avatar : USER_DEFAULT_HEAD }}/>
                    <Text style={styles.authorName}>{data.author.loginname}</Text>
                    <Text style={styles.createTime}>{timeDeal(data.create_at)}</Text>
                </View>
            </View>
        );
    }
}

class CommentsList extends Component {

    static propTypes = {
        style: View.propTypes.style,
        navigator: PropTypes.object,
        topicId: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            likeStatus: 'none'
        }
    }

    render() {
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const comments = this.props.state.content.comments[this.props.topicId];
        dataSource = dataSource.cloneWithRows(comments ? comments.data.replies : []);

        let com;
        if (comments) {
            com = <ListView
                style={[this.props.style, {backgroundColor:'#fff', marginTop:40}]}
                dataSource={dataSource}
                renderHeader={this._renderHeader.bind(this)}
                renderRow={this._renderRow.bind(this)}
            />;
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
            </View>
        );
    }

    _renderHeader() {
        if (!this.contentBlock) {
            let {data} = this.props.state.content.comments[this.props.topicId];
            this.contentBlock = <ContentBlock data={data}/>
        }
        return this.contentBlock;
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <CommentBlock
                data={rowData} rowID={rowID}/>
        )
    }

    onBack() {
        this.props.navigator.pop();
    }

    onLike() {
        if (this.state.likeStatus === 'none') {
            this.setState({
                likeStatus: 'loading'
            });
            let {currentSite} = this.props.state.app;
            let {themeSelected} = this.props.state.home;
            let {data} = this.props.state.content.comments[this.props.topicId];

            collectService.collected(currentSite, data.title, data.content.substr(0, 1000), this.props.topicId, themeSelected, 'ec415af0b6acc6597f3477b7f4a15838b019e2839988ec04636ea8024bfe43bf', ()=> {
                this.setState({
                    likeStatus: 'ok'
                });
            })
        } else if (this.state.likeStatus === 'like') {

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#fff'
    },
    contentBlock: {
        padding: 6,
        borderBottomWidth: 10,
        borderBottomColor: '#333'
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
        color: '#22b473',
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
    }
});

export default CommentsList;