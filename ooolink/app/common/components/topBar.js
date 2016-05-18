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
    PropTypes,
    View,
    Dimensions,
    Animated,
    TouchableOpacity
} from 'react-native';

let {height, width} = Dimensions.get('window');

class TopBar extends Component {

    static propTypes = {
        style: View.propTypes.style,
        onBack: PropTypes.func,
        backText: PropTypes.string
    };

    render() {
        return (
            <View style={styles.bar}>
                <TouchableOpacity
                    onPress={this._onBack.bind(this)}
                >
                    <Image
                        style={styles.backArrow}
                        source={require('../../images/topic-back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._onBack.bind(this)}
                >
                    <Text style={styles.backText}>
                        {this.props.backText}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _onBack() {
        this.props.onBack();
    }
}

const styles = StyleSheet.create({
    bar: {
        width,
        height: 50,
        backgroundColor: 'rgb(41,44,52)',
        flexDirection: "row",
        alignItems: "center"
    },
    backArrow: {
        marginLeft: 6,
        width: 16,
        height: 16
    },
    backText: {
        fontWeight: '900',
        fontSize: 16,
        color: '#fff',
        marginLeft: 6
    }
});

export default TopBar;