/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as ActionTypes from '../constants/actionTypes';

export function updateCommentCount(contentid, incNumber, page = -1){
    return {
        type: ActionTypes.UPDATE_COMMENT_COUNT,
        contentid,
        incNumber,
        page
    }
}

export function setComments(contentid, page, comments, incNumber){
    return (dispatch, getState)=>{
        dispatch({
            type: ActionTypes.SET_COMMENTS,
            page,
            contentid,
            comments
        });
        if (incNumber){
            dispatch(updateCommentCount(contentid, incNumber, page));                
        }
    };
}

export function postComment(contentid, comment){
    return (dispatch, getState)=>{
        dispatch({
            type: ActionTypes.POST_COMMENT,
            contentid,
            comment
        });
        dispatch(updateCommentCount(contentid, 1));
    }
}