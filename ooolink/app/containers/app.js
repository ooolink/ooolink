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
    Dimensions,
    Navigator,
    View
} from 'react-native';
import {connect} from 'react-redux';
import Home from '../containers/home';
import LoadingBlock from '../common/components/loadingBlock';
import {getThemes} from '../actions/home';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.themes.length > 0) {
            return (
                <Navigator
                    initialRoute={{name: 'home', index: 0, component: Home}}
                    renderScene={this.renderScene.bind(this)}
                    configureScene={this.configureScene.bind(this)}
                />
            )
        } else {
            return (
                <LoadingBlock/>
            )
        }
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.VerticalUpSwipeJump;
    }

    renderScene(route, navigator) {

        return React.createElement(route.component, Object.assign({}, route.props, {
            navigator
        }));
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getThemes());
    }
}


function app(state) {
    "use strict";
    return {
        themes: state.home.themes
    }
}

export default connect(app)(App);