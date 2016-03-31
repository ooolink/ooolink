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
    Image,
    Dimensions,
    Navigator,
    TouchableOpacity,
    View,
    TextInput,
    Alert
} from 'react-native';
import TopBar from '../common/components/topBar';
import {TO_INFO_GROUP_FOCUS_SITE} from '../constants/passAgreement';
import {setGlobal, getGlobal} from '../store';

class InfoGroup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let info = [];
        for (let siteName in this.props.state.app.siteFocus) {
            info.push(
                <Text>
                    {siteName}
                </Text>
            );
        }
        return (
            <View>
                <TopBar
                    onBack={this.onBack.bind(this)}
                />
                {info}
            </View>
        )
    }

    onBack(){
        this.props.navigator.pop();
    }

    componentDidMount() {
        switch (this.props.type) {
            case TO_INFO_GROUP_FOCUS_SITE :
                this.props.actions.getFocusSite(getGlobal('oooLinkToken'));
                break;
        }
    }
}

export default InfoGroup;