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
import InfoWithImageBlock from '../common/components/infoWithImageBlock'
import TopBar from '../common/components/topBar'
import ClassificationDetail from './classificationdetail'

let {height, width} = Dimensions.get('window');

const listText = ['科技', '体育', '影视', '摄影', '趣味', '人文', '教育', '生活', '财经', '音乐', '游戏', '新闻'];
const listFlag = ['technology', 'sport', 'movie', 'photo', 'fun', 'literature', 'education', 'living', 'finance', 'music', 'game', 'news'];
const listImage = [
    'https://s-media-cache-ak0.pinimg.com/474x/7d/84/3c/7d843c6b041995e068ef9eb9b2def590.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/a8/92/35/a8923557e6d31fadba18fea08dcadfdb.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/d5/53/f0/d553f0cb5acb2b685cb0817a7b7adf2d.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/22/8e/53/228e53ded4d0dab253bf283a4515c564.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/52/64/52/526452e0010701d26f0fe6f174812f95.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/08/4c/13/084c132e3eb5ef7e052cb55ce8fe1349.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/c6/38/8d/c6388d88991367699914d8ae0a443c1f.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/79/2e/03/792e03f01869864d0f5888f5b60a9865.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/f5/d4/42/f5d4421993959d401a85ee354f2ea4d4.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/17/1f/01/171f0180729d5b3884842b9be515d914.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/e5/a3/1f/e5a31f9b2fd327ebded7c715fb4a1901.jpg',
    'https://s-media-cache-ak0.pinimg.com/564x/11/ec/27/11ec2782191f5f22687119ab0307dfab.jpg',
    'https://s-media-cache-ak0.pinimg.com/474x/11/ec/27/11ec2782191f5f22687119ab0307dfab.jpg'
];
class Classification extends Component{

    constructor(props){
        super(props);
        this.state = {list:[]};
        for (let i = 0, len = listText.length; i < len; i++){
            this.state.list.push({
                text: listText[i],
                image: listImage[i],
                flag: listFlag[i]
            });
        }
    }

    render(){
        let ca = [], list = this.state.list;
        list.forEach((item, idx)=>{
            if (idx % 2 == 1){
                return;
            }
            ca.push(
                <View style={styles.group} key={idx}>
                    <InfoWithImageBlock
                        scale={1/2}
                        blockId={idx}
                        name={list[idx].text}
                        imageURL={list[idx].image}
                        onPress={this.onPressBlock.bind(this)}
                    />
                    <InfoWithImageBlock
                        scale={1/2}
                        blockId={idx+1}
                        name={list[idx+1].text}
                        imageURL={list[idx+1].image}
                        onPress={this.onPressBlock.bind(this)}
                    />
                </View>
            );
        });
        return (
            <View
                style={{backgroundColor:'rgb(41,44,52)', flex:1}}
            >
            <TopBar
                backText={'分类'}
                onBack={this.onBack.bind(this)}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {ca}
            </ScrollView>
            </View>
        )
    }

    onBack(){
        this.props.navigator.pop();
    }

    onPressBlock(idx){
        this.props.navigator.push({
            name: 'ClassificationDetail',
            component: ClassificationDetail,
            props:{
                type: listFlag[idx],
                typeName: listText[idx]
            }
        });
    }
}

const styles = StyleSheet.create({
    group: {
        flexDirection: 'row'
    }
});

export default Classification;








