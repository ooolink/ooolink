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
    Animated
} from 'react-native';

let {height, width} = Dimensions.get('window');

class Loading extends Component {

    static propTypes = {
        style: View.propTypes.style,
        isAnimate: PropTypes.bool
    };

    static defaultProps = {
        loadingGIF: require('../../images/loading-gif.gif'),
        isAnimate: false
    };

    constructor(props) {
        super(props);
        this.state = {
            rotate: 0
        };
    }

    render() {
        return (
            <Animated.View style={[this.props.style,styles.container]}>
                <Image
                    style={[styles.loadingGIF, {transform: [{rotate: this.state.rotate + "deg"}]}]}
                    source={this.props.loadingGIF}
                />
            </Animated.View>
        )
    }

    componentDidMount() {
        if (this.rotated || !this.props.isAnimate) {
            return;
        }
        this.rotated = setInterval(()=> {
            this.setState({rotate: this.state.rotate + 10});
        }, 10);
    }

    componentWillUnmount() {
        clearInterval(this.rotated);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loadingGIF: {
        height: 8,
        width: 50
    }
});

export default Loading;