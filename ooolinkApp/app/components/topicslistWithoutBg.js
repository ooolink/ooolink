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
    ListView
} from 'react-native';
import TopicWithoutBgBlock from '../common/components/topicWithoutBgBlock'
const {width, height} = Dimensions.get('window');

class TopicsListWithoutBg extends Component{

    static propTypes = {
        onSelectTopic: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data),
            visibleRows: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
        })
    }

    render(){
        return <ListView
            pageSize={5}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
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