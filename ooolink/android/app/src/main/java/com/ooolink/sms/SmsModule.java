package com.ooolink.sms;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import cn.smssdk.EventHandler;
import cn.smssdk.SMSSDK;
import cn.smssdk.gui.ContactsPage;

/**
 * Created by Rube on 16/6/14.
 */
public class SmsModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    protected static final String TAG = SmsModule.class.getSimpleName();
    protected static final String DidGetSupportedCountries = "DidGetSupportedCountries";
    protected static final String DidGetVerificationCode = "DidGetVerificationCode";
    protected static final String DidSubmitVerificationCode = "DidSubmitVerificationCode";

    private EventHandler eh = null;

    public SmsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "SmsAndroid";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DidGetSupportedCountries, DidGetSupportedCountries);
        constants.put(DidGetVerificationCode, DidGetVerificationCode);
        constants.put(DidSubmitVerificationCode, DidSubmitVerificationCode);
        return constants;
    }

    @ReactMethod
    public void getSupportedCountries() {
        SMSSDK.getSupportedCountries();
    }

    @ReactMethod
    public void getVerificationCode(String country, String phone) {
        SMSSDK.getVerificationCode(country, phone);
    }

    @ReactMethod
    public void submitVerificationCode(String country, String phone, String code){
        SMSSDK.submitVerificationCode(country, phone, code);
    }

    private WritableMap convertToWriteMap(HashMap<String, String> data) {
        WritableMap map = Arguments.createMap();
        Iterator<String> keys = data.keySet().iterator();
        String key;
        while (keys.hasNext()){
            key = keys.next();
            map.putString(key, data.get(key).toString());
        }
        return map;
    }

    private WritableArray convertToWriteArray(List<String> data){
        WritableArray arr = Arguments.createArray();
        Iterator<String> values = data.iterator();
        while (values.hasNext()){
            arr.pushString(values.next());
        }
        return arr;
    }

    private void sendEvent(String eventName,
                           @Nullable WritableArray params) {
        //此处需要添加hasActiveCatalystInstance，否则可能造成崩溃
        //问题解决参考: https://github.com/walmartreact/react-native-orientation-listener/issues/8
        if(getReactApplicationContext().hasActiveCatalystInstance()) {
            Log.i(TAG, "hasActiveCatalystInstance");
            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
        else {
            Log.i(TAG, "not hasActiveCatalystInstance");
        }
    }

    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        //此处需要添加hasActiveCatalystInstance，否则可能造成崩溃
        //问题解决参考: https://github.com/walmartreact/react-native-orientation-listener/issues/8
        if(getReactApplicationContext().hasActiveCatalystInstance()) {
            Log.i(TAG, "hasActiveCatalystInstance");
            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
        else {
            Log.i(TAG, "not hasActiveCatalystInstance");
        }
    }

    @Override
    public void onHostResume() {
        eh = new EventHandler(){

            @Override
            public void afterEvent(int event, int result, Object data) {

                if (result == SMSSDK.RESULT_COMPLETE) {
                    //回调完成
                    if (event == SMSSDK.EVENT_SUBMIT_VERIFICATION_CODE) {
                        //提交验证码成功
                    }else if (event == SMSSDK.EVENT_GET_VERIFICATION_CODE){
                        //获取验证码成功
                    }else if (event == SMSSDK.EVENT_GET_SUPPORTED_COUNTRIES){
                        //返回支持发送验证码的国家列表
                        ArrayList<HashMap<String,Object>> rs = (ArrayList<HashMap<String,Object>>) data;
                        Iterator<HashMap<String, Object>> ctLists = rs.iterator();
                        ArrayList<String> codes = new ArrayList<String>(rs.size());
                        while (ctLists.hasNext()){
                            codes.add(ctLists.next().get("zone").toString());
                        }
                        sendEvent(DidGetSupportedCountries, convertToWriteArray(codes));
                    }
                }else{
                    ((Throwable)data).printStackTrace();
                }
            }
        };
        SMSSDK.registerEventHandler(eh);
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        SMSSDK.unregisterEventHandler(eh);
    }
}
