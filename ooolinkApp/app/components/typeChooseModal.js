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
    TextInput,
    View,
    Picker,
    TouchableOpacity,
    PropTypes,
    Alert
} from 'react-native';
import OperateLoading from '../common/components/operateLoading'
import {updateUserCollectionType} from '../actions/user';
import * as collectService from '../services/collectService';
let {height, width} = Dimensions.get('window');

function getId(arr, name){
    for (let i = 0, len = arr.length; i < len; i++){
        if (arr[i].name === name){
            return arr[i].id;
        }
    }
}

class TypeChooseModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemChoose: 'default',
            isCreating: false,
            createValue: '',
            isOperating: false,
            userCollectionTypes: this.props.userCollectionTypes
        }
    }

    render(){
        let createCom = this.state.isCreating ? 
        <View style={{flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1}}>
            <TextInput 
            placeholder={'输入收藏夹名字'}
            style={{fontSize: 12, width: 150, height: 30, padding: 5}}
            onChangeText={(text) => this.setState({createValue: text})}
            value={this.state.createValue}/>
            <Text 
            onPress={this.create.bind(this)}
            style={{width: 50, height: 30, backgroundColor: '#65b278', color: '#fff', textAlign: 'center', lineHeight: 20}}>确定</Text>
        </View>
         : null;
        let pickerItems = [];
        this.state.userCollectionTypes.forEach((item, idx)=>{
            pickerItems.push(
                <Picker.Item key={idx+1} style={styles.typePikerItem} label={`${item.name}`} value={`${item.name}`} />
            );
        });
        return (
            <View style={styles.wrap}>
                <View
                    style={styles.typePicker}
                >
                    <View>
                        <Text style={styles.typePickerTitle}>
                            选择收藏夹
                        </Text>
                        <TouchableOpacity
                                style={{position: 'absolute', top: 10, left: 10}}
                                onPress={this.props.onClose.bind(this)}
                            >
                            <Image style={{width: 10, height: 10}} source={require('../images/login-close.png')}/>
                        </TouchableOpacity> 
                        <Text 
                        onPress={this.onCreateCollectionFolder.bind(this)}
                        style={{position: 'absolute', top: 6, left: 165, backgroundColor:'#00000000', color:'#fff', fontWeight: '900'}}>
                        {this.state.isCreating ? '取消' : '新建'}
                        </Text>                       
                    </View>
                    {createCom}
                    <Picker
                        style={{height: 200}}
                        selectedValue={this.state.itemChoose}
                        onValueChange={itemChoose=>this.setState({itemChoose})}
                    >
                    {pickerItems}
                    </Picker>
                    <Text 
                        onPress={this.props.onCollect.bind(this, getId(this.state.userCollectionTypes, this.state.itemChoose))}
                        style={styles.typePickerButton}>收藏</Text>
                </View>
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        )
    }

    onCreateCollectionFolder(){
        this.setState({isCreating: !this.state.isCreating});
    }

    create(){
        if (!this.state.createValue){
            return;
        }
        this.setState({isOperating: true});
        let token = this.props.state.user.userToken;
            collectService.createUserCollectionType(token, this.state.createValue, rs=>{
                if (rs && rs.result === 1){
                    let uct = this.state.userCollectionTypes;
                    uct.unshift({name: this.state.createValue, id: rs.data});
                    updateUserCollectionType(uct, true);    //更新 redux
                    this.setState({isOperating: false, createValue: '', userCollectionTypes: uct, isCreating: false});
                } else if (rs && rs.result === 0) {
                    Alert.alert('新建失败');
                    this.setState({isOperating: false});
                }
            });
    }
}


const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: '#999999cc'
    },
    typePicker:{
        top: height/2 - 130,
        width: 200,
        height: 260,
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    typePikerItem:{
        fontWeight: '900'
    },
    typePickerTitle:{
        backgroundColor:'rgb(41,44,52)',
        width: 200,
        height: 30,
        textAlign: 'center',
        color: '#fff',
        lineHeight: 20
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

export default TypeChooseModal;