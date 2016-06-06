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
    View
} from 'react-native';
import TopicsList from '../components/topicslistWithoutBg'
import TopBar from '../common/components/topBar'
import TopicDetail from './topicDetail'
import LoadingBlock from '../common/components/loadingBlock'
import * as contentService from '../services/contentService'

class Sea extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            page: 0
        }
    }

    render(){
        let com = !this.state.data ? <LoadingBlock/> :
         <TopicsList 
            onSelectTopic={this.onSelectTopic.bind(this)}
            onShouldRefresh={()=>{}}
            onShouldChangePage={()=>{}}
            data={this.state.data}/>;
        return (
            <View 
                style={{flex: 1}}
            >
                <TopBar
                    onBack={()=>{this.props.navigator.pop()}}
                    backText={'热门'}
                />
                {com}
            </View>
        );
    }

    onSelectTopic(item){
        this.props.navigator.push({
            name: 'TopicDetail',
            index: 1,
            component: TopicDetail,
            props: {
                topicId: item.content_id
            }
        });    
    }

    onRefreshList(){
        this.doGet(0);
    }

    onChangPage(){
        let page = this.state.page + 1;
        this.doGet(page, (rs)=>{
            this.setState({data: [...this.state.data, ...rs.data], page});
        });
    }

    componentDidMount() {
        setTimeout(()=>{this.doGet(0)}, 500);
    }

    doGet(page, cb){
        contentService.getHotContents(page, (rs)=>{
            if (rs && rs.result === 1){
                cb ? cb(rs) : this.setState({data: rs.data, page});
            } else {
                //TODO 网络错误处理
            }
        });
    }
}

export default Sea;






