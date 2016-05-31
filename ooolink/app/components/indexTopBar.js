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
    View
} from 'react-native';

const {width, height} = Dimensions.get('window');

class IndexTopBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        switch (this.props.idx){
            case 2: 
            return (
                <View>
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
        
    }
}

const styles = StyleSheet.create({
    logoText: {
        width,
        textAlign: 'left',
        paddingLeft: 20,
        color:'#fff',
        backgroundColor: 'rgb(41,44,52)',
        fontWeight: "900",
        fontSize: 18,
        height: 50,
        lineHeight: 32
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