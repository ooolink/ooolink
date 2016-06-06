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
import TopicList from '../components/topicslist';
import TopicDetail from './topicDetail';
import TopBar from '../common/components/topBar'
import LoadingBlock from '../common/components/loadingBlock'
import InfoWithImageBlock from '../common/components/infoWithImageBlock'
import OperateLoading from '../common/components/operateLoading'
import Login from './loginContainer'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import * as siteService from '../services/siteService'
import * as collectService from '../services/collectService'
import * as contentService from '../services/contentService'
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
            isOperating: false,
            data:[]
        }
    }

    render(){
        let coms = [], ccoms = null;
        if (this.state.isLoading){
            coms = <LoadingBlock/>
            ccoms = <LoadingBlock/>
        } else {
                this.state.sites.forEach((item, idx)=>{
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
                            key={idx}
                            canChoose={siteChooseCom}
                            height={80}
                            blockId={item}
                            onPress={this.onVisitSite.bind(this)}
                            imageURL={item.site_image}
                        >
                            <Text style={styles.siteItemText}>{item.site_name}</Text>
                            <Text style={[styles.siteItemText,{fontWeight:'100', fontSize:14}]}>{item.site_desc}</Text>
                        </InfoWithImageBlock>
                    )
                });
                 ccoms = <TopicList
                        isLoading={false}
                        onSelectTopic={this.onSelectTopic.bind(this)}
                        data={this.state.data}
                        onShouldRefresh={()=>{}}
                        onShouldChangePage={()=>{}}
                        />;
        }

        let loadingStyle=this.state.isLoading ? {justifyContent: 'center'} : {}
        return (
            <View style={{flex:1}}>
                <TopBar
                    onBack={this.onBack.bind(this)}
                    backText={this.props.typeName}
                />
                <ScrollableTabView
                    tabBarInactiveTextColor={'rgb(41,44,52)'}
                    tabBarActiveTextColor={'#65b278'}
                    tabBarUnderlineColor={'#65b278'}
                    style={{flex: 1}}
                >
                    <ScrollView tabLabel="社区" contentContainerStyle={[styles.scrollView, loadingStyle]}>
                        {coms}
                    </ScrollView>
                    <ScrollView tabLabel="内容" contentContainerStyle={[styles.scrollView, loadingStyle]}>
                        {ccoms}
                    </ScrollView>
                </ScrollableTabView>
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        )
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
                        name: 'Login',
                        component: Login
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
            component: Home,
            props: {
                site_id: item.site_id
            }
        });
    }

    onSelectTopic(topicId){
        this.props.navigator.push({
            name: 'TopicDetail',
            component: TopicDetail,
            props: {
                topicId
            }
        })
    }

    onBack(){
        this.props.navigator.pop();
    }

    componentDidMount() {
        setTimeout(()=>{
            siteService.getSiteByType(this.props.type, 0, 10, (rs)=>{
                if (rs && rs.result){
                    this.setState({sites: rs.data});
                } else {
                    this.setState({sites: [], isLoading: false});
                }
                contentService.getContentsByType(0, 20, this.props.type, (rs)=>{
                    if (rs && rs.result === 1){
                        let data = rs.data.filter(d=>{
                            return !!d.classes;
                        });
                        this.setState({data});
                    }
                    this.setState({isLoading: false});
                });
            });  
        }, 500);
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









