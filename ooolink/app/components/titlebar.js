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

import Themes from '../components/themes';

let {height, width} = Dimensions.get('window');

class TitleBar extends Component {

    static propTypes = {
        siteLikeStatus: PropTypes.string,
        onOpenProfile: PropTypes.func.isRequired,
        onSiteFocus: PropTypes.func.isRequired,
        onChooseTheme: PropTypes.func.isRequired,
        themeBlockHeight: PropTypes.number.isRequired,
        themeSelected: PropTypes.string.isRequired,
        style: View.propTypes.style
    };

    constructor(props) {
        super(props);
        this.state = {
            openStatus: false,
            arrowImage: require('../images/home-arrow-down.png')
        }
    }

    render() {
        let likeImage = require('../images/star-none-white.png');

        switch (this.props.siteLikeStatus) {
            case 'none':
                likeImage = require('../images/star-none-white.png');
                break;
            case 'ok':
                likeImage = require('../images/star-ok-white.png');
                break;
            case 'loading':
                likeImage = require('../images/loading-white.png');
                break;
        }
        return (
            <View style={this.props.style}>
                <DropDownBlock
                    openStatus={this.state.openStatus}
                    style={styles.dropDownBlock}
                    endHeight={this.props.themeBlockHeight}
                >
                    <View style={styles.dropDownBlockContainer}>
                        <Themes
                            themes={this.props.themes}
                            onChooseTheme={this.onChooseTheme.bind(this)}
                        />
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
                            left: width-60
                        }]}
                        onPress={this.openProfile.bind(this)}
                    >
                        <Image
                            style={styles.itemIcon}
                            source={require('../images/home-profile.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.siteFocus.bind(this)}
                        style={[styles.itemIcon,{
                            left:width-30
                        }]}
                    >
                        <Image
                            style={styles.itemIcon}
                            source={likeImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    siteFocus() {
        this.props.onSiteFocus();
    }

    openProfile() {
        this.props.onOpenProfile();
    }

    onChooseTheme(theme) {
        this.openBlock();
        setTimeout(()=> {
            this.props.onChooseTheme(theme)
        }, 200);
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
        backgroundColor: '#2F85A7',
        flexDirection: "row",
        alignItems: "center"
    },
    selectedItem: {
        marginLeft: 10,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900'
    },
    dropDownBlock: {
        flex: 1,
        width,
        backgroundColor: '#2F85A7'
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
        top: 6,
        position: 'absolute',
        width: 16,
        height: 16
    }
});

export default TitleBar;