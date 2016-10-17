# simpleWebApplication
simple web application using SEAN (Sequelize , Express , AngularJS , Nodejs)

#Pre Requisite
Make sure that you have database named "simple_app_db" in your postgres server.

#configuration of postgres:
     
 ```
var config = {

    secretKey: 'ssshhhh',

    port: 3060,

    database: {
        db_name: 'simple_app_db',
        db_user: 'postgres',
        db_password: 'postgres'
    },

    site: {
        url: 'localhost:3060'
    }

};
```
 to change anything related to Postgres DB , Edit the **index.**js file in **config** folder

# How to run this application ?

-  npm install
-  node server.js

# On Browser : 
- localhost:3060