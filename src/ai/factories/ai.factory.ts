import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIService } from '../services/openai.service';
import { LlamaService } from '../services/llama.service';
import { AIServiceInterface } from '../interfaces/ai-service.interface';

export type AIModelType = 'openai' | 'llama';

@Injectable()
export class AIFactory {
    constructor(
        private configService: ConfigService,
        private openAIService: OpenAIService,
        private llamaService: LlamaService,
    ) {}

    getAIService(type?: AIModelType): AIServiceInterface {
        // Si aucun type n'est spécifié, utiliser la valeur par défaut de la configuration
        const aiType = type || this.configService.get('AI_MODEL_TYPE') || 'openai';

        switch (aiType.toLowerCase()) {
            case 'llama':
                return this.llamaService;
            case 'openai':
            default:
                return this.openAIService;
        }
    }
}
