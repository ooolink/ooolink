/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as ActionTypes from '../constants/actionTypes';
import {updateUserCollectionGeneral} from './collect';
import {getGlobal, setGlobal} from '../store';

export function getUserAllInfoFromNativeCache(){
    return (dispatch, getState)=>{
        getGlobal('isLogin', status=>{
                dispatch({
                    type: ActionTypes.UPDATE_USER_LOGIN_STATUS,
                    status: !!status
                });

                getGlobal('oooLinkToken', token=>{
                    dispatch({
                        type: ActionTypes.UPDATE_USER_TOKEN, 
                        token: token || null
                    });

                    getGlobal('userInfo', info=>{
                        dispatch({
                            type: ActionTypes.UPDATE_USER_INFO,
                            info: info || null
                        });

                        getGlobal('userCollectionTypes', types=>{
                            dispatch({
                                type: ActionTypes.UPDATE_USER_COLLECTION_TYPE,
                                types: types || null
                            });

                            getGlobal('userName', userName=>{
                                getGlobal('passWord', userPasswd=>{
                                    dispatch({
                                        type: ActionTypes.UPDATE_USER_LOGIN_INFO,
                                        userName: userName || null,
                                        userPasswd: userPasswd || null
                                    });

                                    //App加载完成，如果还有其他预加载流程可以放到对应流程中
                                    dispatch({
                                        type: ActionTypes.UPDATE_APP_LOAD_STATUS,
                                        status: true
                                    });
                                });
                            });
                        });
                    });
                });                
        });
    }
}

export function setUserInfoAfterLoginStatusChange(userName, userPasswd, token, status, info){
    return (dispatch, getState)=>{
        token!='empty' && dispatch({
            type: ActionTypes.UPDATE_USER_TOKEN,
            token
        });

        status!='empty' && dispatch({
            type: ActionTypes.UPDATE_USER_LOGIN_STATUS,
            status
        });

        userName!='empty' && userPasswd!='empty' && dispatch({
            type: ActionTypes.UPDATE_USER_LOGIN_INFO,
            userName,
            userPasswd
        });

        if (info || info === 'infoClear'){
            dispatch({
                type: ActionTypes.UPDATE_USER_INFO,
                info: info === 'infoClear' ? null : info
            });
        }
    }
}

export function updateUserToken(token){
    if (token){
        return {
            type: ActionTypes.UPDATE_USER_TOKEN,
            token
        }
    } else {
        return (dispatch, getState)=>{
            getGlobal('oooLinkToken', token=>{
                dispatch({
                    type: ActionTypes.UPDATE_USER_TOKEN,
                    token
                });
            });

            getGlobal('isLogin', status=>{
                dispatch({
                    type: ActionTypes.UPDATE_USER_LOGIN_STATUS,
                    status: !!status
                });
            });
        }
    }
}

export function updateUserInfo(info){
    if (info){
        return {
            type: ActionTypes.UPDATE_USER_INFO,
            info
        }
    } else {
        return (dispatch, getState)=>{
            getGlobal('userInfo', info=>{
                dispatch({
                    type: ActionTypes.UPDATE_USER_INFO,
                    info
                });
            });
        }
    }
}

//更新全部的收藏夹信息
export function updateUserCollectionType(types, isCache){

    if (types){

        isCache && setGlobal('userCollectionTypes', types, 1000*60*2);
        
        return {
            type: ActionTypes.UPDATE_USER_COLLECTION_TYPE,
            types
        }
    }
}

//更新单个收藏夹的名字
export function updateUserCollectionTypeName(typeId, newName){
    return (dispatch, getState)=>{
        let oldUserCollectionTypes = getState().user.userCollectionTypes;
        let oldUserCollections = getState().collect.userCollections
        //可能缓存失效，没有userCollectionTypes
        if (Array.isArray(oldUserCollectionTypes)){
            oldUserCollectionTypes.forEach(item=>{
                if (item.id === typeId){
                    item.name = newName;
                }
            });

            dispatch(updateUserCollectionType(oldUserCollectionTypes, true));
        }

        if (oldUserCollections){
            let nameFlag = null;
            Object.keys(oldUserCollections).forEach(typeName=>{
                if (oldUserCollections[typeName].id === typeId){
                    nameFlag = typeName;
                    oldUserCollections[newName] = oldUserCollections[typeName];
                }
            });
            nameFlag && delete oldUserCollections[nameFlag];

            dispatch(updateUserCollectionGeneral(oldUserCollections));
        }
    };
}

export function deleteUserCollectionTypeById(typeId){
    return (dispatch, getState)=>{
        let oldUserCollectionTypes = getState().user.userCollectionTypes;
        let oldUserCollections = getState().collect.userCollections
        //可能缓存失效，没有userCollectionTypes
        if (Array.isArray(oldUserCollectionTypes)){
            let spliceIdx = -1;
            oldUserCollectionTypes.forEach((item, idx)=>{
                if (item.id === typeId){
                    spliceIdx = idx;
                }   
            });
            if (spliceIdx !== -1){
                oldUserCollectionTypes.splice(spliceIdx, 1);
                dispatch(updateUserCollectionType(oldUserCollectionTypes, true));
            }
        }

        if (oldUserCollections){
            let nameFlag = null;
            Object.keys(oldUserCollections).forEach(typeName=>{
                if (oldUserCollections[typeName].id === typeId){
                    nameFlag = typeName;
                }
            });
            nameFlag && delete oldUserCollections[nameFlag];

            dispatch(updateUserCollectionGeneral(oldUserCollections));
        }
    };
}

export function updateUserLoginStatus(status){
    return {
        types: ActionTypes.UPDATE_USER_LOGIN_STATUS,
        status
    }
}





