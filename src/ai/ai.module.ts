import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIService } from './services/openai.service';
import { LlamaService } from './services/llama.service';
import { AIFactory } from './factories/ai.factory';

@Module({
    imports: [ConfigModule],
    providers: [
        OpenAIService,
        LlamaService,
        AIFactory,
    ],
    exports: [AIFactory],
})
export class AIModule {}
