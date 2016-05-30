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
import InfoWithContentBlock from '../common/components/infoWithContentBlock';
import CollectionFolder from './collectionFolder';
import {TO_INFO_GROUP_FOCUS_SITE, TO_INFO_GROUP_COLLECTIONS} from '../constants/passAgreement';

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
                let collections = this.props.state.content.collections;
                Object.keys(collections).forEach((cname, idx)=> {
                    if (collections[cname].count === 0){
                        return;
                    }
                    info.push(
                        <InfoWithContentBlock
                            onSelectInfo={this.onSelectCollection.bind(this)}
                            key={idx}
                            title={cname}
                            count={collections[cname].count}
                            list={collections[cname].rows}
                            id={collections[cname].id}
                        />
                    );
                });
                break;
        }
        return (
            <View style={{flex:1}}>
                <TopBar
                    backText={this.props.backText}
                    onBack={this.onBack.bind(this)}
                />
                <ScrollView>
                    {info}
                </ScrollView>   
            </View>
        )
    }

    onSelectCollection(type, typeName, count){
        this.props.navigator.push({
            name: 'CollectionFolder',
            component: CollectionFolder,
            props:{
                type,
                typeName,
                count
            }
        });
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
        let token = this.props.state.user.userToken;
        switch (this.props.type) {
            case TO_INFO_GROUP_FOCUS_SITE :
                this.props.actions.getFocusSite(token);
                break;

            case TO_INFO_GROUP_COLLECTIONS:
                this.props.actions.getCollections(token);
                break;
        }
    }
}

export default InfoGroup;