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
    Dimensions,
    Navigator,
    View,
    Alert
} from 'react-native';
import Login from '../components/login';
import Register from '../components/register';
import TopBar from '../common/components/topBar';
import * as loginService from '../services/loginService';
import * as collectService from '../services/collectService';
import {connect} from 'react-redux';
import {setGlobal, getGlobal} from '../store';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: getGlobal('oooLinkToken') ? 'logined' : 'login'
        }
    }

    render() {
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
                    />
                </View>
            );
        }
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
}

function profile() {
    "use strict";
    return {}
}

export default connect(profile)(Profile)

