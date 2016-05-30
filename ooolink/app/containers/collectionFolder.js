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
    Navigator,
    TouchableOpacity,
    View,
    PropTypes,
    TextInput,
    Alert
} from 'react-native';
import LoadingBlock from '../common/components/loadingBlock';
import TopBar from '../common/components/topBar';
import TopicsList from '../components/topicslistWithoutBg'
import TopicDetail from './topicDetail';
import * as collectService from '../services/collectService';
import {setGlobal, getGlobal} from '../store';

class CollectionFolder extends Component{
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            collections: null
        }
    }

    render(){

        let cfCom = this.state.collections ? 
        <TopicsList
            data={this.state.collections}
            onSelectTopic={this.onSelectTopic.bind(this)}
        /> :
        <LoadingBlock/>
        
        return (
            <View style={{flex: 1}}>
                <TopBar
                    backText={`收藏夹-${this.props.type}`}
                    onBack={()=>{this.props.navigator.pop()}}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.typeText}>{this.props.type}</Text>
                    <Text style={styles.countText}>{`共 ${this.props.count} 篇收藏`}</Text>
                </View>
                {cfCom}
            </View>
        );
    }

    onSelectTopic(item){
        this.props.navigator.push({
            name: 'TopicDetail',
            index: 1,
            component: TopicDetail,
            props: {
                topicId: item.content_id
            }
        });  
    }

    componentDidMount() {
        getGlobal('oooLinkToken', token=>{
            collectService.getCollectionsDetail(token, this.props.type, rs=>{
                this.setState({collections: rs.data});
            });
        });
    }
}

const styles=StyleSheet.create({
    titleContainer:{
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    typeText: {
        fontSize: 16,
        fontWeight: '900'
    },
    countText: {
        fontSize: 14,
        color: '#aaa'
    }
});

export default CollectionFolder;





