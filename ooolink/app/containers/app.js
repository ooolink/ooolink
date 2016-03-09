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
    View
} from 'react-native';
import {connect} from 'react-redux';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TitleBar from '../components/titlebar';
import LoadingBlock from '../common/components/loadingBlock';

import {selectPage,getThemes} from '../actions/home'

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch,pageSelected,themesBlockHeight,themeSelected} = this.props;

        if (this.props.themes.length > 0) {
            return (
                <ScrollableTabView
                    tabBarPosition="overlayBottom"
                    tabBarUnderlineColor="#22b473"
                    tabBarActiveTextColor="#22b473"
                    page={pageSelected}
                    onChangeTab={function(index){
                    dispatch(selectPage(index-1))
                }}
                    renderTabBar={()=>(<View></View>)}
                    style={styles.app}>
                    <TitleBar
                        themeSelected={themeSelected}
                        themeBlockHeight={themesBlockHeight}
                        onOpenProfile={this.onOpenProfile.bind(this)}
                        onOpenSetting={this.onOpenSetting.bind(this)}/>
                    <ScrollView tabLabel="Person">
                    </ScrollView>
                    <ScrollView tabLabel="Setting">
                    </ScrollView>
                </ScrollableTabView>
            )
        } else {
            return (
                <LoadingBlock/>
            )
        }
    }

    onOpenProfile() {
        const {dispatch} = this.props;
        dispatch(selectPage(1));
    }

    onOpenSetting() {
        const {dispatch} = this.props;
        dispatch(selectPage(2))
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getThemes());
    }
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        marginTop: 20
    }
});

function home(state) {
    "use strict";
    return {
        themesBlockHeight: state.home.themesBlockHeight,
        pageSelected: state.home.pageSelected,
        themes: state.home.themes,
        themeSelected: state.home.themeSelected
    }
}

export default connect(home)(App);