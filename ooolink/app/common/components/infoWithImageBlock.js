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
    Dimensions,
    Navigator,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    PropTypes
} from 'react-native';

let {height, width} = Dimensions.get('window');

class InfoWithImageBlock extends Component{

    static propTypes = {
        blockId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        onPress: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <TouchableOpacity
                onPress={this.onSelected.bind(this)}
                >
                <Image
                    style={styles.bgImage}
                    source={{uri: this.props.imageURL}}>
                    <View style={styles.colorBg}>
                        <Text
                            style={[styles.textBase, styles.title]}
                            >
                            {this.props.name}
                        </Text>
                        <Text
                            style={[styles.textBase]}
                            >
                            {this.props.desc}
                        </Text>
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }

    onSelected(){
        if (this.props.onPress){
            this.props.onPress(this.props.blockId);
        }
    }
}

const styles = StyleSheet.create({
    bgImage: {
        width,
        height: 100
    },
    colorBg: {
        padding: 20,
        backgroundColor: '#00000099',
        width,
        height:100
    },
    textBase: {
        color: '#fff'
    },
    title: {
        fontSize: 17,
        fontWeight: '900',
        marginBottom: 10
    }
});

export default InfoWithImageBlock;