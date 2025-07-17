# Backend Ebenezer 4 - API de Gestion des Bénévoles

Backend NestJS avec MongoDB pour l'application de gestion des bénévoles de l'événement chrétien Ebenezer 4.

## 🚀 Fonctionnalités

### Gestion des Bénévoles
- ✅ Inscription des bénévoles
- ✅ Récupération de la liste des bénévoles (avec filtrage par section)
- ✅ Suppression des bénévoles
- ✅ Statistiques détaillées avec agrégation MongoDB

### Authentification Admin
- ✅ Connexion sécurisée avec JWT
- ✅ Protection des routes administrateur
- ✅ Compte admin par défaut

### Système de Messagerie
- ✅ Envoi de SMS
- ✅ Envoi de messages WhatsApp
- ✅ Envoi d'emails
- ✅ Simulation des envois (prêt pour intégration réelle)

## 🛠️ Technologies Utilisées

- **NestJS** - Framework Node.js
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hachage des mots de passe
- **class-validator** - Validation des données
- **Nodemailer** - Envoi d'emails
- **Twilio** - SMS et WhatsApp (configuration)

## 📦 Installation

```bash
# Installation des dépendances
npm install

# Assurez-vous que MongoDB est installé et en cours d'exécution
# Sur macOS avec Homebrew:
brew services start mongodb-community

# Sur Ubuntu:
sudo systemctl start mongod

# Démarrage en mode développement
npm run start:dev

# Démarrage en mode production
npm run start:prod
```

## 🔧 Configuration

### Base de données MongoDB

1. **Installation locale de MongoDB:**
   ```bash
   # macOS
   brew install mongodb-community
   
   # Ubuntu
   sudo apt-get install mongodb
   
   # Windows
   # Télécharger depuis https://www.mongodb.com/try/download/community
   ```

2. **Ou utiliser MongoDB Atlas (cloud):**
   - Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Créez un cluster gratuit
   - Obtenez votre URI de connexion
   - Remplacez `MONGODB_URI` dans le fichier `.env`

### Variables d'environnement

Copiez le fichier `.env` et configurez vos variables :

```env
# Base de données
MONGODB_URI=mongodb://localhost:27017/ebenezer4
# Ou pour MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ebenezer4

# JWT
JWT_SECRET=votre-clé-secrète-jwt

# Email
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app

# Twilio (optionnel)
TWILIO_ACCOUNT_SID=votre-sid-twilio
TWILIO_AUTH_TOKEN=votre-token-twilio
```

## 📚 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion admin

### Bénévoles
- `POST /api/volunteers` - Inscription d'un bénévole
- `GET /api/volunteers` - Liste des bénévoles (protégé)
- `GET /api/volunteers/statistics` - Statistiques avec agrégation MongoDB (protégé)
- `DELETE /api/volunteers/:id` - Suppression (protégé)

### Messages
- `POST /api/messages/sms` - Envoi SMS (protégé)
- `POST /api/messages/whatsapp` - Envoi WhatsApp (protégé)
- `POST /api/messages/email` - Envoi Email (protégé)

## 🔐 Authentification

**Compte admin par défaut :**
- Username: `admin`
- Password: `ebenezer2024`

## 📊 Sections Disponibles

- `accueil` - Équipe d'accueil
- `organisation` - Coordination événement
- `sécurité` - Sécurité et ordre
- `staff` - Équipe générale
- `transport` - Logistique transport

## 🎨 Intégration Frontend

Ce backend est conçu pour fonctionner avec l'application React Ebenezer 4. 
Configurez l'URL de l'API dans votre frontend :

```typescript
const API_BASE_URL = 'http://localhost:3000';
```

## 🚀 Déploiement

### Déploiement avec MongoDB Atlas (recommandé)

1. Créez un cluster MongoDB Atlas
2. Configurez `MONGODB_URI` avec votre URI Atlas
3. Déployez sur :
   - Heroku
   - Railway
   - DigitalOcean
   - AWS
   - Vercel (avec adaptations)

### Exemple de déploiement Heroku

```bash
# Installer Heroku CLI
npm install -g heroku

# Créer une app Heroku
heroku create ebenezer4-backend

# Configurer les variables d'environnement
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Déployer
git push heroku main
```

## 📝 Avantages de MongoDB

- **Flexibilité** : Schéma flexible pour les données des bénévoles
- **Performance** : Requêtes rapides avec indexation automatique
- **Agrégation** : Pipeline d'agrégation puissant pour les statistiques
- **Scalabilité** : Facilement scalable horizontalement
- **Cloud-ready** : MongoDB Atlas pour le déploiement cloud

## 🔍 Exemples de requêtes MongoDB

```javascript
// Statistiques par section (agrégation)
db.volunteers.aggregate([
  { $group: { _id: "$section", count: { $sum: 1 } } }
])

// Bénévoles nés de nouveau par section
db.volunteers.aggregate([
  { $match: { isBornAgain: true } },
  { $group: { _id: "$section", count: { $sum: 1 } } }
])
```

## 🤝 Support

Pour toute question concernant l'événement Ebenezer 4 ou l'utilisation de cette API, contactez l'équipe technique.