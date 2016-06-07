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
    ListView,
    Text,
    Image,
    Dimensions,
    View,
    TextInput,
    TouchableOpacity,
    PropTypes
} from 'react-native';
import TopBar from '../common/components/topBar';
import MarkDownEditMod from '../common/components/markdownEditMod';
import OperateLoading from '../common/components/operateLoading';
import {TO_PUBLISH_TOPIC, TO_PUBLISH_COMMENT} from '../constants/passAgreement';
import * as publishService from '../services/publishService';

let {height, width} = Dimensions.get('window');

class Publish extends Component{
    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            isOperating: false,
            type: [],
            typeSelected: ''
        }
    }

    render(){
        let backText = '';
        if (this.props.type === TO_PUBLISH_TOPIC){
            backText = '发布主题'
        } else if (this.props.type === TO_PUBLISH_COMMENT) {
            backText = '跟帖';
        }

        let typeCom = this.state.type.map((t, idx)=>{
            let style = t.theme === this.state.typeSelected ? {color: '#65b278'} : {color:'#333'}
            return (
                <TouchableOpacity
                    key={idx}
                    onPress={()=>{this.setState({typeSelected: t.theme})}}
                >
                    <Text style={[{fontWeight:'900', width: width / this.state.type.length}, style]}>{t.name}</Text>
                </TouchableOpacity>
            )
        });

        let publishButton = 
        <TouchableOpacity 
        onPress={this.publish.bind(this)}
        style={styles.publishButton}>
            <Text style={{color: '#fff', fontWeight: '900'}}>发布</Text>
        </TouchableOpacity>

        return (
            <View style={{flex:1}}>
                <TopBar
                    backText = {backText}
                    onBack = {this.onBack.bind(this)}
                    child={publishButton}
                />
                <TextInput
                    style={styles.title}
                    underlineColorAndroid={'transparent'}
                    placeholder={'标题'}
                    placeholderTextColor={'#666'}
                    autoCorrect={false}
                    onChangeText={(text)=>{this.setState({title: text})}}
                    value={this.state.title}
                />
                <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                {typeCom}
                </View>
                <MarkDownEditMod
                    onChangeText={(text)=>{this.setState({content: text})}}
                    navigator={this.props.navigator}
                    titleHaved = {this.props.type === TO_PUBLISH_TOPIC}
                />
                <OperateLoading
                    visible={this.state.isOperating}
                />
            </View>
        )
    }

    onBack(){
        this.props.navigator.pop();
    }

    publish(){
        if (!this.state.title || !this.state.content || !this.state.typeSelected){
            return;
        }
        let token = this.props.state.user.userToken;
        let {title, content} = this.state;
        publishService.publishContent(token, title, content, this.state.typeSelected, this.props.site, '38900518-bb01-4924-822e-2cbfdc188aa5',(rs=>{

        }));
    }

    componentDidMount() {
        publishService.getPublishType(this.props.site, rs=>{
            this.setState({type: rs.data});
        });
    }
}

const styles = StyleSheet.create({
    title:{
        width,
        height: 50,
        padding: 10
    },
    publishButton:{
        width: 30,
        height: 30,
        position: 'absolute',
        left: width - 40,
        top: 16
    }
})

export default Publish;
















