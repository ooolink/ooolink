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
import * as loginService from '../services/loginService';
import * as userService from '../services/userService';
import {getGlobal, setGlobal} from '../store';

class LoginContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'login',
            bgImage: ''
        }
    }

    render(){
        if (this.state.status === 'login'){
            return (
                <View>
                    <Login
                        bgimage={this.state.bgImage}
                        onSubmit={this.onLogin.bind(this)}
                        onGoRegister={()=>{this.setState({status: 'register'})}}
                    />
                    <TouchableOpacity
                        style={{position: 'absolute', top: 0, left: 0}}
                        onPress={this.onLoginClose.bind(this)}
                    >
                        <Image style={styles.loginClose} source={require('../images/login-close.png')}/>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <Register
                        bgimage={this.state.bgImage}
                        onSubmit={this.onRegister.bind(this)}
                        onGoLogin={()=>{this.setState({status: 'login'})}}
                    />
                    <TouchableOpacity
                        style={{position: 'absolute', top: 0, left: 0}}
                        onPress={this.onLoginClose.bind(this)}
                    >
                        <Image style={styles.loginClose} source={require('../images/login-close.png')}/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    onLogin(name, pwd) {
        loginService.session(name, (rs)=> {
            if (rs.result) {
                loginService.login(name, pwd, rs.data, (rs)=> {
                    if (rs && rs.result) {
                        this.props.actions.setUserInfoAfterLoginStatusChange(name, pwd, rs.data, true);
                        //登陆后获取用户信息
                        userService.getUserInfo(rs.data, rs=>{
                            if (rs && rs.result === 1){
                                this.props.actions.updateUserInfo(rs.data);
                            } 
                        });
                        Alert.alert('登陆成功');
                        this.onLoginClose();
                    } else {
                        Alert.alert('登陆名或密码错误');
                    }
                })
            }
        })
    }

    onRegister(name, pwd) {
        loginService.sign(name, pwd, (rs=> {
            if (rs && rs.result) {
                this.props.actions.setUserInfoAfterLoginStatusChange(name, pwd, rs.data, true);
                Alert.alert('注册成功');
                this.onLoginClose();
            } else {
                Alert.alert('注册失败');
            }
        }));
    }

    onLoginClose(){
        this.props.navigator.pop();
    }

    componentDidMount() {
        getGlobal('loginBgImage', bgImage=>{
            this.setState({bgImage});
        });
    }
}

const styles = StyleSheet.create({
    loginClose: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 20,
        left: 20
    }
});

export default LoginContainer;