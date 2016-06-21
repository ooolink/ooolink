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
    Text,
    Image,
    TextInput,
    Dimensions,
    PropTypes,
    View,
    Alert
} from 'react-native';
import Button from '../common/components/base/button';
import SmsAndroid from '../common/nativeServices/smsAndroid';
import Loading from '../common/components/loadingBlock';
var validator = require('validator');

const {width, height} = Dimensions.get('window');

class Register extends Component {

    static propTypes = {
        type: PropTypes.string,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
            code: '',
            pwdOver: '',
            isSending: false,
            getCodeText: '发送验证码'
        }
    }

    render() {
        return (
            <View style={{width, height, backgroundColor: '#272a33'}}>
            <Image source={require('../images/ooolink_logo.png')} style={styles.logoImage}/>
            <Text style={styles.logoText}>ooolink</Text>
            <View style={styles.container}>
                <View style={styles.rowItem}>
                    <Image source={require('../images/login-account.png')} style={styles.icon}/>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder={"手机号或邮箱"}
                        selectionColor="#fff"
                        placeholderTextColor="#fff"
                        autoCorrect={false}
                        value={this.state.name}
                        onChangeText={this._changeName.bind(this)}
                        style={styles.wordInput}
                    />
                </View>
                <Button
                    textSize={12}
                    onPress={this._getCode.bind(this)}
                    style={[styles.getCodeButton, {backgroundColor: this.state.isSending ? null : '#65b278'}]}>
                    {this.state.getCodeText}
                </Button>
                <View style={{borderWidth:0.5, width: width-70, borderColor:'#eeeeee'}}/>
                <View style={styles.rowItem}>
                    <Image source={require('../images/login-code.png')} style={styles.icon}/>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder={"验证码"}
                        selectionColor="#fff"
                        placeholderTextColor="#fff"
                        autoCorrect={false}
                        value={this.state.code}
                        onChangeText={(text)=>{this.setState({code: text})}}
                        style={styles.wordInput}
                    />
                </View>
                <View style={{borderWidth:0.5, width: width-70, borderColor:'#eeeeee'}}/>
                <View style={styles.rowItem}>
                    <Image source={require('../images/login-password.png')} style={styles.icon}/>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder={"登陆密码"}
                        selectionColor="#fff"
                        placeholderTextColor="#fff"
                        autoCorrect={false}
                        value={this.state.pwd}
                        onChangeText={this._changePwd.bind(this)}
                        style={styles.wordInput}
                    />
                </View>
            </View>
            <Button
                onPress={this._submit.bind(this)}
                style={styles.button}>
                注册
            </Button>
            <Text 
                onPress={this.props.onGoLogin.bind(this)} 
                style={styles. buttonText}>
                返回登录
            </Text>
            </View>
        )
    }

    _getCode(){
        if (this.state.isSending){
            return;
        }
        if (this.state.getCodeText === '发送验证码' || this.state.getCodeText === '再发送一次'){
            if (validator.isEmail(this.state.name)){

            } else if (validator.isMobilePhone(this.state.name, 'zh-CN')){
                SmsAndroid.getVerificationCode('86', this.state.name);                                              //目前只支持中国的手机号码
            } else {
                Alert.alert('WARN', '手机或邮箱格式错误');
                return;                                 //错误提示
            }
            this.setState({getCodeText: `等待(60)s`, isSending: true});
        } 
        let t = setInterval(()=>{
            if (this.state.getCodeText === '等待(0)s'){
                this.setState({getCodeText: '再发送一次', isSending: false});
                clearInterval(t);
            } else {
                let time = parseInt(/\((.*)s/.exec(this.state.getCodeText)[1]);
                this.setState({getCodeText: `等待(${time-1})s`});
            }
        }, 1000);
    }

    _submit() {
        this.props.onSubmit(this.state.name, this.state.pwd);
    }

    _changeName(name) {
        this.setState({name})
    }

    _changePwd(pwd) {
        this.setState({pwd})
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 40,
        borderColor: '#eeeeee',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5
    },
    logoImage: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 40 + (height - 40)/2 - 240,
        left: width / 2 - 30
    },
    logoText:{
        width,
        textAlign: 'center',
        color:'#fff',
        backgroundColor: '#00000000',
        fontWeight: "900",
        fontSize: 20,
        marginTop: 40 + (height - 40)/2 - 150
    },
    bgImage: {
        position: 'absolute',
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowItem:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    wordInput: {
        fontSize: 12,
        color: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#ffffff00',
        height: 40,
        width: width - 95,
        marginLeft: 10
    },
    getCodeButton: {
        backgroundColor: '#65b278',
        padding: 5,
        position: 'absolute',
        top: 8,
        left: width - 125
    },
    button: {
        margin: 20,
        height: 40,
        backgroundColor: '#65b278'
    },
    buttonText: {
        fontWeight:'900',
        lineHeight: 20,
        textAlign: 'center',
        margin: 20,
        color: '#fff',
        height: 30,
        },
    cover:{
        position:'absolute',
        top:0,
        width,
        height,
        backgroundColor: '#00000066'
    },
    icon: {
        width: 15,
        height: 15
    }
});
export default Register;