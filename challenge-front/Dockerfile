# Utiliser l'image node comme image de base
FROM node:16-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Définir la commande pour lancer l'application
CMD [ "npm", "start" ]

