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
import TopicDetail from '../containers/topicDetail';
import Profile from '../containers/profile';
import Publish from '../containers/publish';
import LoadingBlock from '../common/components/loadingBlock';
import * as collectService from '../services/collectService';
import {getGlobal} from '../store';
import {TO_PUBLISH_TOPIC} from '../constants/passAgreement';

let {height, width} = Dimensions.get('window');

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            siteLikeStatus: 'loading'
        }
    }

    render() {
        if (!this.props.state.app.siteLoaded){
            return <LoadingBlock/>
        }
        let {themesBlockHeight,themeSelected, themeSelectedWord} = this.props.state.home;
        let {currentSite, siteInfo} = this.props.state.app;
        let topics = this.props.state.content.topics[0] ?                       //TODO
            this.props.state.content.topics[0] :
            [];                             
        return (
            <View style={styles.container}>
                <TopicList
                    isLoading={this.props.state.content.getTopicsLoading}
                    onSelectTopic={this.onSelectTopic.bind(this)}
                    data={topics}
                    style={styles.content}/>
                <TitleBar
                    siteLikeStatus={this.state.siteLikeStatus}
                    style={styles.titleBar}
                    onBack={this.onBack.bind(this)}
                    onSiteFocus={this.onSiteFocus.bind(this)}
                    onChooseTheme={this.onChooseTheme.bind(this)}
                    themes={siteInfo[currentSite].site_themes.themes}
                    backText={siteInfo[currentSite].site_name}
                    themeSelected={themeSelectedWord}
                    themeBlockHeight={themesBlockHeight} />   
                <Text style={styles.publishButton} onPress={this.onPublish.bind(this)}>
                    发布主题
                </Text>
            </View>
        );
    }

    componentDidMount() {
        const {currentSite} = this.props.state.app;
        getGlobal('oooLinkToken', token=>{
            if (!token){
                return this.setState({siteLikeStatus: 'none'});
            }
            collectService.judgeSiteFocused(token, currentSite, (rs)=>{
                let status = rs && rs.result ? 'ok' : 'none';
                this.setState({siteLikeStatus: status});
            });  
        });   
    }

    onBack(){
        this.props.navigator.pop();
    }

    onPublish(){
        this.props.navigator.push({
            name: 'publish',
            index: 5,
            component: Publish,
            props: {
                type: TO_PUBLISH_TOPIC
            }
        });
    }

    onSiteFocus() {
        const {currentSite, siteInfo} = this.props.state.app;
        if (this.state.siteLikeStatus === 'none') {
            collectService.collectedSite(currentSite, getGlobal('oooLinkToken'), (rs)=> {
                if (rs && rs.result) {
                    this.props.actions.collectSiteFocus(siteInfo[currentSite]);
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
        const {currentSite, siteInfo} = this.props.state.app;
        const site = siteInfo[currentSite];
        let idx = site.site_themes.themes.indexOf(theme);
        this.props.actions.selectTheme(currentSite, idx, site.site_themes);
    }

    onSelectTopic(topicId) {
        this.props.actions.getTopic(topicId);
        setTimeout(()=> {
            this.props.navigator.push({
                name: 'TopicDetail',
                index: 1,
                component: TopicDetail,
                props: {
                    topicId
                }
            });    
        }, 200);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(41,44,52)'
    },
    titleBar: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    content: {
        position: 'absolute',
        top: 50,
        width,
        height: height - 40,
        backgroundColor: 'rgb(41,44,52)'
    },
    publishButton: {
        position: 'absolute',
        top: height - 40,
        height: 40,
        width,
        backgroundColor: 'rgba(41,44,52,0.7)',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: '900'
    }
});

export default Home;

