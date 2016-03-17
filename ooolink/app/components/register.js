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

const BG_URL = 'http://7lrzfj.com1.z0.glb.clouddn.com/soliury213H.png';
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
                        value={this.state.pwd}
                        onChangeText={this._changePwd.bind(this)}
                        style={styles.wordInput}
                    />
                </View>
                <Button
                    onPress={this._submit.bind(this)}
                    style={styles.login}
                >注册</Button>
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
        this.setState({pwd: this.state.pwd + pwd.charAt(pwd.length - 1)})
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
        backgroundColor: '#22b473'
    }
});

export default Register;