const { faker } = require('@faker-js/faker');

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "#Class620"
});

try{
  connection.query ("show tables",(err, result)=>{
    if(err){
      throw err;
    }
      console.log(result);
  });

}
catch(err){
  console.log(err);
}

connection.end();

let  createRandomUser= ()=> {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

// console.log(createRandomUser());
