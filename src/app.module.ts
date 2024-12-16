import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsteriskModule } from './asterisk/asterisk.module';
import { SviModule } from './svi/svi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AsteriskModule,
    SviModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
