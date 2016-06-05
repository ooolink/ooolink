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
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import ProfileEdit from '../containers/profileEdit';
import Login from '../containers/loginContainer';
import Search from '../containers/search';

const {width, height} = Dimensions.get('window');

class IndexTopBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        switch (this.props.idx){
            case 0:
            case 1:
            return (
                <View style={{backgroundColor: 'rgb(41,44,52)'}}>
                    <Text style={styles.logoText}>oooLink</Text>
                    <TouchableOpacity 
                        onPress={this.onOpenSearch.bind(this)}
                        style={styles.edit}>
                        <Image style={styles.image} source={require('../images/index-search.png')}/>
                    </TouchableOpacity>
                </View>
            );
            case 2: 
            return (
                <View style={{backgroundColor: 'rgb(41,44,52)'}}>
                    <Text style={styles.logoText}>oooLink</Text>
                    <TouchableOpacity 
                        onPress={this.onOpenProfileEdit.bind(this)}
                        style={styles.edit}>
                        <Image style={styles.image} source={require('../images/profile-edit.png')}/>
                    </TouchableOpacity>
                </View>
            );
            
            default:  
            return (
                <Text style={styles.logoText}>oooLink</Text>
            );
        }
    }

    onOpenProfileEdit(){
        let {userIsLogon} = this.props.state.user;
        if (!userIsLogon){
            return this.gotoLogin();
        }
        this.props.navigator.push({
            name: 'ProfileEdit',
            component: ProfileEdit
        });
    }

    onOpenSearch(){
        this.props.navigator.push({
            name: 'Search',
            component: Search
        });
    }

    gotoLogin(){
        this.props.navigator.push({
            name: 'Login',
            component: Login
        });
    }
}

const styles = StyleSheet.create({
    logoText: {
        width,
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 10,
        color:'#fff',
        backgroundColor: null,
        fontWeight: "900",
        fontSize: 18,
        height: 50
    },
    image:{
        width: 26, 
        height: 26
    },
    edit:{
        width: 26,
        height: 26,
        position: 'absolute',
        left: width - 40,
        top: 10
    }
});

export default IndexTopBar;