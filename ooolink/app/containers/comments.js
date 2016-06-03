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
    TextInput,
    StyleSheet,
    Dimensions,
    Navigator,
    ListView,
    TouchableOpacity,
    View,
    Platform,
    BackAndroid,
    Alert   
} from 'react-native';
import TopBar from '../common/components/topBar';
import LoadingBlock from '../common/components/loadingBlock';
import OperateLoading from '../common/components/operateLoading';
import CommentBlock from '../components/commentBlock';
import {USER_DEFAULT_HEAD} from '../constants/config';
import Login from './loginContainer';
import {UriDeal, WordLineDeal, timeDeal, numberDeal, androidBack} from '../utils';
import * as commentService from '../services/commentService';
let {height, width} = Dimensions.get('window');

class Comments extends Component{

    constructor(props){
        super(props);
        
        let state = this.props.state,
            contentid = this.props.contentid,
            comments = state.comment.comments[contentid];
        
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            commentValue:'',
            isOperating: false        }
    }

    render(){
        let state = this.props.state;
        let contentid = this.props.contentid,
            commentCount = state.comment.commentCount[contentid] || 0,
            userIsLogon = state.user.userIsLogon,
            comments = state.comment.comments[contentid];

        let sendImage = this.state.commentValue ? 
            require('../images/comment-send.png') :
            require('../images/comment-send-none.png');

        let commentCom = null;
        if (userIsLogon){
            let userHead = state.user.userInfo ? UriDeal(state.user.userInfo.user_image) : USER_DEFAULT_HEAD;
            commentCom =  
                <View style={styles.commentBlock}>
                    <Image style={styles.userHead} source={{uri: userHead}}/>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        autoCorrect={false}
                        style={styles.commentInput}
                        value={this.state.commentValue}
                        onChangeText={commentValue=>{this.setState({commentValue})}}
                        placeholder={'添加评论...'}
                        placeholderTextColor={'#bbb'}
                    />
                    <TouchableOpacity
                        onPress={this.onSendComment.bind(this)}
                        style={styles.sendIcon}
                    >
                      <Image style={[styles.icon]} source={sendImage}/>
                    </TouchableOpacity>
                </View>       
        }

        let commentList = null;
        if (Array.isArray(comments)){
            if (comments.length){
                commentList = 
                <ListView
                    pageSize={5}
                    dataSource={this.dataSource.cloneWithRows(comments)}
                    renderRow={
                        (rowData, sectionID, rowID)=> {
                            return <CommentBlock data={rowData}/>
                        }
                    }                    
                />
            } else {
                commentList = <Text style={styles.noComments}>{'还没有评论~'}</Text>
            }
        } else {
            commentList = <LoadingBlock/>
        }

        return (
            <View style={{flex:1, backgroundColor: '#fff'}}>
                <TopBar
                    backText={`评论 ${commentCount} 条`}
                    onBack={()=>{this.props.navigator.pop()}}
                />
                {commentCom}
                {commentList}
                <OperateLoading visible={this.state.isOperating}/>
            </View>
        );
    }

    componentDidMount() {
        let contentid = this.props.contentid,
            page = 0,
            limit = 10;

        setTimeout(()=>{
            commentService.getComments(contentid, page, limit, rs=>{
                let rows = rs.data.rows;
                this.props.actions.setComments(contentid, page, rows, rs.data.count);
            });
        }, 500);
    }

    onSendComment(){
        let token = this.props.state.user.userToken,
            content = this.state.commentValue,
            contentid = this.props.contentid;

        if (!content){
            return;
        }

        this.setState({isOperating: true});
        commentService.publishComment(token, content, contentid, -1, (rs)=>{
            if (rs && rs.result === 1){
                let time = new Date().getTime(),
                    comment = {
                        id: rs.data,
                        reply_id: -1,
                        content,
                        content_id: contentid,
                        created: time,
                        deleted: false,
                        updated: time,
                        userInfo: this.props.state.user.userInfo,
                        user_id: this.props.state.user.userInfo.user_id
                    }
                this.props.actions.postComment(contentid, comment);
            } else if (rs && rs.result === 401) {
                goToLogin();
            } else {
                Alert.alert('评论失败');
            }
            this.setState({isOperating: false, commentValue: ''});
        });
    }

    goToLogin(){
        this.props.navigator.push({
            name: 'Login',
            component: Login
        });  
    }
}

const styles = StyleSheet.create({
    commentBlock:{
        flexDirection: 'row',
        padding: 10,
        width,
        height: 70,
        backgroundColor: '#eee',
        alignItems: 'center'
    },
    userHead: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10
    },
    commentInput:{
        flex: 1,
        alignSelf: 'center',
        height: 30,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 5,
        borderRadius: 3,
        fontSize: 14
    },
    sendIcon:{
        position: 'absolute',
        left: width - 35,
        top: 25
    },
    icon:{
        height: 20,
        width: 20
    },
    noComments:{
        width,
        textAlign: 'center',
        color: '#666',
        marginTop: 40
    }
});

export default Comments;










