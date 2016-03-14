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

import HtmlRender from 'react-native-html-render';

let {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    img: {
        width: width - 20,
        height: width
    }
});

class HtmlComponent extends Component {

    static propTypes = {
        content: PropTypes.string.isRequired
    };

    render() {
        return (
            <HtmlRender
                onLinkPress={this._onLinkPress.bind(this)}
                value={this.props.content}
                renderNode={this._renderNode}
            />
        );
    }

    _renderNode(node, index, parent, type) {
        if (node.type == 'block' && type == 'block') {
            if (node.name === 'img') {
                let uri = node.attribs.src;
                if (uri.substr(0, 2) === '//') {
                    uri = 'https:' + uri;
                }

                return (
                    <Image
                        resizeMode="contain"
                        style={styles.img}
                        source={{uri}}/>
                )
            }
        }
    }

    _onLinkPress() {

    }
}

export default HtmlComponent;