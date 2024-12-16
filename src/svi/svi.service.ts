import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIFactory } from '../ai/factories/ai.factory';

@Injectable()
export class SviService {
  constructor(
    private configService: ConfigService,
    private aiFactory: AIFactory,
  ) {}

  async analyzeUserIntent(audioTranscript: string): Promise<{
    intent: string;
    confidence: number;
    suggestedDepartment: string;
  }> {
    try {
      const aiService = this.aiFactory.getAIService();
      return await aiService.analyzeIntent(audioTranscript);
    } catch (error) {
      console.error('Erreur lors de l\'analyse de l\'intention:', error);
      throw error;
    }
  }

  determineAgentSkillsNeeded(intent: string): string[] {
    // Logique pour déterminer les compétences nécessaires basées sur l'intention
    const skillsMapping = {
      support_technique: ['technical', 'troubleshooting'],
      facturation: ['billing', 'accounting'],
      information_generale: ['general_info', 'customer_service'],
      // Ajoutez d'autres mappings selon vos besoins
    };

    return skillsMapping[intent] || ['general_info'];
  }

  async findBestAgent(skills: string[]): Promise<string> {
    // Ici, vous implementerez la logique pour trouver le meilleur agent disponible
    // basé sur les compétences requises et la disponibilité
    return '2000';
  }
}
