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
    Text,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';
import Root from './root'
import Login from './loginContainer'
import TopicDetail from './topicDetail'
import Button from '../common/components/base/button'
import * as contentService from '../services/contentService'
const {width, height} = Dimensions.get('window');

class Welcome extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let welcomeContent = this.props.state.content.welcomeContent;
        let userText = this.props.state.user.userIsLogon ? '我的' : '登陆 / 注册';
            return (
                <View>
                    <Image 
                        style={styles.bg}
                        source={{uri: welcomeContent.image}}>
                    </Image>
                    <View style={styles.cover}/>
                    <Text style={styles.logoText}>ooolink</Text>
                    <View style={styles.content}>  
                        <Button style={styles.inButton} onPress={this.onRead.bind(this)}>Read</Button>
                        <View style={styles.tips}>
                            <Text style={styles.tip}>{welcomeContent.time}</Text>
                            <Text style={styles.tip}>{welcomeContent.readtime}</Text>
                        </View>
                        <Text style={styles.title}>{welcomeContent.title}</Text>
                        <View style={styles.inLinks}>
                            <TouchableOpacity
                                onPress={this.onUserClick.bind(this)}
                                style={styles.inLink}><Text style={styles.inLinkText}>{userText}</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onDiscoverClick.bind(this)} 
                                style={styles.inLink}><Text style={styles.inLinkText}>{'发现更多  >>'}</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
    }

    onRead(){
        let welcomeContent = this.props.state.content.welcomeContent;
        contentService.getWelcomeContent();
        this.props.navigator.push({
            name: 'TopicDetail',
            component: TopicDetail,
            props: {
                topicId: welcomeContent.id
            }
        });    
    }

    onUserClick(){
        if (this.props.state.user.userIsLogon){
            this.props.navigator.replace({
                name: 'Root',
                component: Root,
                props:{
                    type: 'my'
                }
            });            
        } else {
            this.props.navigator.push({
                name: 'Login',
                component: Login
            });          
        }
    }

    onDiscoverClick(){
        contentService.getWelcomeContent();
        this.props.navigator.replace({
            name: 'Root',
            component: Root,
            props:{
                type: 'discover'
            }
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
        padding: 5,
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
        borderTopColor: '#ddd',
        marginTop: 20,
        flexDirection: 'row',

    },
    inLink:{
        paddingTop: 20,
        paddingBottom: 10,
        width: 100,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inLinkText:{
        textAlign: 'center',
        color: '#eee',
        fontWeight:'900',
        backgroundColor: null
    }
});

export default Welcome;