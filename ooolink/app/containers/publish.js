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
    ListView,
    Text,
    Image,
    Dimensions,
    View,
    TouchableOpacity,
    PropTypes
} from 'react-native';
import TopBar from '../common/components/topBar';
import MarkDownEditMod from '../common/components/markdownEditMod';
import {TO_PUBLISH_TOPIC, TO_PUBLISH_COMMENT} from '../constants/passAgreement';

class Publish extends Component{
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }

    render(){
        let backText = '';
        if (this.props.type === TO_PUBLISH_TOPIC){
            backText = '发布主题'
        } else if (this.props.type === TO_PUBLISH_COMMENT) {
            backText = '跟帖';
        }
        return (
            <View style={{flex:1}}>
                <TopBar
                    backText = {backText}
                    onBack = {this.onBack.bind(this)}
                />
                <MarkDownEditMod
                    navigator={this.props.navigator}
                    titleHaved = {this.props.type === TO_PUBLISH_TOPIC}
                />
            </View>
        )
    }

    onBack(){
        this.props.navigator.pop();
    }
}

export default Publish;