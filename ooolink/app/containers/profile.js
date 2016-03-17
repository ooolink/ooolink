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
    View
} from 'react-native';
import Login from '../components/login';
import Register from '../components/register';
import * as loginService from '../services/loginService';
import {connect} from 'react-redux';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'login'
        }
    }

    render() {
        if (this.state.status === 'login') {
            return (
                <Login
                    onSubmit={this.onLogin.bind(this)}
                    onGoRegister={this.onGoRegister.bind(this)}
                />
            )
        } else if (this.state.status === 'register') {
            return (
                <Register
                    onSubmit={this.onRegister.bind(this)}
                />
            )
        } else if (this.state.status === 'logined') {
            return (
                <Text>123</Text>
            )
        }
    }

    onLogin(name, pwd) {
        loginService.session(name, (data)=> {
            if (data.result) {
                loginService.login(name, pwd, data.token, (data)=> {
                    if (data.result) {
                        this.setState({status: 'logined'})
                    }
                })
            }
        })
    }

    onRegister(name, pwd) {
        loginService.sign(name, pwd, (data=> {
            if (data.result) {
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

