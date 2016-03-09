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
    Image,
    TouchableOpacity
} from 'react-native';
import DropDownBlock from '../common/components/dropDownBlock';

import Theme from '../containers/themes';

let {height, width} = Dimensions.get('window');

class TitleBar extends Component {

    static propTypes = {
        onOpenProfile: PropTypes.func.isRequired,
        onOpenSetting: PropTypes.func.isRequired,
        themeBlockHeight: PropTypes.number.isRequired,
        themeSelected: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            openStatus: false,
            arrowImage: require('../images/home-arrow-down.png')
        }
    }

    componentWillReceiveProps(nextProps) {
        const {themeBlockHeight, themeSelected} = nextProps;
        if (themeBlockHeight != this.state.themeBlockHeight) {
            this.setState({themeBlockHeight});
        }

        if (themeSelected != this.props.themeSelected) {
            this.openBlock()
        }
    }

    render() {
        return (
            <View>
                <DropDownBlock
                    openStatus={this.state.openStatus}
                    style={styles.dropDownBlock}
                    endHeight={this.state.themeBlockHeight}
                >
                    <View style={styles.dropDownBlockContainer}>
                        <Theme/>
                    </View>
                </DropDownBlock>
                <View style={styles.bar}>
                    <Text style={styles.selectedItem}
                          onPress={this.openBlock.bind(this)}>
                        {this.props.themeSelected}&nbsp;
                        <Image
                            style={styles.itemArrow}
                            source={this.state.arrowImage}
                        />
                    </Text>
                    <TouchableOpacity
                        style={[styles.itemIcon,{
                            marginLeft: width-110
                        }]}
                        onPress={this.openProfile.bind(this)}
                    >
                        <Image
                            style={styles.itemIcon}
                            source={require('../images/home-profile.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.itemIcon,{
                            marginLeft: 10
                        }]}
                        onPress={this.openSetting.bind(this)}
                    >
                        <Image
                            style={styles.itemIcon}
                            source={require('../images/home-setting.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    openProfile() {
        this.props.onOpenProfile();
    }

    openSetting() {
        this.props.onOpenSetting();
    }

    openBlock() {
        this.setState({
            openStatus: !this.state.openStatus,
            arrowImage: !this.state.openStatus ? require('../images/home-arrow-up.png') : require('../images/home-arrow-down.png')
        });
    }
}

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
    dropDownBlockContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    itemArrow: {
        width: 10,
        height: 10
    },
    itemIcon: {
        width: 16,
        height: 16
    }
});

export default TitleBar;