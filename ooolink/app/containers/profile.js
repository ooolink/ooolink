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
import Login from '../components/login';
import Register from '../components/register';
import TopBar from '../common/components/topBar';
import Search from '../containers/search';
import InfoGroup from '../containers/infoGroup';
import {TO_INFO_GROUP_FOCUS_SITE, TO_INFO_GROUP_COLLECTIONS} from '../constants/passAgreement';
import * as loginService from '../services/loginService';
import * as collectService from '../services/collectService';
import {setGlobal, getGlobal} from '../store';

let {height, width} = Dimensions.get('window');

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: getGlobal('oooLinkToken') ? 'logined' : 'login'
        }
    }

    render() {
        const {currentSite, siteInfo} = this.props.state.app;

        if (this.state.status === 'login') {
            return (
                <Login
                    onSubmit={this.onLogin.bind(this)}
                    onGoRegister={this.onGoRegister.bind(this)}
                />
            );
        } else if (this.state.status === 'register') {
            return (
                <Register
                    onSubmit={this.onRegister.bind(this)}
                />
            );
        } else if (this.state.status === 'logined') {
            return (
                <View>
                    <TopBar
                        onBack={this.onBack.bind(this)}
                        backText={siteInfo[currentSite].title}
                    />
                    <Image
                        source={require('../images/user-bg.jpg')}
                        style={styles.userInfoItem}>
                        <Text style={styles.userInfoText}>
                            用户 : {getGlobal('userName')} (子账号数 : 3)
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
                    <View style={styles.item}>
                        <Image style={styles.icon} source={require('../images/profile-message.png')}/>
                        <Text style={styles.itemText}>
                            我的消息
                        </Text>
                        <Image style={styles.icon} source={require('../images/profile-up.png')}/>
                    </View>
                </View>
            );
        }
    }

    onGetLikeTopic() {
        this.props.navigator.push({
            name: 'infoGroup',
            index: 4,
            props: {
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
                type: TO_INFO_GROUP_FOCUS_SITE
            },
            component: InfoGroup
        });
    }

    onBack() {
        this.props.navigator.pop();
    }

    onLogin(name, pwd) {
        loginService.session(name, (data)=> {
            if (data.result) {
                loginService.login(name, pwd, data.token, (data)=> {
                    if (data.result) {
                        setGlobal('oooLinkToken', data.token);
                        setGlobal('userName', name);
                        Alert.alert('登陆成功');
                        collectService.getCollections(data.token, ()=> {

                        });
                        this.setState({status: 'logined'})
                    }
                })
            }
        })
    }

    onRegister(name, pwd) {
        loginService.sign(name, pwd, (data=> {
            if (data.result) {
                setGlobal('oooLinkToken', data.token);
                Alert.alert('注册成功');
                this.setState({status: 'logined'})
            }
        }));
    }

    onGoRegister() {
        this.setState({
            status: 'register'
        });
    }

    onSearchClick() {
        this.props.navigator.push({
            name: 'setting',
            index: 2,
            props: {
                backText: '用户中心'
            },
            component: Search
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
    }
});

export default Profile

