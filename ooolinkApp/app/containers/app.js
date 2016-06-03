/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict'
import React,{
    Component,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    Navigator,
    View
} from 'react-native';
import Welcome from './welcome';
import LoadingBlock from '../common/components/loadingBlock';
import oooLinkActions from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            state: this.props.state
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            state: nextProps.state,
        });
    }

    render() {
        //以欢迎页为起始页面
        let com = {name: 'Welcome', component: Welcome};
        if (this.props.isLoaded) {
            return (
                <Navigator
                    initialRoute={com}
                    renderScene={this.renderScene.bind(this)}
                    configureScene={this.configureScene.bind(this)}
                />
            );
        } else {
            return (
                <LoadingBlock/>
            )
        }
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    renderScene(route, navigator) {
        if (!this.actions){
            this.actions = bindActionCreators(oooLinkActions, this.props.dispatch);
        }
        return React.createElement(route.component, Object.assign({}, route.props, {
            navigator,
            state: this.state.state,
            actions: this.actions
        }));
    }

    componentDidMount() {
        this.actions = bindActionCreators(oooLinkActions, this.props.dispatch);
        //app打开时加载本地缓存的数据
        this.actions.getContentAllInfoFromNativeCache(
            this.actions.getUserAllInfoFromNativeCache
        );
    }
}


function app(state) {
    let isLoaded = state.app.appLoaded;
    return {
        isLoaded,
        state,
    }
}

export default connect(app)(App);