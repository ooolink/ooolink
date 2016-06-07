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
    TextInput,
    ListView,
    Text,
    Image,
    Dimensions,
    View,
    TouchableOpacity,
    PropTypes
} from 'react-native';
import TopicDetail from './topicDetail'
import TopBar from '../common/components/topBar';
import OperateLoading from '../common/components/operateLoading';
import LoadingBlock from '../common/components/loadingBlock';
import InfoWithImageBlock from '../common/components/infoWithImageBlock';
import {searchSite, searchContentByKeyword} from '../services/searchService';

class SearchResult extends Component {

    static propTypes = {
        value: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = dataSource;
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            isOperating: true
        }
    }

    render() {
        let titleText = this.props.value.substr(0, 6) + (this.props.value.length > 6 ? '...' : '');
        let com = this.state.isOperating ? 
                <LoadingBlock/> : 
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />

        return (
            <View style={{flex:1}}>
                <TopBar
                    onBack={this.onBack.bind(this)}
                    backText={`搜索结果 ${titleText}`}
                />  
                {com}
            </View>
        );
    }

    componentDidMount() {
        setTimeout(()=>{
            searchContentByKeyword(this.props.value, 0, 10, this.props.time, (data)=>{
                this.setState({isOperating: false, dataSource: this.dataSource.cloneWithRows(data)})
            });
        }, 500);
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                style={styles.contentSearchBlock}
                onPress={this.onPressContent.bind(this, rowData.content_id)}
            >
                <Text
                    style={styles.contentTitle}
                >{rowData.title}</Text>
                <Text
                    style={styles.contentDesc}
                >{rowData.desc}</Text>
            </TouchableOpacity>
        )
    }

    onBack(){
        this.props.navigator.pop();
    }

    onPressContent(topicId){
        this.props.navigator.push({
            name: 'TopicDetail',
            component: TopicDetail,
            props: {
                topicId
            }
        });    
    }
}

const styles = StyleSheet.create({
    contentSearchBlock:{
        padding: 10,
        backgroundColor: '#eee'
    },
    contentTitle:{
        backgroundColor: 0,
        color: '#333',
        fontWeight: '900'
    },
    contentDesc:{
        backgroundColor: 0,
        fontSize: 11,
        color: '#666'
    }
});

export default SearchResult;











