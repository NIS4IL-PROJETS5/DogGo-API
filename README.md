<div align="center">
<img width="200" src="https://user-images.githubusercontent.com/67436391/193463210-0fce1b15-da7a-406a-8103-9386d08f2bf4.png" align="center">
 <br/>
 <br/>
  <a href="https://github.com/NIS4IL-PROJETS5/DogGo-API/releases" target="_blank">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.8-blue.svg?cacheSeconds=2592000&style=for-the-badge" />
  </a>
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
┃ ┣ 📜multer-\*.js -> `upload files`  
┃ ┗ 📜auth.js -> `protect requests with unique tokens`  
┣ 📂models -> `schema interactions with the database`  
┣ 📂routes -> `requests linked to controllers`  
┣ 📂util -> `scripts useful for the app`  
┃ ┣ 📜functions.js -> `reduce repetition of the functions`  
┃ ┣ 📜swagger.js -> `generate swagger documentation`  
┃ ┣ 📜logger.js -> `log requests`  
┃ ┗ 📜mysql.connect.js - > `connection to mysql database`  
┣ 📂documents -> `docs files`  
┣ 📂images -> `images files`  
┣ 📜app.js -> `setup express and connect to the database`  
┣ 📜swagger_output.json -> `swagger documentation`  
┗ 📜server.js -> `create and start the server`  

#### 📬 Requests

Access to: `http://localhost:3000/api-docs`
After starting the server.

## ⚙️ Installation

### Requirements

Node 16.9 or higher

- MongoDB cluster

1. Create an [account](https://account.mongodb.com/account/login)
2. Create a cluster
3. Connect it with "connect your application"
4. Copy your connection string
5. Replace `<username>` & `<password>` with your database access user credentials

- Firebase project

If you do not yet have a firebase project :
1. Create a [google account](https://developers.google.com/?hl=fr)
2. Create a [firebase project](https://console.firebase.google.com/)
3. Activate cloud messaging in the project settings (IMPORTANT : Set it as both V1 and legacy versions)
4. Add the android application to the project (follow firebase's instructions)
5. Retrieve the firebase admin sdk secret key and put it at the root of the project

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
MYSQL_ACTUALITIES_TABLE=table_containing_current_actualities
FIREBASE_SECRET_URL=path_to_the_firebase_admin_sdk_secret_key
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

## 🦾 Powered by

<div align="center" style="display:flex;">
    <a href="https://www.mongodb.com/" target="_blank">
        <img alt="MongoDB" src="https://user-images.githubusercontent.com/67436391/179426484-d3fb357a-4702-4785-b0e1-7dc443923dab.jpeg" width="75" />
    </a>
    <a href="https://nodejs.org/en/" target="_blank">
        <img alt="NodeJS" src="https://user-images.githubusercontent.com/67436391/193464238-23ca291f-c8a6-40c6-b2bf-48e589487374.png" width="75" />
    </a>
    <a href="https://swagger.io/" target="_blank">
        <img alt="Swagger" src="https://avatars.githubusercontent.com/u/7658037?s=200&v=4" width="75" />
    </a>
    <a href="https://sequelize.org/" target="_blank">
        <img alt="Sequelize" src="https://avatars.githubusercontent.com/u/3591786?s=200&v=4" width="75" />
    </a>
</div>
