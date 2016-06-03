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
    Image,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    Navigator,
    ListView,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import {UriDeal, WordLineDeal, timeDeal, numberDeal} from '../utils';

class CommentBlock extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let data = this.props.data;
        data.userInfo.user_image = UriDeal(data.userInfo.user_image);
        return (
            <View style={styles.blockContainer}>
                <View style={styles.headBlock}>
                    <View style={{flexDirection: 'row'}}>
                        <Image 
                            source={{uri: data.userInfo.user_image}}
                            style={styles.headImage} />
                        <Text style={styles.userName}>
                            {data.userInfo.user_realname}
                        </Text>
                    </View>
                    <Text style={styles.time}>{timeDeal(data.created)}</Text>
                </View>
                <Text style={styles.content}>
                    {data.content}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    blockContainer:{
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    headBlock: {
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 0,
        justifyContent: 'space-between'
    },
    time:{
        fontSize: 11,
        color:'#666'
    },
    headImage: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10
    },
    userName:{
        fontWeight: '900',
        fontSize: 13,
        lineHeight: 18,
        color:'#222'
    },
    content:{
        color: '#555',
        padding: 10
    }
});

export default CommentBlock;



