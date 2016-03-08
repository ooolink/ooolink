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
    ScrollView
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TitleBar from '../components/titlebar';

class App extends Component {
    render() {
        return (
            <ScrollableTabView
                tabBarPosition="overlayBottom"
                tabBarUnderlineColor="#22b473"
                tabBarActiveTextColor="#22b473"
                style={styles.app}>
                <ScrollView tabLabel="View">
                    <TitleBar/>
                </ScrollView>
                <ScrollView tabLabel="Person">
                </ScrollView>
                <ScrollView tabLabel="Setting">
                </ScrollView>
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        marginTop: 20
    }
});

export default App;