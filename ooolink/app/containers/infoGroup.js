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
import InfoWithImageBlock from '../common/components/infoWithImageBlock';
import {TO_INFO_GROUP_FOCUS_SITE, TO_INFO_GROUP_COLLECTIONS} from '../constants/passAgreement';
import {setGlobal, getGlobal} from '../store';

class InfoGroup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let info = [],
            siteFocus = this.props.state.app.siteFocus;
        switch (this.props.type) {
            case TO_INFO_GROUP_FOCUS_SITE:
                siteFocus.forEach(site=>{
                    console.log(site)
                    info.push(
                        <InfoWithImageBlock 
                            onPress={this.onSelectSite.bind(this)}
                            imageURL={site.collection_site_image}
                            desc={site.collection_desc}
                            name={site.collection_site_name}
                            blockId={site.collection_site}
                        />
                    );
                });
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
                    backText={this.props.backText}
                    onBack={this.onBack.bind(this)}
                />
                {info}
            </View>
        )
    }

    onBack() {
        this.props.navigator.pop();
    }

    onSelectSite(siteId) {
        setTimeout(()=> {
            this.props.actions.getSiteInfo(siteId);
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