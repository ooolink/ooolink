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
    TextInput,
    Dimensions,
    Navigator,
    PropTypes,
    TouchableOpacity,
    Picker,
    View,
    Alert
} from 'react-native';
import TopBar from '../common/components/topBar';
import OperateLoading from '../common/components/operateLoading';
import {UriDeal, WordLineDeal, timeDeal} from '../utils';
import {USER_DEFAULT_HEAD} from '../constants/config';
import * as userService from '../services/userService';
const {width, height} = Dimensions.get('window');

const sexs = ['未知', '女', '男']; 

class ProfileEdit extends Component{

    constructor(props){
        super(props);
        let userInfo = this.props.state.user.userInfo;
        if (!userInfo){
            userInfo = {
                user_image: USER_DEFAULT_HEAD,
                user_realname: '',
                user_work: '',
                user_education: '',
                user_living: '',
                user_sex: -1
            }
        }
        this.state = Object.assign({}, userInfo, {isOperating: false, isPick: false});
    }

    render(){
        let saveCom = <Text style={styles.savebutton} onPress={this.onSave.bind(this)}>保存</Text>;
        let sexSelectCom = this.state.isPick ? 
                        <View style={styles.wrap}>
                            <View style={{backgroundColor: '#fff', width: width - 120, alignSelf: 'center'}}>
                                <Picker
                                  selectedValue={this.state.user_sex}
                                  onValueChange={(user_sex) => this.setState({user_sex})}>
                                  <Picker.Item label="女" value={0} />
                                  <Picker.Item label="男" value={1} />
                                  <Picker.Item label="未知" value={-1} />
                                </Picker> 
                                <Text 
                                style={styles.typePickerButton}
                                onPress={()=>{this.setState({isPick: false})}}>确定</Text>
                            </View>
                        </View>
                        :
                        null;
        return (
            <View>
                <TopBar
                    backText={'编辑个人信息'}
                    onBack={()=>{this.props.navigator.pop()}}
                    child={saveCom}
                />
                <ScrollView style={styles.container}>
                    <View style={{backgroundColor: '#fff'}}>
                        <Image style={styles.headImage} source={{uri: UriDeal(this.state.user_image)}}/>
                        <View style={[styles.itemView]}>
                            <Text style={styles.itemText}>昵称</Text>
                            <TextInput 
                                autoFocus={true} style={styles.textInput}
                                value={this.state.user_realname} onChangeText={(user_realname)=>{
                                    this.setState({user_realname})
                                }}/>
                        </View>
                        <View style={[styles.itemView]}>
                            <Text style={styles.itemText}>性别</Text>
                            <Text 
                            onPress={()=>{this.setState({isPick: true})}}
                            style={{lineHeight: 30, paddingLeft: 5, width: 200}}>{sexs[this.state.user_sex+1]}</Text>
                        </View>                        

                        <View style={styles.line}></View>
                        
                        <View style={[styles.itemView]}>
                            <Text style={styles.itemText}>住址</Text>
                            <TextInput 
                                autoFocus={true} style={styles.textInput}
                                value={this.state.user_living} onChangeText={(user_living)=>{
                                    this.setState({user_living})
                                }}/>
                        </View>
                       <View style={[styles.itemView]}>
                            <Text style={styles.itemText}>工作情况</Text>
                            <TextInput 
                                autoFocus={true} style={styles.textInput}
                                value={this.state.user_work} onChangeText={(user_work)=>{
                                    this.setState({user_work})
                                }}/>
                        </View>
                       <View style={[styles.itemView]}>
                            <Text style={styles.itemText}>教育情况</Text>
                            <TextInput 
                                autoFocus={true} style={styles.textInput}
                                value={this.state.user_education} onChangeText={(user_education)=>{
                                    this.setState({user_education})
                                }}/>
                        </View>                                                                       
                    </View>
                </ScrollView>
                {sexSelectCom}
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        );
    }

    onSave(){
        let token = this.props.state.user.userToken;
        let infos = {
            user_education: this.state.user_education,
            user_sex: this.state.user_sex,
            user_image: this.state.user_image,
            user_living: this.state.user_living,
            user_realname: this.state.user_realname,
            user_work: this.state.user_work
        }

        this.setState({isOperating: true});
        userService.updateUserInfo(token, infos, rs=>{
            if (rs && rs.result === 1){
                Alert.alert('保存成功');
                this.props.navigator.pop();
                this.props.actions.updateUserInfo(infos);
            } else {
                Alert.alert('保存失败');
            }
            this.setState({isOperating: false});
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: height-50,
        width,
        backgroundColor:'#eee'
    },
    savebutton: {
        backgroundColor: '#00000000',
        color: '#fff',
        fontWeight: '900',
        width: 30,
        height: 30,
        position: 'absolute',
        left: width - 40,
        top: 17
    },
    headImage: {
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20    
    },
    line:{
        width,
        height: 20,
        backgroundColor: '#eee'
    },
    itemView:{
        flexDirection: 'row',
        width,
        height: 50,
        borderTopColor: '#eee',
        borderTopWidth: 1
    },
    itemText:{
        color: '#666',
        lineHeight: 20,
        padding: 10,
        width: 100
    },
    textInput: {
        flex: 1,
        color: '#333',
        padding: 5,
        fontSize: 13,
        fontWeight: '900'
    },
    wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: '#999999cc',
        justifyContent: 'center'
    },
    typePickerButton:{
        width: 200,
        height: 30,
        textAlign: 'center',
        color: '#fff',
        lineHeight: 20,
        fontWeight: '900',
        backgroundColor: '#65b278'
    }
});

export default ProfileEdit;
