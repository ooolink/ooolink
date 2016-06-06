/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as ActionTypes from '../constants/actionTypes';
import {getPlatformMessage} from '../services/messageService';

export function getPlatfromMessage(token){
    return (dispatch, getState)=>{
        getPlatformMessage(token, rs=>{
            if (rs && rs.result === 1){
                dispatch({
                    type: ActionTypes.UPDATE_MESSAGE,
                    messages: rs.data
                });
            }
        });
    }
}