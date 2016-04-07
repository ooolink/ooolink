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
import TopicList from '../components/topicslist';
import TitleBar from '../components/titlebar';
import CommentsList from '../containers/commentslist';
import Profile from '../containers/profile';
import * as collectService from '../services/collectService';
import {getGlobal} from '../store';

let {height, width} = Dimensions.get('window');

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            siteLikeStatus: 'none'
        }
    }

    render() {
        const {themesBlockHeight,themeSelected} = this.props.state.home;
        const {currentSite, siteInfo} = this.props.state.app;
        const topics = this.props.state.content.topics[themeSelected] ?
            this.props.state.content.topics[themeSelected][0].data :
            [];
        let _this = this;

        return (
            <View style={styles.container}>
                <TopicList
                    onSelectTopic={_this.onSelectTopic.bind(_this)}
                    data={topics}
                    style={styles.content}/>
                <TitleBar
                    siteLikeStatus={this.state.siteLikeStatus}
                    style={styles.titleBar}
                    themes={siteInfo[currentSite].themes}
                    onChooseTheme={_this.onChooseTheme.bind(this)}
                    onSiteFocus={_this.onSiteFocus.bind(this)}
                    themeSelected={themeSelected}
                    themeBlockHeight={themesBlockHeight}
                    onOpenProfile={_this.onOpenProfile.bind(_this)}/>
            </View>
        );
    }

    onOpenProfile() {
        this.props.navigator.push({
            name: 'profile',
            index: 3,
            component: Profile
        });
    }

    onSiteFocus() {
        const {currentSite, siteInfo} = this.props.state.app;
        if (this.state.siteLikeStatus === 'none') {
            let desc = siteInfo[currentSite];                            //TODO: desc 描述字段化
            collectService.collectedSite(currentSite, JSON.stringify(desc), getGlobal('oooLinkToken'), (rs)=> {
                if (rs && rs.result) {
                    this.props.actions.collectSiteFocus(currentSite);
                    this.setState({siteLikeStatus: 'ok'});
                } else {
                    this.setState({siteLikeStatus: 'none'});
                }
            });
        } else if (this.state.siteLikeStatus === 'ok') {
            collectService.unCollectedSite(currentSite, getGlobal('oooLinkToken'), (rs)=> {
                if (rs && rs.result) {
                    this.props.actions.unCollectSiteFocus(currentSite);
                    this.setState({siteLikeStatus: 'none'});
                } else {
                    this.setState({siteLikeStatus: 'ok'});
                }
            })
        }
        this.setState({siteLikeStatus: 'loading'});
    }

    onChooseTheme(theme) {
        this.props.actions.selectTheme(this.props.state.app.currentSite, theme);
    }

    onSelectTopic(topicId) {
        this.props.navigator.push({
            name: 'commentsList',
            index: 1,
            component: CommentsList,
            props: {
                topicId
            }
        });
        setTimeout(()=> {
            this.props.actions.getTopic(topicId);
        }, 200);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default Home;

