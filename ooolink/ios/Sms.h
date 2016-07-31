//
//  Sms.h
//  ooolink
//
//  Created by 董一炜 on 16/7/31.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#ifndef Sms_h
#define Sms_h

#import <SMS_SDK/SMSSDK.h>
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"

@interface Sms : NSObject <RCTBridgeModule>
+(void)setRegisterAppKey: (NSString *)appKey WidthScret:(NSString *) srcret;
@end

#endif /* Sms_h */
