<div align="center">
<img width="200" src="https://user-images.githubusercontent.com/67436391/193463210-0fce1b15-da7a-406a-8103-9386d08f2bf4.png" align="center">
 <br/>
 <br/>
  <a href="https://github.com/NIS4IL-PROJETS5/DogGo-API/releases" target="_blank">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.5-blue.svg?cacheSeconds=2592000&style=for-the-badge" />
  </a>
</div>

<div align="left">
<label>Documentation:</label>
</br>
•<a href="https://github.com/NIS4IL-PROJETS5/DogGo-API#doggo-api"> English</a>
</br>
•<a href="https://github.com/NIS4IL-PROJETS5/DogGo-API#doggo-api-fr"> Français</a>
</div>

# DogGo-API

Create an android application to improve the communication of the association while keeping the content of the website.

📅 September 22 - February 23  
🧑‍🎓 Semester 5  
🐶 Les Joyeux Cabots

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=NIS4IL-PROJETS5_DogGo-API&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=NIS4IL-PROJETS5_DogGo-API)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=NIS4IL-PROJETS5_DogGo-API&metric=bugs)](https://sonarcloud.io/summary/new_code?id=NIS4IL-PROJETS5_DogGo-API)

## 🌳 Architecture

📦src  
 ┣ 📂controllers -> `methods used to handle requests`  
 ┣ 📂middleware -> `rules for the routes`  
 ┃ ┗ 📜auth.js -> `protect requests with unique tokens`  
 ┣ 📂models -> `schema interactions with the database`  
 ┣ 📂routes -> `requests linked to controllers`  
 ┣ 📂util -> `scripts useful for the app`  
 ┃ ┣ 📜functions.js -> `reduce repetition of the functions`  
 ┃ ┗ 📜mysql.connect.js - > `connection to mysql database`  
 ┣ 📜app.js -> `setup express and connect to the database`  
 ┗ 📜server.js -> `create and start the server`

## ⚙️ Installation

### Requirements

Node 16.9 or higher

- MongoDB cluster

1. Create an [account](https://account.mongodb.com/account/login)
2. Create a cluster
3. Connect it with "connect your application"
4. Copy your connection string
5. Replace `<username>` & `<password>` with your database access user credentials

### Start using the API

- Clone the repo

```
git clone https://github.com/NIS4IL-PROJETS5/DogGo-API.git
```

##### 🧾 ENV FILE

1. Replace content of `example.env`

```
MONGO_URI=mongodb+srv://<username>:<password>@<clustername>.xxxxx.mongodb.net/DogGo?retryWrites=true&w=majority
JWT_SECRET=randomized-sequence-of-characters
MYSQL_ADRESS=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=db_test
MYSQL_USER=root
MYSQL_PASSWORD=123
```

2. Rename the file `example.env` > `.env`

_Note: Default api port is `3000` you can set a custom one with `PORT` env variable_  
_You can leave the `MYSQL_PASSWORD` empty, if your user has no password_

##### 🚀 LAUNCH API

1. Install dependencies

```
npm install
```

2. Start

```
node .
```

##

# DogGo-API _FR_

Créer une application pour améliorer la communication de l'association tout en gardant le contenu actuel du site.

📅 22 septembre - 23 février  
🧑‍🎓 Semestre 5  
🐶 Les Joyeux Cabots

## 🌳 Architecture

📦src  
┣ 📂controllers -> `méthodes utilisées pour gérer les requêtes`  
┣ 📂middleware -> `règles pour les routes`  
┃ ┗ 📜auth.js -> `protéger les requêtes avec des jetons uniques`  
┣ 📂models -> `interactions de schéma avec la base de données`  
┣ 📂routes -> `requêtes liées aux contrôleurs`  
┣ 📂util -> `scripts utiles pour l'application`  
┃ ┣ 📜functions.js -> `réduire la répétition des fonctions`  
┃ ┗ 📜mysql.connect.js - > `connexion à la base de données mysql`  
┣ 📜app.js -> `configuration d'express et connexion à la base de données`  
┗ 📜server.js -> `créer et démarrer le serveur`  

## ⚙️ Installation FR

### Prérequis

Node 16.9 ou supérieur

- Cluster MongoDB

1. Créer un [compte](https://account.mongodb.com/account/login)
2. Créer un cluster
3. Le connecter avec "connect your application"
4. Copier votre chaîne de connexion
5. Remplacer `<username>` & `<password>` avec vos identifiants d'accès à la base de données

### Démarrer l'API

- Cloner le repo

```
git clone https://github.com/NIS4IL-PROJETS5/DogGo-API.git
```

##### 🧾 FICHIER ENV

1. Remplacer le contenu de `example.env`

```
MONGO_URI=mongodb+srv://<username>:<password>@<clustername>.xxxxx.mongodb.net/DogGo?retryWrites=true&w=majority
JWT_SECRET=randomized-sequence-of-characters
MYSQL_ADRESS=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=db_test
MYSQL_USER=root
MYSQL_PASSWORD=123
```

2. Renommer le fichier `example.env` > `.env`

_Note: Le port par défaut de l'api est `3000` vous pouvez en définir un personnalisé avec la variable d'environnement `PORT`_

##### 🚀 LANCER L'API

1. Installer les dépendances

```
npm install
```

2. Démarrer

```
node .
```

## 🦾 Powered by

<div align="center" style="display:flex;">
    <a href="https://www.mongodb.com/" target="_blank">
        <img alt="MongoDB" src="https://user-images.githubusercontent.com/67436391/179426484-d3fb357a-4702-4785-b0e1-7dc443923dab.jpeg" width="75" />
    </a>
    <a href="https://nodejs.org/en/" target="_blank">
        <img alt="NodeJS" src="https://user-images.githubusercontent.com/67436391/193464238-23ca291f-c8a6-40c6-b2bf-48e589487374.png" width="75" />
    </a>
</div>
