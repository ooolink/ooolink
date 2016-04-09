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
    Animated,
    PropTypes
} from 'react-native';

function timeDeal(time, type) {
    "use strict";

    function ago(time) {
        let t = new Date() - new Date(time), tm = [], tms = ['年', '个月', '天', '小时', '分钟', '秒'];
        tm[0] = t / (365 * 24 * 3600 * 1000);
        tm[1] = t / (30 * 24 * 3600 * 1000);
        tm[2] = t / (24 * 3600 * 1000);
        tm[3] = t / (3600 * 1000);
        tm[4] = t / (60 * 1000);
        tm[5] = t / 1000;
        for (let i = 0, len = tm.length; i < len; i++) {
            if (parseInt(tm[i]) != 0) {
                return parseInt(tm[i]) + tms[i] + '前';
            }
        }
        return t + '毫秒前';
    }

    switch (type) {
        case 'ago':
            return ago(time);
        default:
            return ago(time);
    }
}

class InfoWithContentBlock extends Component{

	static propTypes = {
		title: PropTypes.string.isRequired,
		site: PropTypes.string.isRequired,
		time: PropTypes.any.isRequired
	};

	constructor(props) {
		super(props);
	}

	render(){
		return (
			<View style={styles.block}>
				<Text style={styles.title}>{this.props.title}</Text>
				<Text style={styles.time}>{timeDeal(this.props.time) + ' from ' + this.props.site}</Text>
			</View>
		);
	}	
}

const styles = StyleSheet.create({
	block: {
		padding: 10,
		borderBottomColor: '#eee',
		borderBottomWidth: 1
	},
	title: {
		fontWeight: '900'
	},
	time: {
		fontSize: 11,
		color: '#2F85A7'
	}
});

export default InfoWithContentBlock;