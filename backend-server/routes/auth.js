const express = require("express");
const router = express.Router();
const path = require('path');
const conn = require("../db")
// const mockupDB = [
//     {
//         "username": "bleulenny",
//         "email": "aamog@my.bcit.ca",
//         "password": "123",
//         "firstName": "Alex",
//         "lastName": "Amog"
//     },
//     {
//         "username": "bryanxu",
//         "email": "xubryan123@gmail.com",
//         "password": "123",
//         "firstName": "Bryan",
//         "lastName": "Xu"
//     },
// ]

router.post("/auth", (req, res) => {
    const email = req.body.email;
    const passwd = req.body.password;
    console.log(req.body)
    conn.query("SELECT user_firstName, user_lastName, user_username FROM videousers WHERE user_email == ? AND user_password == ?", [email, passwd], (err, result) => {
        if (err) {
            res.send("Error. User does not exist.")
        }
        console.log(result);
        res.send(result);
        // return res.send({
        //     "token": "token_here",
        //     "profileInfo": {
        //         "firstName": acc.firstName,
        //         "lastName": acc.lastName,
        //         "username": acc.username
        //     }
        // });
    })
    // const sqlFind = "SELECT * FROM videousers WHERE 'User' = 'username' AND 'User_Password' = 'pass'"
    // db.query(sqlFind, [username, pass], (err, res)=>{
    //     if (err) throw err;
    //         console.log("User And/Or Password not found.")
    //     console.log("Login Sucessful.")
    // })
});


router.post("/login", (req, res) => {
    const email = req.body.email;
    const passwd = req.body.password;
})

//mock db login

// router.post("/login", (req, res, next) => {
//     console.log(req.body)
//     const email = req.body.email;
//     const passwd = req.body.password;
//     console.log(req.body)
//     mockupDB.filter((acc) => {
//         if (acc.email == email && acc.password == passwd) {
//             return res.send({
//                 "token": "token_here",
//                 "profileInfo": {
//                     "firstName": acc.firstName,
//                     "lastName": acc.lastName,
//                     "username": acc.username
//                 }
//             });
//         }
//     })
// });

module.exports = router;