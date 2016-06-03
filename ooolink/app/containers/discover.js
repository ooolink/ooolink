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
    TouchableOpacity,
    View
} from 'react-native';
import Classification from './classification';
import Sea from './sea';
const Swiper = require('react-native-swiper');

let {height, width} = Dimensions.get('window');

class DiscoverSwiperBlock extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{width, height: 200}}>
                <Image 
                    style={blockStyles.image}
                    source={{uri: this.props.uri}}/>
                <View style={blockStyles.cover}/>
                <Text
                    style={blockStyles.text}
                    >{this.props.text}</Text>
            </View>
        );
    }
}

const blockStyles = StyleSheet.create({
    image:{
        width,
        height:200
    },
    cover:{
        position:'absolute',
        top:0,
        width,
        height,
        backgroundColor: '#33333366'
    },
    text:{
        position: 'absolute',
        top:60,
        letterSpacing:1,
        lineHeight: 30,
        left: 20,
        width: width/2,
        color:'#fff',
        fontWeight: '900',
        fontSize: 16
    }
});


class Discover extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let texts = ['啊！！！我在家门口看海有意思','爬山有意', '你好，我的世界你的爱！！！', '校园的爱情风雨1996-12-30', '呵呵哒~么什么大不了的世界晚安拜拜']
        let uris = [
            'https://s-media-cache-ak0.pinimg.com/474x/ab/cf/68/abcf682f7ebbf2ca831312bfa5c1b5d9.jpg',
            'https://s-media-cache-ak0.pinimg.com/474x/ee/e6/f9/eee6f90abe0231417aa7c9863b498702.jpg',
            'https://s-media-cache-ak0.pinimg.com/474x/37/a7/6e/37a76e6f1eb1a567f1b95ec41b9ad28b.jpg',
            'https://s-media-cache-ak0.pinimg.com/474x/90/1d/73/901d735a4456003c672a845d19965046.jpg',
            'https://s-media-cache-ak0.pinimg.com/474x/d0/17/5b/d0175b4a58f1cfa367ac885cadce4e40.jpg'
        ];

        let p = [];
        if (this.discoverSwiperBlock) {
            p = this.discoverSwiperBlock;
        } else {
            for (var i = 0; i < 5; i++){
                p.push(
                    <DiscoverSwiperBlock
                        key={i}
                        uri={uris[i]}
                        text={texts[i]}
                    />
                )
            }
        }
        if (!this.discoverSwiperBlock){
            this.discoverSwiperBlock = p;
        }

        return (
            <ScrollView style={styles.container}>
                <Swiper
                    activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                    style={styles.swiper}
                    height={200}
                    autoplay={false}                //TODO
                    >
                    {p}
                </Swiper>
                <View style={styles.operate}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.onOpenSea.bind(this)}
                    >
                    <View style={styles.o}>
                        <Image 
                            source={require('../images/discover-find.png')}
                            style={styles.oimage}
                        />
                        <Text style={styles.otext}>海淘</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={styles.o}>
                        <Image 
                            source={require('../images/discover-hot.png')}
                            style={styles.oimage}
                        />
                        <Text style={styles.otext}>热门</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.onOpenClass.bind(this)}
                    >
                    <View style={styles.o}>
                        <Image 
                            source={require('../images/discover-class.png')}
                            style={styles.oimage}
                        />
                        <Text style={styles.otext}>分类</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    onOpenClass(){
        this.props.navigator.push({
            name: 'classification',
            component: Classification
        });
    }

    onOpenSea(){
        this.props.navigator.push({
            name: 'sea',
            component: Sea
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'rgb(41,44,52)',
        flex: 1
    },
    swiper:{
        flex: 1,
        width,
        height: 200
    },
    operate:{
        paddingTop: 16,
        flexDirection:'row',
        justifyContent: 'space-around',
        height: 110,
        borderBottomColor: 'rgb(33,35,41)',
        borderBottomWidth: 10
    },
    o:{
        flexDirection: 'column'
    },
    oimage:{
        width: 40,
        height: 40
    },
    otext:{
        marginTop: 16,
        width: 40,
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600'
    }
});

export default Discover;