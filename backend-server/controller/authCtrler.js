const conn = require("../db");

const authController = {
    register: (req, res) => {
        //check if user exists
        const lookForUser = "SELECT * FROM videousers WHERE user_email = ? OR user_username = ?";

        conn.query(lookForUser, [res.body.email], (err, result) => {
            if (err) return res.json(err);
            if (result.length) return res.json("This user already exists.");

            //create user if does not exist
            const createUser = "INSERT INTO videousers(`user_email`, `user_username`, `user_password`, `user_firstName`, `user_lastName`) VALUES (?)"
            const userValues = [req.body.email, req.body.username, req.body.password, req.body.firstName, req.body.lastName];
            conn.query(createUser, [userValues], (err, result) => {
                if (err) return res.json(err);
                return res.json("User has been created.")
            });
        });

    },

    login: (req, res) => {
        //check user
        const getUser = "SELECT user_username, user_firstName, user_lastName FROM videousers WHERE user_email = ? AND user_password = ?";
        const userEmail = req.body.email;
        const userPW = req.body.password;
        conn.query(getUser, [userEmail, userPW], (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send({
                "token": "token_here",
                "profileInfo": {
                    "firstName": result[0].user_username,
                    "lastName": result[0].user_firstname,
                    "username": result[0].user_lastName
                }
            })
        })
    }
};

module.exports = authController;