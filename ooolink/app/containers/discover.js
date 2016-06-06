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
import Home from './home';
import Sea from './sea';
import Hot from './hot';
import InfoWithImageBlock from '../common/components/infoWithImageBlock'
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
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.container}>
                {com}
                <View style={styles.operate}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={this.onOpenSea.bind(this)}
                    >
                    <View style={styles.o}>
                        <Image 
                            source={require('../images/discover-find.png')}
                            style={styles.oimage}
                        />
                        <Text style={styles.otext}>淘文</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={this.onOpenHot.bind(this)}
                    >
                    <View style={styles.o}>
                        <Image 
                            source={require('../images/discover-hot.png')}
                            style={styles.oimage}
                        />
                        <Text style={styles.otext}>热门</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
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
                <Text style={styles.recommendTitle}>推荐站点</Text>
                <InfoWithImageBlock
                    height={80}
                    blockId={'04be9c7c2e7f7eda6febba12aa579a8d'}
                    onPress={this.onOpenSite.bind(this)}
                    imageURL={'http://www.admin10000.com/UploadFiles/Document/201412/01/20141201195326478573.JPG'}
                >
                    <Text style={styles.siteItemText}>{'CNode'}</Text>
                    <Text style={[styles.siteItemText,{fontWeight:'100', fontSize:14}]}>{'最大的nodejs中文社区'}</Text>
                </InfoWithImageBlock>
                <InfoWithImageBlock
                    height={80}
                    blockId={'96030d6e62c8c9641968a9e1c6216cf8'}
                    onPress={this.onOpenSite.bind(this)}
                    imageURL={'http://tpl3.kuailiyu.com/templates/cyzonev3/images/logo_orange@2x.png'}
                >
                    <Text style={styles.siteItemText}>{'创业邦'}</Text>
                    <Text style={[styles.siteItemText,{fontWeight:'100', fontSize:14}]}>{'创投库，融资，起步，成长，技术，生活'}</Text>
                </InfoWithImageBlock>
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

    onOpenHot(){
        this.props.navigator.push({
            name: 'Hot',
            component: Hot
        });
    }

    onOpenSite(site_id){
        this.props.actions.getSiteInfo(site_id);
        this.props.navigator.push({
            name: 'Home',
            component: Home,
            props: {
                site_id
            }
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
    },
    recommendTitle:{
        color:'#fff',
        margin: 10,
        fontWeight: '900'
    },
    siteItemText:{
        marginLeft: 20,
        fontSize: 16,
        fontWeight: '900',
        color:'#fff'
    },
});

export default Discover;