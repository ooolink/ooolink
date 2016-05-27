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
    TouchableOpacity,
    PropTypes
} from 'react-native';
import {USER_DEFAULT_HEAD} from '../../constants/config';
import {UriDeal, WordLineDeal, timeDeal, numberDeal} from '../../utils';
const {width, height} = Dimensions.get('window');

class TopicWithoutBgBlock extends Component{
    static propTypes = {
        onSelectTopic: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
    }

    render(){
        let data = this.props.data,
            bgColor = '#eee';
        if (this.props.idx % 2 === 0){
            bgColor = '#fff';
        }
        data.image = UriDeal(data.image);
        let imgCom = data.image ? <Image style={styles.image} source={{uri: data.image}}/> : null;
        let line = data.image ? {borderBottomWidth: 0} : {};
        return(
        <TouchableOpacity
            onPress={this.props.onSelectTopic.bind(this, data)}
        >
        <View style={[styles.container, {backgroundColor: bgColor}]}>
            <View style={[styles.headContainer, line]}>
                <Text style={styles.from}>{`From Site`}</Text>
                <Text style={styles.time}>{timeDeal(data.updated)}</Text>
            </View>
            {imgCom}
            <Text style={styles.title}>{data.title}</Text>
            {(()=>{
                if (data.desc)
                return <Text style={styles.desc}>{data.desc}</Text>
            })()}
            <View></View>
        </View>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    headContainer:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    time:{
        color: '#666',
        fontSize: 12
    },
    from:{
        color: '#65b278',
        fontSize: 12,
        fontWeight: '900'
    },
    container:{
        paddingTop: 10,
        paddingBottom: 10
    },
    image: {
        width,
        height: 100
    },
    title: {
        fontWeight: '900',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        fontSize: 14
    },
    desc:{
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        color: '#666',
        lineHeight: 20
    }
});

export default TopicWithoutBgBlock;