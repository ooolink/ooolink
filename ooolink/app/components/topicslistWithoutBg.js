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
    TextInput,
    Dimensions,
    Navigator,
    PropTypes,
    View,
    ListView,
    RefreshControl
} from 'react-native';
import TopicWithoutBgBlock from '../common/components/topicWithoutBgBlock'
import * as uiConfig from '../constants/ui'
const {width, height} = Dimensions.get('window');

class TopicsListWithoutBg extends Component{

    static propTypes = {
        onSelectTopic: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        onShouldRefresh: PropTypes.func.isRequired,
        onShouldChangePage: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data),
            visibleRows: {},
            refreshing: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props.data){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
            });
        }
    }

    render(){
        return <ListView
            pageSize={5}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            onEndReachedThreshold={30}
            onEndReached={this.props.onShouldChangePage.bind(this)}
            refreshControl={
                    <RefreshControl
                            ref={(view)=> this.refreshControl=view}
                            refreshing={this.state.refreshing}
                            onRefresh={()=>{
                                this.setState({refreshing: true});
                                setTimeout(()=>{
                                    this.setState({refreshing: false});
                                }, 1000);
                                this.props.onShouldRefresh();
                            }}
                            {...uiConfig.refreshControl}
                          />
                    }
        /> 
    }

    _renderRow(rowData, sectionID, rowID){
        return <TopicWithoutBgBlock
            data={rowData}
            idx={rowID}
            onSelectTopic={this.props.onSelectTopic.bind(this)}
        />
    }
}

export default TopicsListWithoutBg;