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
    TouchableOpacity,
    View
} from 'react-native';

class Button extends Component{
    
    static defaultProps={
        textColor: '#fff'
    };

    render(){
        return (
            <TouchableOpacity 
                activeOpacity={0.5}
                style={[this.props.style, {alignItems: 'center', justifyContent: 'center'}]}
                onPress={this.props.onPress.bind(this)}>
                <Text style={[styles.text,{color: this.props.textColor, fontSize: this.props.textSize}]}>{this.props.children}</Text>
            </TouchableOpacity>
        )
    }    
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: null,
        alignSelf: 'center',
        fontWeight: '900'
    }
});

export default Button;