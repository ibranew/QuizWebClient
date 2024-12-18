import { BaseResponse } from "./base/base-response";

export interface LoginResponse extends BaseResponse {
  token?: Token;
}

//token
export interface Token{
    accessToken:string,
    expiration : Date,
    refreshToken : string
}