/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
import React,{
    Component,
    Image,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Navigator,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import IndexTopBar from '../components/indexTopBar'
import Discover from './discover'
import Profile from './profile'

const {width, height} = Dimensions.get('window');

class ScrollableTabViewBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.stvbar}>
                <TouchableOpacity
                    onPress={this.chooseContainer.bind(this, 0)}
                >
                <View style={styles.stvbarView}>
                    <Image style={styles.stvbarImage} source={require('../images/root-bar-discover.png')}/>
                    <Text style={styles.stvbarText}>{this.props.tabs[0]}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.chooseContainer.bind(this, 1)}
                >
                <View style={styles.stvbarView}>
                    <Image style={styles.stvbarImage} source={require('../images/root-bar-message.png')}/>
                    <Text style={styles.stvbarText}>{this.props.tabs[1]}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.chooseContainer.bind(this, 2)}
                >
                <View style={styles.stvbarView}>
                    <Image style={styles.stvbarImage} source={require('../images/root-bar-my.png')}/>
                    <Text style={styles.stvbarText}>{this.props.tabs[2]}</Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    }

    chooseContainer(index){
        this.props.goToPage(index);
    }
}

class Root extends Component{

    constructor(props){
        super(props);
        let type = this.props.type;
        let index = ['discover', 'message', 'my'].indexOf(type);
        this.state = {
            idx: index
        }
    }

    render(){
        let type = this.props.type;
        let index = ['discover', 'message', 'my'].indexOf(type);
        return (
            <View style={{flex:1}}>
                <IndexTopBar
                    navigator={this.props.navigator}
                    state={this.props.state}
                    idx={this.state.idx}
                />
                <ScrollableTabView
                    style={{flex: 1}}
                    onChangeTab={(idx)=>{this.setState({idx: idx.i})}}
                    initialPage={index}
                    scrollWithoutAnimation={true}
                    tabBarPosition = 'bottom'
                    renderTabBar={()=><ScrollableTabViewBar selected={index}/>}
                >
                    <View tabLabel="发现" style={styles.scrollView}>
                        <Discover
                            navigator={this.props.navigator}
                            state={this.props.state}
                            actions={this.props.actions}
                        />
                    </View>
                    <View tabLabel="消息" style={styles.scrollView}>
                    </View>
                    <View tabLabel="我的" style={styles.scrollView}>
                        <Profile
                            navigator={this.props.navigator}
                            state={this.props.state}
                            actions={this.props.actions}
                        />
                    </View>
                </ScrollableTabView>    
            </View>
        );   
    }
}

const styles=StyleSheet.create({
    stvbar:{
        flexDirection: 'row',
        width,
        height: 50,
        backgroundColor: '#65b278'
    },
    stvbarImage:{
        width: 30,
        height: 30
    },
    stvbarView:{
        alignItems: 'center',
        justifyContent: 'center',
        width: width/3,
        height: 50,
        flexDirection: 'column'
    },
    stvbarText:{
        fontSize: 11,
        textAlign: 'center',
        color: '#fff'
    },
    scrollView:{
        flex: 1,
        width,
        height: height - 100,
        backgroundColor: 'rgb(41,44,52)'
    }
});

export default Root;