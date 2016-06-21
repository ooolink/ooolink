package com.ooolink.sms;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import cn.smssdk.SMSSDK;

/**
 * Created by Rube on 16/6/14.
 */
public class SmsApplication {
    public void onCreate(Context cxt){
        ApplicationInfo appInfo = null;
        try {
            appInfo = cxt.getPackageManager()
                    .getApplicationInfo(cxt.getPackageName(),
                            PackageManager.GET_META_DATA);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        String id = appInfo.metaData.getString("MOB_ID");
        String key = appInfo.metaData.getString("MOB_KEY");

        SMSSDK.initSDK(cxt, id, key);
    }
}
