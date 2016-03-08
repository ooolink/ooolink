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
    PropTypes
} from 'react-native';

class DropDownBlock extends Component {

    static propTypes = {
        style: View.propTypes.style,
        startHeight: PropTypes.number,
        endHeight: PropTypes.number,
        duration: PropTypes.number,
        openStatus: PropTypes.bool.isRequired,
        overHeight: PropTypes.number
    };

    static defaultProps = {
        startHeight: 0,
        endHeight: 100,
        duration: 200,
        overHeight: 40
    };

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            blockHeight: new Animated.Value(-this.props.endHeight)
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            height: nextProps.endHeight - nextProps.startHeight,
            blockHeight: new Animated.Value(this.props.openStatus ? -nextProps.startHeight : -nextProps.endHeight)
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.openStatus === this.props.openStatus) {
            return;
        }
        Animated.timing(
            this.state.blockHeight,
            {
                toValue: prevProps.openStatus ? -this.props.endHeight : -this.props.startHeight,
                duration: this.props.duration
            }
        ).start();
    }

    render() {
        return (
            <Animated.View
                style={[this.props.style,{
                    marginTop:this.props.overHeight,
                    height: this.state.height,
                    top: this.state.blockHeight
                }]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

export default DropDownBlock;