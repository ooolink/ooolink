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
    Text,
    Animated,
    PropTypes,
    Dimensions,
    Image
} from 'react-native';
import DropDownBlock from '../common/components/dropDownBlock';

class TitleBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openStatus: false,
            arrowImage: require('../images/home-arrow-down.png')
        }
    }

    render() {
        return (
            <View>
                <DropDownBlock
                    openStatus={this.state.openStatus}
                    style={styles.dropDownBlock}
                    startHeight={0}
                    endHeight={100}
                    duration={200}
                >
                    <Text>gh</Text>
                </DropDownBlock>
                <View style={styles.bar}>
                    <Text style={styles.selectedItem}
                          onPress={this.openBlock.bind(this)}>
                        首页&nbsp;
                        <Image
                            style={styles.itemArrow}
                            source={this.state.arrowImage}
                        />
                    </Text>
                </View>
            </View>
        )
    }

    openBlock() {
        this.setState({
            openStatus: !this.state.openStatus,
            arrowImage: !this.state.openStatus ? require('../images/home-arrow-up.png') : require('../images/home-arrow-down.png')
        });
    }
}

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bar: {
        position: 'absolute',
        width,
        top: 0,
        flex: 1,
        height: 40,
        backgroundColor: '#22b473',
        flexDirection: "row",
        alignItems: "center"
    },
    selectedItem: {
        width: 50,
        marginLeft: 10,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900'
    },
    dropDownBlock: {
        flex: 1,
        backgroundColor: '#22b473'
    },
    itemArrow: {
        width: 10,
        height: 10
    }
});

export default TitleBar;