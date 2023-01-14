const mysql = require("mysql");
require("dotenv").config();
const {
  MYSQL_ADRESS,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_ACTUALITIES_TABLE,
  FIREBASE_SECRET_URL
} = process.env;

const MySqlEvents = require("@rodrigogs/mysql-events");

const admin = require("firebase-admin");
const serviceAccount = require(FIREBASE_SECRET_URL);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const program = async () =>{
    let connection = mysql.createConnection({
        host: MYSQL_ADRESS,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD
    });

    const instance = new MySqlEvents(connection,{
        startAtEnd: true,
        excludedSchemas: {
            mysql: true
        }
    })

    await instance.start();

    instance.addTrigger({
        name: 'events for tblactualites',
        expression: MYSQL_DATABASE+"."+MYSQL_ACTUALITIES_TABLE,
        statement: MySqlEvents.STATEMENTS.INSERT,
        onEvent: (event) => { // You will receive the events here

            const actuInfo = event.affectedRows[0].after;

            const message_notification = {
                notification: {
                    title: actuInfo.actTitre,
                    body: actuInfo.actTexte
                }
            }

            let actuType = "";
            let notification_options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            }

            switch (actuInfo.actType) {
                case 1:
                    actuType = "alerte"
                    break;
                case 2:
                    actuType = "simple"
                    break;
                case 3:
                    actuType = "future"
                    break;
                case 4:
                    actuType = "agility"
                    break;
                default:
                    actuType = "dev"
                    break;
            }
            
            admin.messaging().sendToTopic(actuType, message_notification, notification_options)
                .then((response) => {
                    console.log("Successfully sent firebase message:", response);
                })
                .catch((error) => {
                    console.log("Error sending firebase message:", error);
                });
        }
      });
      
    instance.on(MySqlEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySqlEvents.EVENTS.ZONGJI_ERROR, console.error);
}

module.exports = program;