/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React, {
  NativeModules,
  DeviceEventEmitter, //android
  NativeAppEventEmitter, //ios
  Platform,
  AppState,
} from 'react-native';

const SmsAndroidNative = NativeModules.SmsAndroid;

const SmsAndroid = {
    getSupportedCountries(cb){
        this.addEventListener(SmsAndroidNative.DidGetSupportedCountries, cb);
        SmsAndroidNative.getSupportedCountries();
    },

    getVerificationCode(country, phone){
        SmsAndroidNative.getVerificationCode(country, phone);
    },

    addEventListener(eventName, handler){
        if (Platform.OS === 'android'){
            return DeviceEventEmitter.addListener(eventName, (event)=>{
                handler(event);
            });
        } else {

        }
    }
}

export default SmsAndroid;