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
    PropTypes,
    View,
    Dimensions,
    Animated,
    WebView,
    TouchableOpacity
} from 'react-native';
import TopBar from './topBar';
import LoadingBlock from './loadingBlock';
let {height, width} = Dimensions.get('window');

class WebViewoooLink extends Component{

    render(){
        return (
            <View style={{flex: 1}}>
                <TopBar
                backText='源站'
                onBack={()=>{this.props.navigator.pop()}}
                />
                <WebView
                    javaScriptEnabled={true}
                    automaticallyAdjustContentInsets={false}
                    domStorageEnabled={true}
                    decelerationRate={'normal'}
                    mediaPlaybackRequiresUserAction={true}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    renderLoading={()=>{
                        return <LoadingBlock size={'large'} styleAttr={'Large'}/>
                    }}
                    style={styles.webview}
                    source={{uri: this.props.url}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    webview: {
        height: height - 50,
        width
    }
});

export default WebViewoooLink;







