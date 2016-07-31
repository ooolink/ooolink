//
//  Sms.m
//  ooolink
//
//  Created by 董一炜 on 16/7/31.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "Sms.h"

@implementation Sms

RCT_EXPORT_MODULE(Sms);

- (NSDictionary *)constantsToExport
{
  return @{ @"DidGetVerificationCode": @"DidGetVerificationCode",
            @"DidSubmitVerificationCode": @"DidSubmitVerificationCode",
            @"DidGetSupportedCountries": @"DidGetSupportedCountries"
          };
}

+(void)setRegisterAppKey: (NSString *)appKey WidthScret:(NSString *) srcret
{
  [SMSSDK registerApp:appKey withSecret:srcret];
}

RCT_EXPORT_METHOD(getVerificationCode: (NSString *)country phone:(NSString *) phone)
{
  [SMSSDK getVerificationCodeByMethod:SMSGetCodeMethodSMS phoneNumber:phone zone:@"86" customIdentifier: nil result:^(NSError *error){
    if (!error){
      
    } else {
      
    }
  }];
}

RCT_EXPORT_METHOD(submitVerificationCode: (NSString *) country phone:(NSString *) phone code:(NSString *)code)
{
  [SMSSDK commitVerificationCode: code phoneNumber: phone zone: country result: ^(NSError *error){
    if (!error){
      [self sendMessage:self.constantsToExport[@"DidSubmitVerificationCode"] body:@{
                                                                                    @"result": phone}];
    } else {
      [self sendMessage:self.constantsToExport[@"DidSubmitVerificationCode"] body:@{
                                                                                    @"result": @"null"}];
    }
  }];
}

@synthesize bridge = _bridge;

- (void)sendMessage:(NSString *)eventName body:(NSDictionary *)body
{
  [self.bridge.eventDispatcher sendAppEventWithName:eventName
                                               body:body];
}

@end
