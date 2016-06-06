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
    StyleSheet,
    Dimensions,
    Navigator,
    TouchableOpacity,
    Platform,
    ListView,
    View
} from 'react-native';
const {width, height} = Dimensions.get('window');

class Message extends Component{

    constructor(props){
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([])
        }
    }

    render(){
        let {messages} = this.props.state.message;
        if (messages.length === 0){
            return (
                <View> 
                    <Text style={styles.empty}>没有消息~</Text>
                </View>
            );
        }
        return ( 
            <View style={{flex: 1}}>
                <ListView
                    style={styles.list}
                    pageSize={5}
                    dataSource={this.state.dataSource.cloneWithRows(messages)}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID){
        return (
        <View style={styles.block}>
            <View style={{width, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.type}>平台通知</Text>
                <Text style={styles.time}>{new Date(rowData.message_created).toLocaleString()}</Text>
            </View>
            <Text style={styles.title}>{rowData.message_title}</Text>
            <Text style={styles.content}>{rowData.message_content}</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    list:{
        flex: 1
    },
    title: {
        color: '#fff',
        marginBottom: 4,
        fontWeight: '900'
    },
    content: {
        marginBottom: 4,
        color: '#fff'
    },
    type: {
        marginBottom: 4,
        color: '#65b278'
    },
    empty:{
        color: '#fff',
        width,
        textAlign: 'center',
        marginTop: 50
    },
    block:{
        borderBottomWidth: 2,
        borderBottomColor:'#333',
        width,
        padding: 10
    },
    time:{
        textAlign: 'left',
        fontSize: 11,
        color:'#fff', 
        marginRight: 15
    }
});

export default Message;

















