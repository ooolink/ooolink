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
import LoadingBlock from '../common/components/loadingBlock'
import TopBar from '../common/components/topBar';
import Search from './search';
import InfoGroup from './infoGroup';
import Login from './loginContainer';
import {TO_INFO_GROUP_FOCUS_SITE, TO_INFO_GROUP_COLLECTIONS} from '../constants/passAgreement';
import * as collectService from '../services/collectService';
import {setGlobal, getGlobal, removeGlobal} from '../store';

let {height, width} = Dimensions.get('window');

class Profile extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            status: '',
            userName: '',
            isSync: false
        }
    }

    render() {
        const {currentSite, siteInfo} = this.props.state.app;
        let that = this;
        if (!this.state.isSync){
            return <LoadingBlock/>;
        }
        let loginOutCom = this.state.status === 'logined' ? 
                    <Text 
                        onPress={this.onLoginOut.bind(this)}
                        style={styles.loginOutButton}>
                        退出登录
                    </Text> : null;

            return (
                <View style={{backgroundColor:'#fff'}}>
                    <Image
                        source={require('../images/user-bg.jpg')}
                        style={styles.userInfoItem}>
                        <Text style={styles.userInfoText} onPress={this.onClickUserInfo.bind(this)}>
                            {this.state.status === 'logined' ? `用户 : ${this.state.userName} (子账号数 : 3)` : '登录/注册'}
                        </Text>
                    </Image>
                    <View style={styles.searchItem}>
                        <TextInput
                            onFocus={this.onSearchClick.bind(this)}
                            style={styles.searchInput}
                            placeholder={"找找站点"}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.onGetFocusSite.bind(this)}
                    >
                        <View
                            style={styles.item}>
                            <Image style={styles.icon} source={require('../images/profile-site.png')}/>
                            <Text style={styles.itemText}>
                                我关注的站点
                            </Text>
                            <Image style={styles.icon} source={require('../images/profile-up.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onGetLikeTopic.bind(this)}
                    >
                        <View style={styles.item}>
                            <Image style={styles.icon} source={require('../images/profile-like.png')}/>
                            <Text style={styles.itemText}>
                                我的收藏
                            </Text>
                            <Image style={styles.icon} source={require('../images/profile-up.png')}/>
                        </View>
                    </TouchableOpacity>
                    {loginOutCom}
                </View>
            );
    }

    onGetLikeTopic() {
        this.props.navigator.push({
            name: 'infoGroup',
            index: 4,
            props: {
                backText: '我的收藏',
                type: TO_INFO_GROUP_COLLECTIONS
            },
            component: InfoGroup
        });
    }

    onGetFocusSite() {
        this.props.navigator.push({
            name: 'infoGroup',
            index: 4,
            props: {
                backText: '我关注的站点',
                type: TO_INFO_GROUP_FOCUS_SITE
            },
            component: InfoGroup
        });
    }

    onSearchClick() {
        this.props.navigator.push({
            name: 'setting',
            index: 2,
            props: {
                backText: '搜索'
            },
            component: Search
        });
    }

    onClickUserInfo(){
        if (this.state.status !== 'logined'){
            return this.goToLogin();
        }
    }

    onLoginOut(){
        removeGlobal('oooLinkToken');
        removeGlobal('userName');
        removeGlobal('passWord');
        setGlobal('isLogin', false);
        Alert.alert('退出成功');
    }

    goToLogin(){
        this.props.navigator.push({
            name: 'login',
            component: Login
        });
    }

    componentDidMount() {
        getGlobal('userName', (userName)=>{
            userName && this.setState({userName});
            getGlobal('isLogin', (ret)=>{
                let status = ret ? 'logined' : 'login';
                this.setState({status, isSync: true});
            });
        });
    }
}

const styles = StyleSheet.create({
    item: {
        width,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    userInfoItem: {
        width,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    searchItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    userInfoText: {
        color: '#fff',
        backgroundColor: '#00000000',
        fontWeight: '900'
    },
    itemText: {
        width: width - 100,
        marginLeft: 20,
        textAlign: 'left'
    },
    icon: {
        width: 30,
        height: 30
    },
    searchInput: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        width: width - 30,
        height: 30,
        fontSize: 12,
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 4
    },
    loginOutButton: {
        width: 100,
        height: 30,
        borderWidth: 1,
        borderColor: '#f54b72',
        color: '#f54b72',
        textAlign: 'center',
        lineHeight: 21,
        fontSize: 14,
        borderRadius: 5,
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'center'
    }
});

export default Profile

