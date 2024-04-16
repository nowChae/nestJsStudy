import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt')

@Module({
  imports : [
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret : process.env.JWT_SECRET || jwtConfig.secret,
      signOptions :{
        expiresIn : jwtConfig.expiresIn //한시간 동안 토큰이 유효 
      }
    }),
    TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy,PassportModule]
})
export class AuthModule {}
