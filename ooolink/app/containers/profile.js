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
import * as loginService from '../services/loginService';

let {height, width} = Dimensions.get('window');

class Profile extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            status: ''
        }
    }

    render() {
        let {userIsLogon, userName} = this.props.state.user;

        let that = this;
        let loginOutCom = userIsLogon ? 
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
                            {userIsLogon ? `用户 : ${userName} (子账号数 : 3)` : '登录/注册'}
                        </Text>
                    </Image>
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
        let {userIsLogon, userName} = this.props.state.user;
        if (!userIsLogon){
            return this.goToLogin();
        }
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
        let {userIsLogon, userName} = this.props.state.user;
        if (!userIsLogon){
            return this.goToLogin();
        }
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

    onClickUserInfo(){
        let {userIsLogon, userName} = this.props.state.user;
        if (!userIsLogon){
            return this.goToLogin();
        }
    }

    onLoginOut(){
        loginService.loginOut();
        this.props.actions.setUserInfoAfterLoginStatusChange(null, null, null, false, 'infoClear');
        Alert.alert('退出成功');
    }

    goToLogin(){
        this.props.navigator.push({
            name: 'login',
            component: Login
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

