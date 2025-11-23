const connection = require('../config/db');
const bcrypt = require('bcrypt');

class UsersController{

openFormRegister = (req, res) => {
res.render('register', {message: ""})
}

register = (req, res) => {

const {name, last_name, email, password, preferences} = req.body;
//validación simple para que no vengan datos vacíos

if(!name||!last_name||!email||!password||!preferences){
res.render("register", {message: "Debes cumplimentar todos los campos"});
}else if(!req.file){
res.render('register', {message:"Es obligatorio usar skin"})
}else{

//encriptar o hashear la contraseña para guardarla hasheada
bcrypt.hash(password, 10, (err, hash)=>{
if(err){
throw err
}else{
//guardo en db con la contraseña encriptada
let sql = `INSERT INTO user (name, last_name, email, password, preferences, image) 
VALUES (?,?,?,?,?,?)`  
let values = [name, last_name, email, hash, preferences, req.file.filename]

connection.query(sql, values, (err, result)=>{
if(err){
if(err.errno == 1062){
res.render('register', {message: "El email ya existe"})
}else{
throw err
}
}else{
res.redirect('/')
}
})                    
}
} );
}
}


addUser = (req, res) => {
let sql = 'SELECT * FROM user'

connection.query(sql, (err, result)=>{
if(err){
throw err;
}else{
console.log(result);
res.render('index', {thisUser: result});
}
});
};


openUser = (req, res) =>{
const {id} = req.params;

let sql = 'SELECT * FROM user WHERE id_user = ?';
let values = [id];

connection.query(sql, values, (err, result)=>{
if(err){
throw err;
}else{
let sqlUser = 'SELECT * FROM game WHERE id_user = ? AND game_deleted = 0';
let valuesUser = [id]
connection.query(sqlUser, valuesUser, (err2, resultGames)=>{
if(err2){
throw err2;
}else{
res.render("user", {thisUser: result[0], game: resultGames})
}
});
}
})
}

//Abre el formulario para editar un jugador
 openEditUser = (req, res) => {
      const {id_user} =req.params;
      let sql = 'SELECT * FROM user WHERE id_user = ?'
      let values = [id_user]
      connection.query(sql, values, (err, result)=>{
        if(err){
          throw err
        }else{
        res.render("editUser", {userEdited: result[0], message: ""})
        }
      })
  
    }
       

    editUser = (req, res) =>{
        const { name, last_name, email, preferences } = req.body;
        const {id_user} = req.params;
        if(!name||!last_name||!email||!preferences){
            let datosTemp = {
            name: name,
            last_name: last_name,
            email: email,
            preferences: preferences
            }
            res.render("editUser", {userEdited:datosTemp, message: "Debes cumplimentar todo el formulario"})
        }else{

            let sql = 'UPDATE user SET name=?, last_name=?, email=?, preferences=? WHERE id_user=?'
            let values = [ name, last_name, email, preferences, id_user ]
            
            connection.query(sql, values, (err, result)=>{
                if(err){
                    throw err;
                }else{
                    res.redirect(`/users/user/${id_user}`)
                }
            })
        }
    } 


    elimTotalUser = (req, res) => {
      const {id_user} = req.params
      let sql = 'DELETE FROM user WHERE id_user = ?'
      let values = [id_user]
      connection.query(sql, values, (err, result)=>{
        if(err){
          throw err
        }else{
          res.redirect(`/`)
        }
      })
    }

openAddGame = (req, res) => {
  const {userId} = req.params;
  res.render('addGame', { message: "", userId: userId });
}


addGame = (req, res) => {

const {userId} = req.params;
const {name, review, stars, platform, year_publication} = req.body
if(!userId||!name||!review||!stars||!platform||!year_publication){
res.render("addGame", {message:"Debes cumplimentar todo el formulario", userId: userId})
}else if(!req.file){
res.render('addGame', {message:"Es obligatorio poner imagen", userId: userId})
}
else{
let sql = 'INSERT INTO game (id_user, name, review, stars, platform, year_publication, image) VALUES (?,?,?,?,?,?,?)'
let values = [userId, name, review, stars, platform, year_publication, req.file.filename]
connection.query(sql, values, (err, result)=>{
if(err){
    throw err;
}else{
    res.redirect(`/users/user/${userId}`)
}
})
}
}

}




module.exports = new UsersController;