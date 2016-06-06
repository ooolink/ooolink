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
import {USER_DEFAULT_HEAD} from '../../constants/config';
import {UriDeal, WordLineDeal, timeDeal, numberDeal} from '../../utils';

let {height, width} = Dimensions.get('window');

class TopicBlock extends Component {
    render() {
        let data = this.props.data, 
            bgImage = UriDeal(data.image),
            avatar = data.author ? UriDeal(data.author.author_avatar) : USER_DEFAULT_HEAD;
        let cs = bgImage ? [styles.topicBg] : [styles.topicBg, {borderBottomColor: '#000',borderBottomWidth: 2}];
        let tag = data.theme[0] ? data.theme[0] : data.classes.specific_class[0];
        return (
            <View style={cs}>
            <TouchableOpacity
                style={styles.topicBg}
                onPress={this._onSelectTopic.bind(this)}
            >
                <Image
                    source={{uri: bgImage}}
                    style={styles.topicBg}>
                </Image>
                <View style={styles.cover}/>
                <Text style={styles.tag}>{tag}</Text>
                <Text style={styles.readtime}>{'读完大概需要' + timeDeal(data.quantity.view_avetime_general, 'read')}</Text>
                <Image
                    style={styles.authorHead}
                    source={{uri: avatar ? avatar : USER_DEFAULT_HEAD }}
                />
                <Text style={styles.username}>{data.author.author_name + '  发表于' + timeDeal(data.created)}</Text>
                <Text
                    style={styles.title}
                >{WordLineDeal(data.title, width - 100, 16, 2)}</Text>
                <View style={styles.countContainer}>
                    <Image
                        style={styles.commentIcon}
                        source={require('../../images/content-comment.png')}/>
                    <Text style={styles.countText}>{numberDeal(data.quantity.comment_count)}</Text>
                    <Image
                        style={styles.starIcon}
                        source={require('../../images/star-none-white.png')}/>
                    <Text style={styles.countText}>{numberDeal(data.quantity.collect_count)}</Text>
                </View>
            </TouchableOpacity>
            </View>
        );
    }

    _onSelectTopic() {
        this.props.onSelectTopic(this.props.data.content_id);
    }
}

const styles = StyleSheet.create({
    topicBg: {
        height: 150,
        width
    },
    cover:{
        position:'absolute',
        top: 0,
        width,
        height: 150,
        backgroundColor: '#22222299'
    },
    tag:{
        backgroundColor: '#00000000',
        color: '#65b278',
        fontWeight: '900',
        position: 'absolute',
        top: 10,
        left: 15
    },
    readtime:{
        position: 'absolute',
        top: 14,
        left: width - 105,
        color: '#fff',
        backgroundColor: '#00000000',
        fontSize: 10
    },
    username: {
        color: '#fff',
        position: 'absolute',
        top: 115,
        left: 45,
        textAlign: 'left',
        fontSize: 10,
        backgroundColor: '#00000000',
    },
    title: {
        color: '#fff',
        fontWeight: '900',
        position: 'absolute',
        backgroundColor: '#00000000',
        width: width - 80,
        fontSize: 16,
        top: 40,
        left: 15,
        lineHeight: 30
    },
    authorHead: {
        position: 'absolute',
        top: 110,
        left: 15,
        height: 26,
        width: 26,
        borderRadius: 13
    },
    countContainer: {
        backgroundColor: '#00000000',
        position: 'absolute',
        left: width - 100,
        top: 115,
        height: 20,
        flexDirection: "row"
    },
    commentIcon: {
        height: 15,
        width: 15
    },
    starIcon: {
        height: 15,
        width: 15
    },
    countText: {
        color: '#fff',
        backgroundColor: '#00000000',
        marginLeft: 2,
        fontSize: 11,
        width: 30,
        height: 20
    }
});

export default TopicBlock;