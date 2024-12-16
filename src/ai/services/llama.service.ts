import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { AIServiceInterface } from '../interfaces/ai-service.interface';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class LlamaService implements AIServiceInterface {
    private model: ChatOllama;

    constructor(private configService: ConfigService) {
        this.model = new ChatOllama({
            baseUrl: this.configService.get('OLLAMA_BASE_URL') || 'http://localhost:11434',
            model: 'llama2',
        });
    }

    async analyzeIntent(input: string) {
        const systemPrompt = new SystemMessage(
            'Tu es un assistant qui analyse les demandes des clients. Tu dois répondre uniquement en format JSON avec les champs: intent, confidence, et department.'
        );
        const userPrompt = new HumanMessage(
            `Analyze the following customer request: "${input}"`
        );

        try {
            const response = await this.model.call([systemPrompt, userPrompt]);
            let parsedResponse;
            
            try {
                // Tenter de parser la réponse comme JSON
                parsedResponse = JSON.parse(response.content.toString());
            } catch (parseError) {
                // Si le parsing échoue, créer une réponse par défaut basée sur le texte
                console.warn('Failed to parse JSON response, using text response');
                parsedResponse = {
                    intent: response.content.toString().includes('technical') ? 'technical_support' : 'general',
                    confidence: 0.7,
                    department: 'general'
                };
            }
            
            return {
                intent: parsedResponse.intent || 'unknown',
                confidence: parsedResponse.confidence || 0.5,
                suggestedDepartment: parsedResponse.department || 'general',
            };
        } catch (error) {
            console.error('Error with Llama analysis:', error);
            return {
                intent: 'unknown',
                confidence: 0.5,
                suggestedDepartment: 'general',
            };
        }
    }
}
