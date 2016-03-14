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

import HtmlComponent from '../common/htmlRender/htmlComponent';
import {USER_DEFAULT_HEAD} from '../constants/config';
import {UriDeal, WordLineDeal, timeDeal} from '../utils';

let {height, width} = Dimensions.get('window');

class ContentBlock extends Component {
    render() {
        return (
            <View></View>
        );
    }
}

class CommentBlock extends Component {
    render() {
        let data = this.props.data, avatar = data.author.avatar_url;
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

const styles = StyleSheet.create({
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

class CommentsList extends Component {

    static propTypes = {
        style: View.propTypes.style,
        navigator: PropTypes.object
    };

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data.comments.replies)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data.comments.replies)
        });
    }

    render() {
        return (
            <ListView
                style={[this.props.style, {backgroundColor:'#fff'}]}
                dataSource={this.state.dataSource}
                renderHeader={this._renderHeader.bind(this)}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }

    _renderHeader() {
        if (!this.contentBlock) {
            this.contentBlock = <ContentBlock data={this.props.data.comments}/>
        }
        return this.contentBlock;
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <CommentBlock
                data={rowData} rowID={rowID}/>
        )
    }
}

export default CommentsList;