require('dotenv').config();
const jwt = require('jsonwebtoken');
const sqlite = require('../helper/dbHelper.js');

const connectionString = '../studyHelper_db.db';

const sqlQueries = {
  GET_USER_BY_EMAIL: 'SELECT * FROM Users WHERE Email = ?'
}

  class AuthController {

    async signIn (req, res) {
      const userInfo = req.body;
      console.log(req.body);
      
      sqlite.open(connectionString);
      const row = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [userInfo.email]);


      if(row.Password === userInfo.password) {
        const accessToken = jwt.sign(userInfo.email, process.env.ACCESS_TOKEN_SECRETE);
        return res.json({token: accessToken});
        console.log('done');
      }

      return res.json({message: "email or password not correct"});
      sqlite.close();
  } 
  

}

module.exports = new AuthController();

