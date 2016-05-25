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

const {width, height} = Dimensions.get('window');

class IndexTopBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Text style={styles.logoText}>oooLink</Text>
        )
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
    }
});

export default IndexTopBar;