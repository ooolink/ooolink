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
    View
} from 'react-native';
import Button from '../common/components/base/button';
import Loading from '../common/components/loadingBlock';

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
            <View>
            <Image source={{uri: this.props.bgimage}} style={styles.bgImage}>
            </Image>
            <View style={styles.cover}/>
            <Text style={styles.logoText}>ooolink</Text>
            <View style={styles.container}>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    placeholder={"Username"}
                    placeholderTextColor="#fff"
                    autoCorrect={false}
                    value={this.state.name}
                    onChangeText={this._changeName.bind(this)}
                    style={styles.wordInput}
                />
                <View style={{borderWidth:0.5, width: width-70, borderColor:'#eeeeee'}}/>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    placeholder={"Password"}
                    placeholderTextColor="#fff"
                    autoCorrect={false}
                    value={this.state.pwd}
                    onChangeText={this._changePwd.bind(this)}
                    style={styles.wordInput}
                />
            </View>
            <Button
                onPress={this._submit.bind(this)}
                style={styles.button}>
                Sign up
            </Button>
            <Text 
                onPress={this.props.onGoLogin.bind(this)} 
                style={styles. buttonText}>
                返回登录
            </Text>
            </View>
        )
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
        borderColor: '#eeeeee',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5
    },
    logoText:{
        width,
        textAlign: 'center',
        color:'#fff',
        backgroundColor: '#00000000',
        fontWeight: "900",
        fontSize: 20,
        marginTop: 40 + (height - 40)/2 - 200
    },
    bgImage: {
        position: 'absolute',
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wordInput: {
        paddingLeft: 20,
        paddingRight: 20,
        color: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#ffffff00',
        width: width - 40,
        height: 40
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
    }
});
export default Register;