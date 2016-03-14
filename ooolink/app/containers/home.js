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
import TopicList from '../components/topicslist';
import CommentsList from '../containers/commentslist';
import TitleBar from '../components/titlebar';
import {getTopic, selectTopic} from '../actions/content';

let {height, width} = Dimensions.get('window');

class Home extends Component {

    render() {
        const {themesBlockHeight,themeSelected} = this.props;
        let _this = this;

        return (
            <View style={styles.container}>
                <TopicList
                    onSelectTopic={_this.onSelectTopic.bind(_this)}
                    data={_this.props.topics}
                    style={styles.content}/>
                <TitleBar
                    style={styles.titleBar}
                    themeSelected={themeSelected}
                    themeBlockHeight={themesBlockHeight}
                    onOpenProfile={_this.onOpenProfile.bind(_this)}
                    onOpenSetting={_this.onOpenSetting.bind(_this)}/>
            </View>
        );
    }

    onOpenProfile() {

    }

    onOpenSetting() {

    }

    onSelectTopic(topicId) {
        this.props.dispatch(selectTopic(topicId));
        this.props.navigator.push({
            name: 'commentsList',
            index: 1,
            component: CommentsList
        });
        setTimeout(()=> {
            this.props.dispatch(getTopic(topicId));
        }, 200);
    }
}

function home(state) {
    "use strict";
    let themeSelected = state.home.themeSelected,
        topics = state.content.topics[themeSelected];

    return {
        themesBlockHeight: state.home.themesBlockHeight,
        themes: state.home.themes,
        themeSelected,
        topics: topics ? topics[0].data : []
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#333'
    },
    titleBar: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    content: {
        flex: 1,
        position: 'absolute',
        top: 40,
        width,
        height: height - 40,
        backgroundColor: '#333'
    }
});

export default connect(home)(Home);

