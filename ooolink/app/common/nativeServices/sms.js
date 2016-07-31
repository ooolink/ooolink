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

const SmsNative = NativeModules.Sms;
let subscription;

const Sms = {
    getSupportedCountries(cb){
        cb && this._addEventListener(SmsNative.DidGetSupportedCountries, cb);
        SmsNative.getSupportedCountries();
    },

    getVerificationCode(country, phone, cb){
        cb && this._addEventListener(SmsNative.DidGetVerificationCode, cb);
        SmsNative.getVerificationCode(country, phone);
    },

    submitVerificationCode(country, phone, code, cb){
        cb && this._addEventListener(SmsNative.DidSubmitVerificationCode, cb);
        SmsNative.submitVerificationCode(country, phone, code);
    },

    _addEventListener(eventName, handler){
        if (Platform.OS === 'android'){
            return DeviceEventEmitter.once(eventName, (event)=>{
                handler(event);
            });
        } else if (Platform.OS === 'ios'){
            subscription && subscription.remove();
            subscription = NativeAppEventEmitter.addListener(eventName, (event)=>{
                handler(event);
            });
        }
    }
}

export default Sms;