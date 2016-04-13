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
    TextInput,
    Image,
    PropTypes,
    View,
    Dimensions,
    TouchableOpacity,
    Animated
} from 'react-native';

let {height, width} = Dimensions.get('window');
const images = {
	bimg : require('../../images/markdown/b.png'),
	iimg : require('../../images/markdown/i.png'),
	yinimg : require('../../images/markdown/yin.png'),
	listimg : require('../../images/markdown/list.png'),
	listnimg : require('../../images/markdown/listn.png'),
	codeimg : require('../../images/markdown/code.png'),
	linkimg : require('../../images/markdown/link.png'),
	imageimg : require('../../images/markdown/image.png'),
	previewimg : require('../../images/markdown/preview.png')
}
const styles = StyleSheet.create({
	mkItem: {
		width: 20,
		height: 20,
		margin: 10,
	},
	textInput: {
		height: height - 81,
		width,
		padding: 10,
		fontSize: 16
	}
});

class EditBlock extends Component{

	constructor(props){
		super(props);
		let com = [];
		['b', 'i', 'yin', 'list', 'listn', 'code', 'link', 'image', 'preview'].forEach((name, idx)=>{
			com.push(
				<TouchableOpacity 
					key={idx}
					onPress={this['onInput' + name].bind(this)}>
					<Image 
						source={images[name+'img']}
						style={styles.mkItem}
					/>
				</TouchableOpacity>
			);
		});
		this.state = {
			com,
			content: '',
			listnumber: {
				n: 1,
				last: 0
			}
		}
	}

	render(){
		return(
			<View>
				<ScrollView 
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={{width, borderBottomColor:'#999', borderBottomWidth:1}}
				>
					{this.state.com}
				</ScrollView>
				<TextInput
					autoFocus={true}
					placeholder={'来说点什么吧...'}
					placeholderTextColor={'#666'}
					autoCorrect={false}
					multiline={true}
					style={styles.textInput}
					onChangeText={this.onChangeText.bind(this)}
					value={this.state.content}
				/>
			</View>
		);
	}

	onChangeText(text){
		let {last, n} = this.state.listnumber;
		if (last && text.length < last) {
			n = 1;
			last = 0;
		}	
		this.setState({content: text, listnumber: {n, last}});
	}

	onInputb(){
		this.setState({content: this.state.content+'**string**'});
	}

	onInputi(){
		this.setState({content: this.state.content+'*string*'});
	}

	onInputyin(){
		this.setState({content: this.state.content+'\n\n>'});
	}

	onInputlist(){
		this.setState({content: this.state.content+'\n\n* '});
	}

	onInputlistn(){
		let n = this.state.listnumber.n;
		this.setState({content: this.state.content+`\n\n${n}. `, listnumber: {n: n+1, last: this.state.content.length + 4}});
	}

	onInputcode(){
		this.setState({content: this.state.content+`\n\`\`\`\n\n\`\`\``});
	}

	onInputlink(){

	}

	onInputimage(){

	}

	onInputpreview(){

	}
}

class MarkDownEditMod extends Component{
	
	static propTypes = {
		titleHaved: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
    }

    render(){
    	return (
    		<EditBlock/>
    	);
    }

}

export default MarkDownEditMod;