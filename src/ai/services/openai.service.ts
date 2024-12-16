import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { AIServiceInterface } from '../interfaces/ai-service.interface';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class OpenAIService implements AIServiceInterface {
    private model: ChatOpenAI;

    constructor(private configService: ConfigService) {
        this.model = new ChatOpenAI({
            openAIApiKey: this.configService.get('OPENAI_API_KEY'),
            modelName: 'gpt-3.5-turbo',
            temperature: 0.7,
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
                parsedResponse = JSON.parse(response.content.toString());
            } catch (parseError) {
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
            console.error('Error with OpenAI analysis:', error);
            return {
                intent: 'unknown',
                confidence: 0.5,
                suggestedDepartment: 'general',
            };
        }
    }
}
