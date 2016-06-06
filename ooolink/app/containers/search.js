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
import SearchResult from './searchResult';
import TopBar from '../common/components/topBar';
import {getSearchHot} from '../services/searchService';
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
        this.state.famous.forEach((item, idx)=>{
            com.push(
                <TouchableOpacity key={idx} style={styles.famousItem} onPress={this.onSelectHot.bind(this, item)}>
                    <Text style={styles.famoutItemName}>{item}</Text>
                </TouchableOpacity>
            );
        });
        return (
            <View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"请输入要搜索的关键字"}
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

    onSelectHot(item){
        this.props.onSearch(item);
    }

    componentDidMount() {
        getSearchHot((rs)=>{
            if (rs && rs.result === 1){
                this.setState({famous: rs.data});
            }
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
        color: '#65b278',
        marginLeft: 10,
        fontWeight: '900'
    },
    famousItem:{
        padding: 10
    },
    famoutItemName: {
        fontWeight: '900',
        color: '#333'
    }
});

class Search extends Component {

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View>
                <TopBar
                    onBack={this.onBack.bind(this)}
                    backText={'搜索'}
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
        if (!value){
            return;
        }

        this.props.navigator.push({
            name: 'searchResult',
            index: 3,
            props: {
                value
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