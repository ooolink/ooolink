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
	},
	modalContainer: {
		width: 220,
		padding: 10,
		height: 120,
		top: -100,
		backgroundColor: '#fff'
	},
	modalTextInput: {
		height: 20,
		width: 160,
		fontSize: 13,
		marginTop: 10
	},	
	modalButton: {
		marginTop: 10,
		width: 40,
		height: 20,
		fontWeight: '900',
		color: '#333',
		textAlign: 'center'
	},
	wrap: {
		position: 'absolute',
		top:0,
		left: 0,
		width,
		height,
		backgroundColor: '#999999cc',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

class EditModal extends Component{
	constructor(props){
		super(props);
		this.state={
			desc: '',
			link: 'http://'
		}
	}

	static propTypes = {
		title: PropTypes.string.isRequired,
		onCancel: PropTypes.func.isRequired,
		onAdd: PropTypes.func.isRequired
    };

	render(){
		return (
			<View style={styles.wrap}>
				<View style={styles.modalContainer}>
					<Text>{this.props.title}</Text>
					<TextInput
						autoCorrect={false}
						onChangeText={desc=>this.setState({desc})}
						value={this.state.desc}
						style={styles.modalTextInput}
						placeholder={'描述'}
						placeholderTextColor={'#666'}
					/>
					<TextInput
						autoCorrect={false}
						onChangeText={link=>this.setState({link})}
						value={this.state.link}
						style={styles.modalTextInput}
						placeholder={'地址'}
						placeholderTextColor={'#666'}
					/>
					<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
						<Text style={styles.modalButton} onPress={this.onCancel.bind(this)}>取消</Text>
						<Text style={styles.modalButton} onPress={this.onAdd.bind(this)}>添加</Text>
					</View>
				</View>
			</View>
		);
	}

	onCancel(){
		this.props.onCancel();
	}

	onAdd(){
		this.props.onAdd(this.state.desc, this.state.link);
	}
}

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
			},
			modaltitle: '',
			modalvisiable:false
		}
	}

	render(){
		let modalCom = this.state.modalvisiable ? 
			<EditModal 
				title={this.state.modaltitle}
				onCancel={()=>{this.setState({modalvisiable: false})}}
				onAdd={this.onAdd.bind(this)}
			/> : 
			null;

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
				{modalCom}
			</View>
		);
	}

	onAdd(desc, link){
		let content = this.state.content;
		if (this.state.modaltitle === '添加链接'){
			content+=`[${desc}](${link})`;
		} else if (this.state.modaltitle = '添加图片'){
			content+=`\n![${desc}](${link})`;
		}

		this.setState({content, modaltitle: '', modalvisiable: false});
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
		this.setState({
			modalvisiable: true,
			modaltitle: '添加链接' 
		});
	}

	onInputimage(){
		this.setState({
			modalvisiable: true,
			modaltitle: '添加图片' 
		});
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