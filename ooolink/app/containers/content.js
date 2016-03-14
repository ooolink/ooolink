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
import CommentsList from '../components/commentslist';
import LoadingBlock from '../common/components/loadingBlock';
import {getTopic} from '../actions/content';

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
        this.setState({
            data: nextPros.data,
            loaded: this.state.theme != nextPros.theme ? false : nextPros.data.topics.length > 0 || nextPros.data.comments,
            theme: nextPros.theme
        });
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'topics', index: 0, component: TopicsList}}
                renderScene={this.renderScene.bind(this)}
                configureScene={this.configureScene.bind(this)}
            />
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.VerticalUpSwipeJump;
    }

    renderScene(route, navigator) {

        this.navigator = navigator;
        let component = this.state.loaded ? function() {
            switch (route.name) {
                case 'topics':
                    return TopicsList;
                case 'comments':
                    return CommentsList;
            }
        }() : LoadingBlock;

        return React.createElement(component, Object.assign({}, route.props, this.props, {
            navigator,
            data: this.state.data,
            onSelectTopic: this.onSelectTopic.bind(this)
        }));
    }

    onSelectTopic(topicId) {
        this.setState({loaded: false});
        this.navigator.push({
            name: 'comments',
            index: 1
        });
        this.props.dispatch(getTopic(topicId));
    }
}

function content(state) {
    "use strict";
    let theme = state.home.themeSelected,
        topic = state.content.topicSelected,
        topics = state.content.topics[theme],
        comments = state.content.comments[topic];

    return {
        data: {
            topics: topics ? topics[0].data : [],
            comments: comments ? comments.data : null,
            theme
        },
        theme
    }
}


export default connect(content)(Content);
