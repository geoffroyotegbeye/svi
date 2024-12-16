import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmiClient } from 'asterisk-ami';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AsteriskService implements OnModuleInit {
  private ami: AmiClient;

  constructor(private configService: ConfigService) {
    this.ami = new AmiClient({
      host: this.configService.get('ASTERISK_HOST') || 'localhost',
      port: this.configService.get('ASTERISK_PORT') || 5038,
      username: this.configService.get('ASTERISK_USERNAME') || 'admin',
      password: this.configService.get('ASTERISK_PASSWORD') || 'password',
    });
  }

  async onModuleInit() {
    try {
      await this.connect();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to connect to Asterisk:', error);
    }
  }

  private async connect() {
    await this.ami.connect();
    console.log('Connected to Asterisk AMI');
  }

  private setupEventListeners() {
    // Gestion des appels entrants
    this.ami.on('Newchannel', async (event) => {
      console.log('Nouvel appel entrant:', event);
      await this.handleIncomingCall(event);
    });

    // Gestion des raccrochages
    this.ami.on('Hangup', (event) => {
      console.log('Appel terminé:', event);
    });
  }

  private async handleIncomingCall(event: any) {
    try {
      // Lecture du message d'accueil
      await this.playWelcomeMessage(event.channel);
      
      // Ici, nous ajouterons la logique pour:
      // 1. Collecter les informations du client
      // 2. Analyser sa demande
      // 3. Rediriger vers le bon téléconseiller
    } catch (error) {
      console.error('Erreur lors du traitement de l\'appel:', error);
    }
  }

  private async playWelcomeMessage(channel: string) {
    try {
      await this.ami.action('Playback', {
        Channel: channel,
        Filename: 'welcome-message',
      });
    } catch (error) {
      console.error('Erreur lors de la lecture du message d\'accueil:', error);
    }
  }

  // Méthode pour transférer l'appel vers un téléconseiller
  async transferToAgent(channel: string, agentExtension: string) {
    try {
      await this.ami.action('Redirect', {
        Channel: channel,
        Exten: agentExtension,
        Context: 'agents',
        Priority: '1',
      });
    } catch (error) {
      console.error('Erreur lors du transfert vers l\'agent:', error);
    }
  }
}
