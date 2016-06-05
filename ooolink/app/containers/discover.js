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
    Platform,
    View
} from 'react-native';
import Swiper from 'react-native-swiper';
import Classification from './classification';
import TopicDetail from './topicDetail';
import Sea from './sea';
import * as contentService from '../services/contentService';
import {UriDeal, WordLineDeal, timeDeal, numberDeal} from '../utils';

let {height, width} = Dimensions.get('window');

class DiscoverSwiperBlock extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let s = {height: 200},
            ts = {};
        if (Platform.OS === 'android'){
            s = {height: 80};
            ts = {top: 26, lineHeight: 26};
        }
        return (
            <TouchableOpacity
                onPress={this.props.onPress.bind(this, this.props.blockId)}
            >
            <View>
                <Image 
                    style={[blockStyles.image, s]}
                    source={{uri: UriDeal(this.props.uri)}}/>
                <View style={[blockStyles.cover, s]}></View>
                <Text
                    style={[blockStyles.text, ts]}
                    >{this.props.text}</Text>
            </View>
            </TouchableOpacity>
        );
    }
}

const blockStyles = StyleSheet.create({
    image:{
        width
    },
    cover:{
        position:'absolute',
        top:0,
        width,
        backgroundColor: '#33333366'
    },
    text:{
        position: 'absolute',
        top:60,
        backgroundColor: '#00000000',
        letterSpacing:1,
        lineHeight: 30,
        left: 20,
        width: width/1.5,
        color:'#fff',
        fontWeight: '900',
        fontSize: 16
    }
});


class Discover extends Component{

    constructor(props){
        super(props);
        this.state = {
            titleRecommend: []
        }
    }

    render(){
        let coms = null;
        coms = this.state.titleRecommend.map((item, idx)=>{
            return (
                <DiscoverSwiperBlock
                    blockId={item.mixed_id}
                    onPress={(topicId)=>{
                        this.props.navigator.push({
                            name: 'TopicDetail',
                            component: TopicDetail,
                            props: {
                                topicId
                            }
                        })
                    }}
                    key={idx}
                    uri={item.content.image}
                    text={item.recommend_title}
                />
            );
        });

        let com = null;
        if (Platform.OS === 'ios'){
            com = 
                <Swiper
                    activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                    style={styles.swiper}
                    height={200}
                    autoplay={true}           
                    >
                    {coms}
                </Swiper>
        } else {
            com = coms;
        }

        return (
            <ScrollView style={styles.container}>
                {com}
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

    componentDidMount() {
        contentService.getArtificialRecommend((rs)=>{
            this.setState({titleRecommend: rs.data});
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