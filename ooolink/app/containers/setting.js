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
import {connect} from 'react-redux';
import {changeSite} from '../actions/app';

const {width, height} = Dimensions.get('window');

class SearchBlock extends Component {

    static propTypes = {
        onSearch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        return (
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
        )
    }

    _onSearch() {
        this.props.onSearch(this.state.text);
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
    }
});

class Setting extends Component {

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <SearchBlock
                onSearch={this.onSearch.bind(this)}
            />
        );
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
        this.props.dispatch(changeSite(value));
        this.props.navigator.popToTop();
    }
}

function setting() {
    "use strict";
    return {}
}

export default connect(setting)(Setting);