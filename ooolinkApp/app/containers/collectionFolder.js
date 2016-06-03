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
    PropTypes,
    TextInput,
    Alert
} from 'react-native';
import LoadingBlock from '../common/components/loadingBlock';
import TopBar from '../common/components/topBar';
import OperateLoading from '../common/components/operateLoading';
import TopicsList from '../components/topicslistWithoutBg'
import TopicDetail from './topicDetail';
import Login from './loginContainer';
import * as collectService from '../services/collectService';
import {setGlobal, getGlobal} from '../store';
let {height, width} = Dimensions.get('window');


//important! this.props.type 为 typeid, this.props.typeName 为 type 的名字
class CollectionFolder extends Component{
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            showMore: false,
            showUpdateBlock: false,
            isOperating: false,
            updateValue: this.props.typeName,
            typeName: this.props.typeName
        }
    }

    render(){

        let cfCom = null,
            typeId = this.props.type,
            typeName = this.props.typeName,
            userCollectionsDetail = this.props.state.collect.userCollectionsDetail;

        if (userCollectionsDetail[typeId]){
            cfCom = <TopicsList
                data={userCollectionsDetail[typeId].collections}
                onSelectTopic={this.onSelectTopic.bind(this)}
            />
        }
        
        let moreCom = <TouchableOpacity onPress={this.onMore.bind(this)} style={styles.more}> 
                        <Image source={require('../images/topbar-more.png')} style={{width: 20, height: 20}}/>
                    </TouchableOpacity>
        let moreOperateCom = this.state.showMore ? 
        <View style={styles.moreOperate}>
            <Text onPress={this.onDeleteFolder.bind(this)} style={styles.moreOperateText}>删除收藏夹</Text>
            <Text onPress={()=>{this.setState({showMore: false, showUpdateBlock: true})}} style={styles.moreOperateText}>编辑收藏夹</Text>
        </View> :
        null;
        
        let updateOperateCom = this.state.showUpdateBlock ? 
        <View 
            onStartShouldSetResponder={()=>{this.setState({showUpdateBlock: false})}}
            style={styles.wrap}>
            <View style={styles.updateBlock}>
                <Text style={styles.updateTitle}>更新收藏夹</Text>
                <View style={styles.updateTextInputWrap}>
                    <TextInput 
                        underlineColorAndroid={'transparent'}
                        autoFocus={true}
                        style={styles.updateTextInput}
                        value={this.state.updateValue} 
                        onChangeText={(text) => this.setState({updateValue: text})}/>
                </View>
                <Text 
                    style={styles.updateButton}
                    onPress={this.onUpdateFolder.bind(this)}
                    >更新</Text>
            </View>
        </View>:
        null;

        return (
            <View style={{flex:1}}>
            <View style={{flex: 1}}>
                <View 
                accessible={true}
                pointerEvents={'auto'}
                onStartShouldSetResponder={()=>{this.setState({showMore: false})}}
                style={{flex: 1}}>
                    <TopBar
                        backText={`收藏夹-${this.state.typeName}`}
                        onBack={()=>{this.props.navigator.pop()}}
                        child={moreCom}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.typeText}>{this.state.typeName}</Text>
                        <Text style={styles.countText}>{`共 ${this.props.count} 篇收藏`}</Text>
                    </View>
                    {cfCom}
                </View>
                {moreOperateCom}
                {updateOperateCom}
            </View>
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        );
    }

    onSelectTopic(item){
        if (this.state.showMore){
            this.setState({showMore: false});
            return;
        }
        this.props.navigator.push({
            name: 'TopicDetail',
            index: 1,
            component: TopicDetail,
            props: {
                topicId: item.content_id
            }
        });  
    }

    onMore(){
        this.setState({showMore: !this.state.showMore});
    }

    onDeleteFolder(){
        this.setState({showMore: false});
        let token = this.props.state.user.userToken,
            typeId = this.props.type;

        Alert.alert('Tip', `您是否要删除收藏夹 ${this.props.typeName}`, [
        {text: '取消'},
        {text: '删除', onPress: ()=>{
            this.setState({isOperating: true});
                collectService.deleteUserCollectionType(token, typeId, rs=>{
                    if (rs && rs.result === 1){
                        this.props.actions.deleteUserCollectionTypeById(typeId);
                        Alert.alert('删除成功');
                        this.props.navigator.pop();
                    } else {
                        Alert.alert('删除失败');
                    }
                    this.setState({isOperating: false});
                });
        }}
        ]);
    }

    onUpdateFolder(){
        let updateValue = this.state.updateValue,
            typeId = this.props.type,
            typeName = this.state.typeName;

        this.setState({showUpdateBlock: false, isOperating: true});
        let token = this.props.state.user.userToken;
            collectService.updateUserCollectionType(token, updateValue, typeName, rs=>{
                if (rs && rs.result === 1){
                    Alert.alert('更新成功');
                    this.props.actions.updateUserCollectionTypeName(typeId, updateValue);
                    this.setState({isOperating: false, typeName: updateValue});
                } else {
                    Alert.alert('更新失败');
                    this.setState({updateValue: this.props.typeName, isOperating: false})
                }
            });
    }

    componentDidMount() {
        let token = this.props.state.user.userToken,
            typeId = this.props.type,
            count = this.props.count;

        this.setState({isOperating: true});
        collectService.getCollectionsDetail(token, typeId, rs=>{
            if (rs && rs.result === 1){
                this.props.actions.updateUserCollectionDetail(typeId, count, rs.data);
            } else if (rs && rs.result === 401) {
                this.goToLogin();
            } 
            this.setState({isOperating: false});
        });
    }

    goToLogin(){
        this.props.navigator.push({
            name: 'login',
            component: Login
        });
    }
}

const styles=StyleSheet.create({
    titleContainer:{
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    typeText: {
        fontSize: 16,
        fontWeight: '900'
    },
    countText: {
        fontSize: 14,
        color: '#aaa'
    },
    more:{
        width: 30,
        height: 30,
        position: 'absolute',
        left: width - 30,
        top: 15
    },
    moreOperate:{
        position: 'absolute',
        top: 10,
        width: 150,
        height: 60,
        backgroundColor: '#eee',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        overflow:'visible',
        left: width - 160,
        borderRadius: 3
    },
    moreOperateText:{
        padding: 10,
        textAlign: 'center'
    },
    wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: '#999999cc',
        alignItems: 'center',
        justifyContent:'center'
    },
    updateBlock: {
        width: 200,
        padding: 10,
        height: 130,
        backgroundColor:'#fff',
        alignSelf: 'center'
    },
    updateTextInputWrap:{
        borderBottomColor:'#65b278', 
        borderBottomWidth: 1, 
        width: 180, 
        height: 30,
        marginBottom: 12
    },
    updateTextInput:{
        width: 180,
        height: 30,
        padding: 5,
        color: '#333',
        alignSelf: 'center'
    },
    updateTitle:{
        height: 30,
        lineHeight: 20,
        textAlign: 'center',
        fontWeight: '900'
    },
    updateButton:{
        textAlign: 'center',
        lineHeight: 20,
        height: 30,
        width: 180,
        alignSelf: 'center',
        color: '#fff',
        backgroundColor: '#65b278'
    }
});

export default CollectionFolder;





