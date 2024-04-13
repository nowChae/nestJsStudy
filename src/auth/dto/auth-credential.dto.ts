import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/,{
        message : 'password only accept english and number' 
    })
    password : string;
}