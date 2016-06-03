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
import SearchResult from '../components/searchResult';
import TopBar from '../common/components/topBar';
import {searchSite} from '../services/searchService';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

class SearchBlock extends Component {

    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        onSelectSite: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            famous: []
        }
    }

    render() {
        let com = [];
        this.state.famous.forEach((site, idx)=>{
            com.push(
                <TouchableOpacity key={idx} style={styles.famousItem} onPress={this.props.onSelectSite.bind(this, site.site_id)}>
                    <Text style={styles.famoutItemName}>{site.site_name}</Text>
                    <Text style={styles.famoutItemDesc}>{site.site_desc}</Text>
                </TouchableOpacity>
            );
        });
        return (
            <View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"找找站点"}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    <Text
                        style={styles.searchButton}
                        onPress={this._onSearch.bind(this)}>搜索</Text>
                </View>
                <Text style={styles.itemTitle}>推荐</Text>
                {com}
            </View>
        )
    }

    _onSearch() {
        this.props.onSearch(this.state.text);
    }

    componentDidMount() {
        searchSite('','',(sites)=>{
            this.setState({famous: sites});
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 40
    },
    searchInput: {
        width: width - 60,
        height: 40
    },
    searchButton: {
        width: 30
    },
    itemTitle:{
        color: '#2F85A7',
        marginLeft: 10,
        fontWeight: '900'
    },
    famousItem:{
        padding: 10
    },
    famoutItemName: {
        fontWeight: '900'
    },
    famoutItemDesc: {
        fontSize: 10
    }
});

class Search extends Component {

    componentWillReceiveProps(nextProps) {

    }

    static propTypes = {
        backText: PropTypes.string.isRequired
    };

    render() {
        return (
            <View>
                <TopBar
                    onBack={this.onBack.bind(this)}
                    backText={this.props.backText}
                />
                <SearchBlock
                    onSelectSite={this.onSelectSite.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                />
            </View>
        );
    }

    onBack(){
        this.props.navigator.pop();
    }

    onSearch(value) {
        this.props.navigator.push({
            name: 'searchResult',
            index: 3,
            props: {
                value,
                navigator: this.props.navigator,
                onSelectSite: this.onSelectSite.bind(this)
            },
            component: SearchResult
        });
    }

    onSelectSite(value) {
        setTimeout(()=> {
            this.props.actions.getSiteInfo(value);
        }, 200);
        this.props.navigator.popToTop();
    }
}

export default Search;