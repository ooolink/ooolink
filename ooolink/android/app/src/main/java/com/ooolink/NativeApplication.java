package com.ooolink;

import android.app.Application;

import com.ooolink.sms.SmsApplication;

/**
 * Created by Rube on 16/6/14.
 */
public class NativeApplication extends Application {

    public SmsApplication smsApplication = new SmsApplication();

    @Override
    public void onCreate(){
        super.onCreate();
        smsApplication.onCreate(this);
    }
}
