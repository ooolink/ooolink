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
    Image,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Navigator,
    PropTypes,
    View,
    TouchableOpacity
} from 'react-native';
import LoadingBlock from './loadingBlock'
let {height, width} = Dimensions.get('window');

class OperateLoading extends Component{

    static defaultProps = {
        visible: false
    };

    static propTypes = {
        visible: PropTypes.bool
    };

    constructor(props){
        super(props);
    }

    render(){
        if (!this.props.visible){
            return null;
        }
        return (
            <View
                style={{width, height, position: 'absolute', top:0, left: 0}}
            >
                <LoadingBlock
                    style={{backgroundColor: '#00000022'}}
                />
            </View>
        )
    }
}

export default OperateLoading;