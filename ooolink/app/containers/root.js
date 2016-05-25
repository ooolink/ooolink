/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
import React,{
    Component,
    Image,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Navigator,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const {width, height} = Dimensions.get('window');

class Root extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let type = this.props.type;
        return (
            <ScrollableTabView
            >
                <ScrollView tabLabel="发现" style={styles.scrollView}>
                </ScrollView>
                <ScrollView tabLabel="消息" style={styles.scrollView}>
                </ScrollView>
                <ScrollView tabLabel="我的" style={styles.scrollView}>
                </ScrollView>
            </ScrollableTabView>    
        );   
    }
}

const styles=StyleSheet.create({
    scrollView:{
        flex: 1,
        width,
        height: height - 100,
        backgroundColor: 'rgb(41,44,52)'
    }
});

export default Root;