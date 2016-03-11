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
    PropTypes,
    View,
    Navigator
} from 'react-native';
import {connect} from 'react-redux';

import TopicsList from '../components/topicslist';
import LoadingBlock from '../common/components/loadingBlock';

class Content extends Component {

    static propTypes = {
        style: View.propTypes.style
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
    }

    componentWillReceiveProps(nextPros) {
        let rs = this.state.theme && this.state.theme != nextPros.theme;
        this.setState({data: nextPros.data, loaded: !rs, theme: nextPros.theme});
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'topics', index: 0, component: TopicsList}}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }

    renderScene(route, navigator) {
        return React.createElement(this.state.loaded ? TopicsList : LoadingBlock, Object.assign({}, route.props, this.props, {
            navigator,
            data: this.state.data
        }));
    }
}

function content(state) {
    "use strict";
    let len = state.content.topics.length, theme = state.home.themeSelected;
    return {
        data: len ? state.content.topics[0].data : [],
        theme
    }
}


export default connect(content)(Content);
