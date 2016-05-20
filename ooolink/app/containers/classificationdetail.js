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
import Home from '../containers/home'
import TopBar from '../common/components/topBar'
import LoadingBlock from '../common/components/loadingBlock'
import InfoWithImageBlock from '../common/components/infoWithImageBlock'
import OperateLoading from '../common/components/operateLoading'
import Profile from '../containers/profile'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import * as siteService from '../services/siteService'
import * as collectService from '../services/collectService'
import {getGlobal, setGlobal} from '../store'

let {height, width} = Dimensions.get('window');

class ClassificationDetail extends Component{

    constructor(props){
        super(props);   
        this.state = {
            sites:[],
            keyword: [],
            themes: [],
            isLoading: true,
            nowSelect: 'site',                             //site, keyword, themes
            isOperating: false
        }
    }

    render(){
        if (this.state.isLoading){
            return (
                <LoadingBlock/>
            )
        }
        let coms = [];
        this.state.sites.forEach((item)=>{
            let  siteChooseCom = 
            <View style={styles.siteChooseCom}>
                <Text 
                    onPress={this.onVisitSite.bind(this, item)}
                    style={[styles.siteChooseComItem, {backgroundColor:'#65b278'}]}>访问</Text>
                <Text 
                    onPress={this.onFocusSite.bind(this, item)}
                    style={[styles.siteChooseComItem, {backgroundColor:'#f54b72'}]}>关注</Text>
            </View>

            coms.push(
                <InfoWithImageBlock
                    canChoose={siteChooseCom}
                    height={80}
                    blockId={item}
                    imageURL={item.site_image}
                >
                    <Text style={styles.siteItemText}>{item.site_name}</Text>
                    <Text style={[styles.siteItemText,{fontWeight:'100', fontSize:14}]}>{item.site_desc}</Text>
                </InfoWithImageBlock>
            )
        });
        return (
            <View>
                <TopBar
                    onBack={this.onBack.bind(this)}
                    backText={this.props.typeName}
                />
                <ScrollableTabView
                    onChangeTab={this.onChangeTab.bind(this)}
                >
                    <ScrollView tabLabel="站点" style={styles.scrollView}>
                        {coms}
                    </ScrollView>
                    <ScrollView tabLabel="关键字" style={styles.scrollView}>
                        {coms}
                    </ScrollView>
                    <ScrollView tabLabel="主题" style={styles.scrollView}>
                        {coms}
                    </ScrollView>
                </ScrollableTabView>
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        )
    }

    onChangeTab(tabObj){
        let {i} = tabObj;
        switch (i){
            case 0:break;
            case 1:break;
            case 2:break;
        }
    }

    onFocusSite(item){
        let token = getGlobal('oooLinkToken', (token)=>{
            this.setState({isOperating: true});
            collectService.collectedSite(item.site_id, token, (rs)=>{
                this.setState({isOperating: false});
                if (rs && rs.result === 1){
                    Alert.alert('关注成功');
                } else if (rs && rs.result === 401) {
                    this.props.navigator.push({
                        name: 'Profile',
                        component: Profile
                    });
                } else {
                    Alert.alert('关注失败');
                }
            });
        });
    }

    onVisitSite(item){
        this.props.actions.getSiteInfo(item.site_id);
        this.props.navigator.push({
            name: 'Home',
            component: Home
        });
    }

    onBack(){
        this.props.navigator.pop();
    }

    componentDidMount() {
        siteService.getSiteByType(this.props.type, 1, 0, (rs)=>{
            if (rs && rs.result){
                this.setState({sites: rs.data, isLoading: false});
            } else {
                this.setState({sites: [], isLoading: false});
            }
        });  
    }
}

const styles=StyleSheet.create({
    siteItemText:{
        marginLeft: 20,
        fontSize: 16,
        fontWeight: '900',
        color:'#fff'
    },
    siteItemAddButton:{
        position: 'absolute',
        right: 20,
        top: 30,
        width: 26,
        height: 26
    },
    siteChooseCom:{
        height: 80,
        width: width/3,
        backgroundColor: 'rgb(41,44,52)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    siteChooseComItem:{
        width: width/6,
        height: 80,
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        lineHeight: 48
    },
    scrollView:{
        flex: 1,
        width,
        height: height - 100,
        backgroundColor: 'rgb(41,44,52)'
    }
});

export default ClassificationDetail;









