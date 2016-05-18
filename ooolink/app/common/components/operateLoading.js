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
    TouchableOpacity,
    Modal
} from 'react-native';
import LoadingBlock from './loadingBlock'

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
        return (
            <Modal
                transparent={true}
                visible={this.props.visible}
            >
                <LoadingBlock
                    style={{backgroundColor: '#00000066'}}
                />
            </Modal>
        )
    }
}

export default OperateLoading;