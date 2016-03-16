/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React,{
    Component
} from 'react-native';
import {
    Provider
} from 'react-redux'
import configureStore from './store';
import App from './containers/app';

let store = configureStore();

class OOOLINK extends Component {
    render() {
        return (
            <Provider store={store}>
                <App></App>
            </Provider>
        );
    }
}

export default OOOLINK;