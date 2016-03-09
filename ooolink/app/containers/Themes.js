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
    View,
    ScrollView,
    Text,
    Animated,
    PropTypes,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

import {getThemes} from '../actions/home'

class Themes extends Component {

    render() {
        let _this = this;
        return (
            <View style={styles.container}>
                {
                    function() {
                        return _this.props.themes && _this.props.themes.map((theme, idx)=> {
                                return (
                                    <Text style={styles.itemLang} key={idx}>{theme}</Text>
                                )
                            })
                    }()
                }
            </View>
        )
    }

    componentDidMount() {
        this.getThemes();
    }

    getThemes() {
        const {dispatch} = this.props;
        dispatch(getThemes());
    }
}

function themes(state) {
    "use strict";
    return {
        themes: state.home.themes
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingBottom: 10,
        backgroundColor: '#22b473'
    },
    itemLang: {
        height:30,
        marginRight: 10,
        color: '#fff'
    }
});

export default connect(themes)(Themes);