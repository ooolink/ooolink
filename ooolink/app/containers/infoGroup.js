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
import {TO_INFO_GROUP_FOCUS_SITE, TO_INFO_GROUP_COLLECTIONS} from '../constants/passAgreement';
import {setGlobal, getGlobal} from '../store';

class InfoGroup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let info = [];
        switch (this.props.type) {
            case TO_INFO_GROUP_FOCUS_SITE:
                for (let siteName in this.props.state.app.siteFocus) {
                    info.push(
                        <Text onPress={this.onSelectSite.bind(this, siteName)}>
                            {siteName}
                        </Text>
                    );
                }
                break;
            case TO_INFO_GROUP_COLLECTIONS:
                this.props.state.content.collections.forEach((item)=> {
                    info.push(
                        <Text>
                            {item.collection_content}
                        </Text>
                    );
                });
                break;
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

    onBack() {
        this.props.navigator.pop();
    }

    onSelectSite(siteName) {
        setTimeout(()=> {
            this.props.actions.getSiteInfo(siteName);
        }, 200);
        this.props.navigator.popToTop();
    }

    componentDidMount() {
        switch (this.props.type) {
            case TO_INFO_GROUP_FOCUS_SITE :
                this.props.actions.getFocusSite(getGlobal('oooLinkToken'));
                break;

            case TO_INFO_GROUP_COLLECTIONS:
                this.props.actions.getCollections(getGlobal('oooLinkToken'));
                break;
        }
    }
}

export default InfoGroup;