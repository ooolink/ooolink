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
import TopBar from '../common/components/topBar';
import InfoWithImageBlock from '../common/components/infoWithImageBlock';
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
            <View>
                <TopBar
                    onBack={this.onBack.bind(this)}
                    backText={'搜索结果'}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }

    componentDidMount() {
        searchSite(this.props.value, 'all', (sites)=> {
            this.setState({dataSource: this.state.dataSource.cloneWithRows(sites)});
        });
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <InfoWithImageBlock
                blockId={rowData.site_id}
                name={rowData.site_name}
                desc={rowData.site_desc}
                imageURL={rowData.site_image}
                onPress={(siteId)=>{
                    this.props.onSelectSite(siteId);
                }}
            />
        )
    }

    onBack(){
        this.props.navigator.pop();
    }
}

export default SearchResult;