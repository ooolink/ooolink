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
    View
} from 'react-native';
import Profile from './profile'
import TopicDetail from './topicDetail'
import Discover from './discover'
import LoadingBlock from '../common/components/loadingBlock'
import * as contentService from '../services/contentService'
import {getGlobal} from '../store'
const {width, height} = Dimensions.get('window');

class Welcome extends Component{

    constructor(props){
        super(props);
        this.state={
            welcomeContent: null,
            isLogin: null,
            isSync: false
        }
    }

    render(){
        let welcomeContent = this.state.welcomeContent;
        let userText = this.state.isLogin ? '我的' : '登陆 / 注册';
        if (!this.state.isSync){
            return <LoadingBlock/>;
        } else {
            return (
                <View>
                    <Image 
                        style={styles.bg}
                        source={{uri: welcomeContent.image}}>
                    </Image>
                    <View style={styles.cover}/>
                    <Text style={styles.logoText}>ooolink</Text>
                    <View style={styles.content}>  
                        <Text style={styles.inButton} onPress={this.onRead.bind(this)}>Read</Text>
                        <View style={styles.tips}>
                            <Text style={styles.tip}>{welcomeContent.time}</Text>
                            <Text style={styles.tip}>{welcomeContent.readtime}</Text>
                        </View>
                        <Text style={styles.title}>{welcomeContent.title}</Text>
                        <View style={styles.inLinks}>
                            <Text 
                                onPress={this.onUserClick.bind(this)}
                                style={styles.inLink}>{userText}</Text>
                            <Text
                                onPress={this.onDiscoverClick.bind(this)} 
                                style={styles.inLink}>{'发现更多  >>'}</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    componentDidMount() {
        getGlobal('welcomeContent', (ret)=>{
            if (ret){
                this.setState({welcomeContent: ret});
                getGlobal('isLogin', (ret)=>{
                    this.setState({isLogin: ret, isSync: true});
                }); 
            } else {
                contentService.getWelcomeContent((ret)=>{
                    this.setState({welcomeContent: ret});
                    getGlobal('isLogin', (ret)=>{
                        this.setState({isLogin: ret, isSync: true});
                    });        
                });
            }
        });  
    }

    onRead(){
        let topicId = this.state.welcomeContent.id;
        this.props.actions.getTopic(topicId);
        setTimeout(()=> {
            this.props.navigator.push({
                name: 'TopicDetail',
                index: 1,
                component: TopicDetail,
                props: {
                    topicId
                }
            });    
        }, 200);
    }

    onUserClick(){
        this.props.navigator.push({
            name: 'Profile',
            props:{
                from: 'welcome'
            },  
            component: Profile
        });
    }

    onDiscoverClick(){
        this.props.navigator.push({
            name: 'Discover',
            component: Discover
        })
    }
}

const styles = StyleSheet.create({
    logoText:{
        width,
        textAlign: 'center',
        color:'#fff',
        backgroundColor: '#00000000',
        fontWeight: "900",
        fontSize: 23,
        marginTop: 20,
        letterSpacing: 1
    },
    bg:{
        position: 'absolute',
        top:0,
        width,
        height
    },
    cover:{
        position:'absolute',
        top:0,
        width,
        height,
        backgroundColor: '#33333366'
    },
    inButton:{
        fontWeight: "900",
        color: '#fff',
        padding: 5,
        textAlign: 'center',
        width: 80,
        height: 30,
        backgroundColor: '#65b278'
    },
    tips:{
        marginTop: 20,
        flexDirection: 'row'
    },
    tip:{
        fontSize: 11,
        color: '#fff',
        backgroundColor: '#00000000',
        marginRight: 10
    },
    title:{
        letterSpacing: 1.5,
        marginTop: 10,
        fontSize: 20,
        fontWeight: "900",
        color: '#fff',
        backgroundColor: '#00000000',
        lineHeight: 30
    },
    content:{
        padding: 40,
        position: 'absolute',
        top: 0,
        width,
        height,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    inLinks:{
        justifyContent:'space-between',
        borderTopWidth: 1,
        borderTopColor: '#777',
        marginTop: 20,
        flexDirection: 'row',

    },
    inLink:{
        paddingTop: 20,
        paddingBottom: 10,
        height: 50,
        textAlignVertical: 'center',
        textAlign: 'left',
        color: '#ccc',
        backgroundColor: '#00000000',
    }
});

export default Welcome;