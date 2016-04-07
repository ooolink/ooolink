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
    TextInput,
    Dimensions,
    Navigator,
    PropTypes,
    View
} from 'react-native';
import Button from 'react-native-button';

const BG_URL = 'http://img.hb.aicdn.com/963f2ec0ed9098a6e20420c592fd220f37b0e6df31684-Ab2ZyV_fw658';
const {width, height} = Dimensions.get('window');

class Login extends Component {

    static propTypes = {
        type: PropTypes.string,
        onGoRegister: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pwd: '',
            pwdOver: ''
        }
    }

    render() {
        return (
            <Image source={{uri: BG_URL}} style={styles.bgImage}>
                <View style={styles.container}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={this._changeName.bind(this)}
                        style={styles.wordInput}
                    />
                    <TextInput
                        value={this.state.pwdOver}
                        onChangeText={this._changePwd.bind(this)}
                        style={styles.wordInput}
                    />
                </View>
                <Button
                    onPress={this._submit.bind(this)}
                    style={styles.login}
                >Log in</Button>
                <Text onPress={this._onGoRegister.bind(this)}>注册</Text>
            </Image>
        )
    }

    _submit() {
        this.props.onSubmit(this.state.name, this.state.pwd);
    }

    _changeName(name) {
        this.setState({name})
    }

    _changePwd(pwd) {
        let pwdOver = '';
        for (let i = 0, len = pwd.length; i < len; i++) {
            pwdOver += '*';
        }
        if (this.state.pwd.length < pwd.length) {
            pwd = this.state.pwd + pwd.charAt(pwd.length - 1);
        } else {
            pwd = this.state.pwd.substr(0, this.state.pwd.length - 1);
        }
        this.setState({pwd, pwdOver});
    }

    _onGoRegister() {
        this.props.onGoRegister();
    }
}

const styles = StyleSheet.create({
    bgImage: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wordInput: {
        color: '#fff',
        marginTop: 20,
        backgroundColor: '#33333399',
        width: width - 40,
        height: 40
    },
    login: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 16,
        color: '#fff',
        width: width - 40,
        height: 30,
        backgroundColor: '#2F85A7'
    }
});

export default Login;