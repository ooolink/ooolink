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
    PropTypes,
    Alert,
    RefreshControl
} from 'react-native';
import LoadingBlock from '../common/components/loadingBlock';
import TopicBlock from '../common/components/topicBlock';
import * as uiConfig from '../constants/ui';

class TopicsList extends Component {

    static propTypes = {
        style: View.propTypes.style,
        onSelectTopic: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
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
        if (nextProps.data !== this.props.data)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
        });
    }

    render() {
        if (!this.props.isLoading) {
            return (
                <ListView
                    pageSize={5}
                    style={this.props.style}
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
            );
        } else {
            return <LoadingBlock/>
        }
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <TopicBlock
                onSelectTopic={this.props.onSelectTopic.bind(this)}
                data={rowData}/>
        )
    }
}

export default TopicsList;