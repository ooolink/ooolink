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
import {USER_DEFAULT_HEAD} from '../constants/config';
import {UriDeal, WordLineDeal} from '../utils';

let {height, width} = Dimensions.get('window');

class TopicBlock extends Component {
    render() {
        let data = this.props.data, avatar = UriDeal(data.author.avatar_url);
        return (
            <TouchableOpacity
                onPress={this._onSelectTopic.bind(this)}
            >
                <View
                    style={styles.topic}>
                    <Image
                        style={styles.authorHead}
                        source={{uri: avatar ? avatar : USER_DEFAULT_HEAD }}
                    />
                    <Text style={styles.username}>{data.author.loginname}</Text>
                    <Text
                        style={styles.title}
                    >{WordLineDeal(data.title, width - 130, 13, 2)}</Text>
                    <View style={styles.countContainer}>
                        <Image
                            style={styles.commentIcon}
                            source={require('../images/content-comment.png')}/>
                        <Text style={styles.countText}>{data.reply_count}</Text>
                        <Image
                            style={styles.viewIcon}
                            source={require('../images/content-view.png')}/>
                        <Text style={styles.countText}>{data.visit_count}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _onSelectTopic() {
        this.props.onSelectTopic(this.props.data.id);
    }
}

const styles = StyleSheet.create({
    topic: {
        height: 100,
        borderRadius: 3,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        width: width - 30,
        backgroundColor: '#FFF'
    },
    username: {
        position: 'absolute',
        top: 80,
        width: 80,
        textAlign: 'center',
        fontSize: 10,
        backgroundColor: 0
    },
    title: {
        position: 'absolute',
        width: width - 130,
        fontSize: 13,
        top: 20,
        left: 85
    },
    authorHead: {
        position: 'absolute',
        top: 20,
        left: 15,
        height: 50,
        width: 50,
        borderRadius: 25
    },
    countContainer: {
        backgroundColor: 0,
        position: 'absolute',
        left: width - 135,
        top: 80,
        height: 20,
        flexDirection: "row"
    },
    commentIcon: {
        height: 10,
        width: 10
    },
    viewIcon: {
        height: 10,
        width: 10
    },
    countText: {
        marginLeft: 2,
        fontSize: 11,
        width: 40,
        height: 20
    }
});

class TopicsList extends Component {

    static propTypes = {
        style: View.propTypes.style,
        onSelectTopic: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
        })
    }

    render() {
        if (this.props.data.length > 0) {
            return (
                <ListView
                    style={this.props.style}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            );
        } else {
            return <LoadingBlock/>
        }
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TopicBlock
                onSelectTopic={this.props.onSelectTopic}
                data={rowData}/>
        )
    }
}

export default TopicsList;