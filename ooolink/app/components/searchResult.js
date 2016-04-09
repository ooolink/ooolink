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
import {searchSite} from '../services/searchService';

class SearchResult extends Component {

    static propTypes = {
        onSelectSite: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([])
        }
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }

    componentDidMount() {
        searchSite(this.props.value, 'all', (sites)=> {
            this.setState({dataSource: this.state.dataSource.cloneWithRows(sites)});
        });
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <Text onPress={()=>{
                this.props.onSelectSite(rowData.site_id);
            }}>{rowData.site_name}</Text>
        )
    }
}

export default SearchResult;