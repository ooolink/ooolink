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

let {height, width} = Dimensions.get('window');

class TopicBar extends Component {

    static propTypes = {
        style: View.propTypes.style,
        onBack: PropTypes.func.isRequired,
        onLike: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        let likeImage = require('../images/like-none-white.png');

        switch (this.props.likeStatus) {
            case 'none':
                likeImage = require('../images/like-none-white.png');
                break;
            case 'ok':
                likeImage = require('../images/like-ok-white.png');
                break;
            case 'loading':
                likeImage = require('../images/loading-white.png');
                break;
        }
        return (
            <View style={styles.bar}>
                <TouchableOpacity
                    onPress={this._onBack.bind(this)}
                >
                    <Image
                        style={styles.backArrow}
                        source={require('../images/topic-back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._onBack.bind(this)}
                >
                    <Text style={styles.backText}>
                        详细内容
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{left: width - 130}}
                    onPress={this._onLike.bind(this)}
                >
                    <Image
                        style={styles.likeButton}
                        source={likeImage}/>
                </TouchableOpacity>
            </View>
        )
    }

    _onBack() {
        this.props.onBack();
    }

    _onLike() {
        this.props.onLike();
    }
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        width,
        top: 0,
        flex: 1,
        height: 50,
        backgroundColor: 'rgb(41,44,52)',
        flexDirection: "row",
        alignItems: "center"
    },
    likeButton: {
        width: 20,
        height: 20
    },
    backText: {
        fontWeight: '900',
        fontSize: 16,
        color: '#fff',
        marginLeft: 6
    },
    backArrow: {
        marginLeft: 6,
        width: 20,
        height: 20
    }
});

export default TopicBar;