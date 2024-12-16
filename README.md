# Serveur Vocal Interactif Intelligent (SVI3)

Un serveur vocal interactif intelligent basé sur NestJS qui utilise Asterisk pour la gestion des appels et l'IA (OpenAI ou Llama) pour l'analyse des intentions des clients.

## Fonctionnalités

- Gestion des appels entrants avec Asterisk
- Analyse intelligente des intentions des clients
- Routage automatique vers les téléconseillers appropriés
- Support multiple des modèles d'IA (OpenAI et Llama)

## Prérequis

- Node.js (v16 ou supérieur)
- Asterisk Server
- Ollama (si vous utilisez le modèle Llama)
- Clé API OpenAI (si vous utilisez OpenAI)

## Installation

1. Clonez le repository :
```bash
git clone [votre-repo]
cd svi3
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```
Puis modifiez le fichier `.env` avec vos configurations.

## Configuration

### Variables d'environnement

- `ASTERISK_HOST` : Hôte du serveur Asterisk
- `ASTERISK_PORT` : Port AMI d'Asterisk (par défaut: 5038)
- `ASTERISK_USERNAME` : Nom d'utilisateur AMI
- `ASTERISK_PASSWORD` : Mot de passe AMI
- `AI_MODEL_TYPE` : Type de modèle d'IA ('openai' ou 'llama')
- `OPENAI_API_KEY` : Clé API OpenAI (si vous utilisez OpenAI)
- `OLLAMA_BASE_URL` : URL du serveur Ollama (par défaut: http://localhost:11434)

### Configuration d'Asterisk

Assurez-vous que votre serveur Asterisk est configuré avec :
- AMI activé
- Les extensions appropriées pour le routage des appels
- Les fichiers audio nécessaires pour les messages d'accueil

### Configuration de l'IA

#### Pour OpenAI
- Obtenez une clé API sur [OpenAI Platform](https://platform.openai.com)
- Configurez `AI_MODEL_TYPE=openai` dans `.env`
- Ajoutez votre clé API dans `OPENAI_API_KEY`

#### Pour Llama
- Installez Ollama depuis [ollama.ai](https://ollama.ai)
- Démarrez le serveur Ollama
- Téléchargez le modèle : `ollama pull llama2`
- Configurez `AI_MODEL_TYPE=llama` dans `.env`

## Démarrage

1. En développement :
```bash
npm run start:dev
```

2. En production :
```bash
npm run build
npm run start:prod
```

## Architecture

Le projet est structuré en plusieurs modules :

- `AsteriskModule` : Gestion des appels et interaction avec Asterisk
- `AIModule` : Service d'analyse d'intentions avec support OpenAI et Llama
- `SviModule` : Logique principale du SVI

## Utilisation

1. Le système répond automatiquement aux appels entrants
2. Un message d'accueil est joué
3. L'IA analyse la demande du client
4. Le client est redirigé vers le téléconseiller le plus approprié

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push sur votre branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence [votre licence] - voir le fichier LICENSE pour plus de détails.

## Support

Pour toute question ou problème :
- Ouvrez une issue
- Contactez l'équipe de développement
