const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'socials' 
});

//conexion de prueba
connection.connect((errorcito)=>{
    if(errorcito){
        console.log('Error de conexión', errorcito.stack);
    }else{
        console.log('Conexión correcta con la db');   
    }
})

module.exports = connection;