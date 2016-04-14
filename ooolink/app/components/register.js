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
import Loading from '../common/components/loadingBlock';

const BG_URL = 'http://img.hb.aicdn.com/963f2ec0ed9098a6e20420c592fd220f37b0e6df31684-Ab2ZyV_fw658';
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
            pwdOver: '',
            loading: true
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{width, height}}>
                    <Loading/>
                </View>
            );
        }
        return (
            <Image source={{uri: BG_URL}} style={styles.bgImage}>
                <View style={styles.container}>
                    <TextInput
                        autoFocus={true}
                        autoCorrect={false}
                        value={this.state.name}
                        onChangeText={this._changeName.bind(this)}
                        style={styles.wordInput}
                    />
                    <TextInput
                        autoCorrect={false}
                        value={this.state.pwd}
                        onChangeText={this._changePwd.bind(this)}
                        style={styles.wordInput}
                    />
                </View>
                <Button
                    onPress={this._submit.bind(this)}
                    style={styles.button}
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
        this.setState({pwd})
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({loading: false});
        }, 166);
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40 + (height - 40)/2 - 200,
        left: 20 
    },
    bgImage: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wordInput: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#fff',
        marginTop: 20,
        backgroundColor: '#ffffff33',
        width: width - 40,
        height: 40
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 16,
        color: '#fff',
        width: width - 40,
        height: 30,
        backgroundColor: '#2F85A7'
    }
});

export default Register;