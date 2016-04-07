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
    View,
    ScrollView,
    Text,
    Animated,
    PropTypes,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

class Themes extends Component {

    static propTypes = {
        onChooseTheme: PropTypes.func.isRequired
    };

    render() {
        let _this = this;
        return (
            <View style={styles.container}>
                {
                    function() {
                        return _this.props.themes && _this.props.themes.map((theme, idx)=> {
                                return (
                                    <Text style={styles.itemLang} key={idx}
                                          onPress={_this.chooseTheme.bind(_this, theme)}
                                    >{theme}</Text>
                                )
                            })
                    }()
                }
            </View>
        )
    }

    chooseTheme(theme) {
        this.props.onChooseTheme(theme);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        backgroundColor: '#2F85A7'
    },
    itemLang: {
        fontSize: 12,
        height: 20,
        marginRight: 10,
        color: '#fff'
    }
});

export default Themes;