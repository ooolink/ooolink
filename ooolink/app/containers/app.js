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
import Home from '../containers/home';
import LoadingBlock from '../common/components/loadingBlock';
import oooLinkActions from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            currentSite: this.props.currentSite,
            state: this.props.state
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoaded: nextProps.isLoaded,
            state: nextProps.state,
            currentSite: nextProps.currentSite
        });
    }

    render() {

        if (this.props.isLoaded) {
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
        return Navigator.SceneConfigs.FloatFromLeft;
    }

    renderScene(route, navigator) {

        return React.createElement(route.component, Object.assign({}, route.props, {
            navigator,
            state: this.state.state,
            actions: this.actions
        }));
    }

    componentDidMount() {
        this.actions = bindActionCreators(oooLinkActions, this.props.dispatch);
        this.actions.getSiteInfo(this.props.currentSite);
    }
}


function app(state) {
    "use strict";
    let isLoaded = state.app.appLoaded,
        currentSite = state.app.currentSite;
    return {
        currentSite,
        isLoaded,
        state
    }
}

export default connect(app)(App);