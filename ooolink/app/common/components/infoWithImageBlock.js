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
    PropTypes,
    Animated,
    Platform
} from 'react-native';

let {height, width} = Dimensions.get('window');

class InfoWithImageBlock extends Component{

    static defaultProps = {
        scale: 1
    };

    static propTypes = {
        blockId: PropTypes.any,
        scale: PropTypes.number,
        height: PropTypes.number,
        name: PropTypes.string,
        desc: PropTypes.string,
        imageURL: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        canChoose: PropTypes.any,
        activeOpacity: PropTypes.number
    };

    constructor(props) {
        super(props);
        let w = (props.scale || 1) * width;
        let moveAnim = props.canChoose && Platform.OS !== 'android' ? new Animated.Value(0) : new Animated.Value(w);
        this.state = {
            showChoose: false,
            moveAnim
        }
    }

    render(){
        let height = this.props.height || 100;
        let chooseCom = this.state.showChoose ? this.props.canChoose : null;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={this.props.activeOpacity || 1}
                    onPress={this.onSelected.bind(this)}
                    >
                    <Animated.Image
                        style={[styles.bgImage,{width: this.state.moveAnim, height}]}
                        source={{uri: this.props.imageURL}}>
                        <Animated.View style={[styles.colorBg,{width: this.state.moveAnim, height}]}>
                            {
                                this.props.children
                            }
                            {
                                (()=>{
                                    if (this.props.name){
                                         return <Text
                                            style={[styles.textBase, styles.title]}
                                         >
                                             {this.props.name || ''}
                                         </Text>;
                                    }
                                })()
                            }
                            {
                                (()=>{
                                    if (this.props.desc){
                                         return <Text
                                            style={[styles.textBase, styles.desc]}
                                         >
                                             {this.props.desc || ''}
                                         </Text>;
                                    }
                                })()
                            }
                        </Animated.View>
                    </Animated.Image>
                </TouchableOpacity>
                {chooseCom}
            </View>
        )
    }

    onSelected(e){
        if (Platform.OS === 'ios' && this.props.canChoose){
            let scale = this.state.showChoose ? this.props.scale : 1-((1-this.props.scale)*width+width/3)/width;
            this.setState({showChoose: !this.state.showChoose});
            Animated.timing(this.state.moveAnim, {toValue: scale * width, duration: 200}).start();
        }
        if (this.props.onPress && (Platform.OS === 'android' || !this.props.canChoose)){
            this.props.onPress(this.props.blockId);
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios'){
            Animated.timing(this.state.moveAnim, {toValue: this.props.scale * width, duration: 0}).start();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    bgImage: {
        height: 100
    },
    colorBg: {
        backgroundColor: '#33333399',
        height:100,
        justifyContent: 'center'
    },
    textBase: {
        color: '#fff',
        letterSpacing: 1
    },
    title: {
        fontSize: 17,
        fontWeight: '900',
        textAlign: 'center'
    },
    desc: {
        textAlign: 'center',
        padding: 8,
    }
});

export default InfoWithImageBlock;