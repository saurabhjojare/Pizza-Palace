import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CustomersModule } from '../customer/customers.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'd3eb1468b1e060e68255f9da70ad4af3',
      signOptions: { expiresIn: '1h' },
    }),
    CustomersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
