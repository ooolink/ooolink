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
    View,
    Text,
    TouchableOpacity,
    Animated,
    PropTypes
} from 'react-native';

class InfoWithContentBlock extends Component{

	static propTypes = {
        id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		count: PropTypes.number.isRequired,
		list: PropTypes.array.isRequired,
        onSelectInfo: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	render(){
        let listCom = [];
        this.props.list.forEach((item,idx)=>{
            listCom.push(
                <Text style={[styles.item, {marginBottom: idx === this.props.list.length - 1 ? 0 : 10}]} key={idx}>{item.title}</Text>
            );
        });
		return (
            <TouchableOpacity
                onPress={()=>{this.props.onSelectInfo(this.props.id, this.props.title, this.props.count)}}
            >
    			<View style={styles.block}>
    				<View style={{flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.count}>{this.props.count}</Text>
                    </View>
                    <View style={styles.itemList}>
                    {listCom}
                    </View>
    			</View>
            </TouchableOpacity>
		);
	}	
}

const styles = StyleSheet.create({
	block: {
		borderTopColor: '#ddd',
		borderTopWidth: 1,
        marginBottom: 20
	},
	title: {
		fontWeight: '900',
        fontSize: 16,
        color: '#333'
	},
	count: {
		fontSize: 13,
		color: '#65b278'
	},
    item:{
        fontSize: 14,
        color: '#666'
    },
    itemList: {
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    }
});

export default InfoWithContentBlock;