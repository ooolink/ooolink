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
        onBack: PropTypes.func.isRequired
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
        flex: 1,
        height: 40,
        backgroundColor: '#2F85A7',
        flexDirection: "row",
        alignItems: "center"
    },
    backArrow: {
        marginLeft: 6,
        width: 20,
        height: 20
    }
});

export default TopBar;