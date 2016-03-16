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
import Setting from '../containers/setting';
import Profile from '../containers/profile';

let {height, width} = Dimensions.get('window');

class Home extends Component {

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
                    style={styles.titleBar}
                    themes={siteInfo[currentSite].themes}
                    onChooseTheme={_this.onChooseTheme.bind(this)}
                    themeSelected={themeSelected}
                    themeBlockHeight={themesBlockHeight}
                    onOpenProfile={_this.onOpenProfile.bind(_this)}
                    onOpenSetting={_this.onOpenSetting.bind(_this)}/>
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

    onOpenSetting() {
        this.props.navigator.push({
            name: 'setting',
            index: 2,
            component: Setting
        });
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

export default Home;

