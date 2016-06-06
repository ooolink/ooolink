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
import Button from '../common/components/base/button'
import LoadingBlock from '../common/components/loadingBlock'
import Search from './search';
import InfoGroup from './infoGroup';
import Login from './loginContainer';
import {UriDeal, WordLineDeal, timeDeal} from '../utils';
import {USER_DEFAULT_HEAD} from '../constants/config';
import {TO_INFO_GROUP_FOCUS_SITE, TO_INFO_GROUP_COLLECTIONS} from '../constants/passAgreement';
import * as collectService from '../services/collectService';
import * as loginService from '../services/loginService';
import * as userService from '../services/userService';

let {height, width} = Dimensions.get('window');

class Profile extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            status: ''
        }
    }

    render() {
        let {userIsLogon, userName, userInfo} = this.props.state.user;

        let userRealName = userInfo && userInfo.user_realname ? userInfo.user_realname : '...',
            userHeadImage = userInfo && userInfo.user_image ? UriDeal(userInfo.user_image) : USER_DEFAULT_HEAD,
            userDesc = userInfo && userInfo.user_desc ? userInfo.user_desc : '',
            userLiving = userInfo && userInfo.user_living ? userInfo.user_living: '未知',
            userWork = userInfo && userInfo.user_work ? userInfo.user_work: '未知',
            userEducation = userInfo && userInfo.user_education ? userInfo.user_education: '未知';
        
        let seximg = null;
        if (userInfo){
            if (userInfo.user_sex === 0){
                seximg = <Image source={require('../images/profile-sex-girl.png')} style={styles.smallIcon}/>;
            } else if (userInfo.user_sex === 1){
                seximg = <Image source={require('../images/profile-sex-boy.png')} style={styles.smallIcon}/>;
            }
        } 

        let that = this;
        let loginOutCom = userIsLogon ? 
                    <Button
                        textColor={'#f54b72'}
                        onPress={this.onLoginOut.bind(this)}
                        style={styles.loginOutButton}>
                        退出登录
                    </Button> : null;

            return (
                <View style={{backgroundColor:'#fff'}}>
                    <Image
                        source={require('../images/user-bg.jpg')}
                        style={styles.userInfoItem}>
                        <Image
                            source={{uri: userHeadImage}}
                            style={styles.userHead}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.userInfoText} onPress={this.onClickUserInfo.bind(this)}>
                                {userIsLogon ? `${userRealName}` : '登录/注册'}
                            </Text>
                            {seximg}
                        </View>
                        <Text style={styles.userDescText}>
                            {userDesc}
                        </Text>
                    </Image>
                    <View style={styles.userDetailInfo}>
                        <View style={styles.userDetailInfoItem}>
                            <Image style={styles.smallIcon} source={require('../images/profile-address.png')}/>
                            <Text style={styles.userDetailInfoText}>{userLiving}</Text>
                        </View>
                         <View style={styles.userDetailInfoItem}>
                            <Image style={styles.smallIcon} source={require('../images/profile-work.png')}/>
                            <Text style={styles.userDetailInfoText}>{userWork}</Text>
                        </View>
                         <View style={styles.userDetailInfoItem}>
                            <Image style={styles.smallIcon} source={require('../images/profile-education.png')}/>
                            <Text style={styles.userDetailInfoText}>{userEducation}</Text>
                        </View>
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
                    <TouchableOpacity
                        onPress={this.onAbout.bind(this)}
                    >
                        <View style={styles.item}>
                            <Image style={styles.icon} source={require('../images/profile-about.png')}/>
                            <Text style={styles.itemText}>
                                关于
                            </Text>
                            <Image style={styles.icon} source={require('../images/profile-up.png')}/>
                        </View>
                    </TouchableOpacity>
                    {loginOutCom}
                </View>
            );
    }

    componentDidMount() {
        let token = this.props.state.user.userToken,
            isLogin = this.props.state.user.userIsLogon;
        isLogin && userService.getUserInfo(token, rs=>{
            if (rs && rs.result === 1){
                this.props.actions.updateUserInfo(rs.data);
            } else {
                //TODO
            }
        });
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

    onAbout(){
        Alert.alert('About', '作者:董一炜\n项目源码:https://github.com/ooolink/ooolink');
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
        height: 110,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    userHead: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 10
    },
    userDescText: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#00000000',
        fontWeight: '600'
    },
    searchItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    userInfoText: {
        color: '#fff',
        backgroundColor: '#00000000',
        fontWeight: '900',
        marginBottom: 6
    },
    itemText: {
        width: width - 100,
        marginLeft: 20,
        textAlign: 'left'
    },
    userDetailInfo:{
        width,
        padding: 3,
        borderColor: '#eee',
        borderWidth: 12,
        opacity: 0.9
    },
    userDetailInfoItem:{
        flexDirection: 'row',
        padding: 5
    },
    userDetailInfoText:{
        marginLeft: 5,
        fontSize: 13,
        color: '#222'
    },
    icon: {
        width: 30,
        height: 30
    },
    smallIcon: {
        width: 15,
        height: 15
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
        borderRadius: 5,
        marginTop: 50,
        marginBottom: 20,
        alignSelf: 'center'
    }
});

export default Profile

