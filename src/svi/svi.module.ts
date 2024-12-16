import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SviService } from './svi.service';
import { AsteriskModule } from '../asterisk/asterisk.module';
import { AIModule } from '../ai/ai.module';

@Module({
  imports: [ConfigModule, AsteriskModule, AIModule],
  providers: [SviService],
  exports: [SviService],
})
export class SviModule {}
