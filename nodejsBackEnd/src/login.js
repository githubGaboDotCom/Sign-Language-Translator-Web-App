import express from 'express';
import { mysqlDB } from './mysqlDB.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const login = express.Router();
var transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
});

transport.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Transporter is now ready for messages");
        console.log(success);
    }
});

login.post("/SignUp", (req, res) => {
    const queryUserDB = "SELECT * FROM users WHERE username = ? OR email = ?";
    mysqlDB.query(queryUserDB, [req.body.username, req.body.email], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length){
            return res.status(409).json("Error: User account already exists!");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO users(`username`, `password`, `email`, `firstname`, `lastname`) VALUES (?)";
        const values = [req.body.username, hashedPassword, req.body.email, req.body.firstname, req.body.lastname];
        mysqlDB.query(insertQuery, [values], (err, data) => {
            if (err) {
                return res.json(err);
            }else {
                return res.status(200).json("User account has been successfully created!");
            }
        });
    });
});

login.post("/SignIn", (req, res) => {
    const queryUsernameDB = "SELECT * FROM users WHERE username = ?";
    mysqlDB.query(queryUsernameDB, [req.body.username], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length === 0){
            return res.status(404).json("Error: User account not found!");
        }

        const checkedPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if(!checkedPassword){
            return res.status(400).json("Error: Incorrect username or password");
        }
    
        const accessToken = jwt.sign({id:data[0].idusers}, process.env.SECRET_ACCESS_TOKEN);
        const {password, ...userInformation} = data[0];
        res.cookie("accessTokenCookie", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }).status(200).json(userInformation);

    });
});

login.post("/logout", (req, res) => {
    res.clearCookie("accessTokenCookie", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has logged out from browser session!");
});

login.post("/forgotPassword", (req, res) => {
    const queryEmailDB = "SELECT * FROM users WHERE email = ?";
    mysqlDB.query(queryEmailDB, [req.body.email], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length === 0){
            return res.json({status: "ok"});
        }
    
        const emailToken = jwt.sign({id: data[0].idusers, email: data[0].email}, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: "5m",
        });

        const resetLink = `http://localhost:3000/ResetPassword/${data[0].idusers}/${emailToken}`;
        
        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: data[0].email,
            subject: 'Password Reset Link',
            text: 'To reset your password, please click the link below.\n\n' + 
            resetLink + '\n\n' + 'Thank you!' 
        };

        transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });  

    });
    
    res.status(200).json("Email has been sent!");
});


login.post("/ResetPassword", async (req, res) => {
    const queryUserIDDB = "SELECT * FROM users WHERE idusers = ?";
    mysqlDB.query(queryUserIDDB, [req.body.id], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length === 0){
            return res.status(404).json("Error: User id not found");
        }
    
        try {
            const verifyResetLink = jwt.verify(req.body.token, process.env.SECRET_ACCESS_TOKEN);
            res.status(200).json("Token has been verified!");
        }catch (error) {
            return res.status(404).json("Error: Token is invalid");
        }

    }); 
});


login.post("/changePassword", (req, res) => {
    const queryUserIDDB = "SELECT * FROM users WHERE idusers = ?";
    mysqlDB.query(queryUserIDDB, [req.body[1].id], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length === 0){
            return res.status(404).json("Error: User ID not found!");
        }

        const newsalt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(req.body[0].password, newsalt);
       
        const updateQuery = "UPDATE users SET password = ? WHERE idusers = ?";

        mysqlDB.query(updateQuery, [hashedNewPassword, req.body[1].id], (err, data) => {
            if (err) {
                return res.json(err);
            }else {
                return res.status(200).json("Password has been updated!");
            }
        });

    });
});

login.post("/SendEmail", async (req, res) => {
    const queryUserDB2 = "SELECT * FROM users WHERE username = ?";
    mysqlDB.query(queryUserDB2, [req.body.username], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length === 0){
            return res.status(404).json("Error: Username not found");
        }
    
        var sendEmailOptions = {
            from: process.env.EMAIL_USER,
            to: data[0].email,
            subject: req.body.messagetitle,
            text: req.body.message 
        };

        transport.sendMail(sendEmailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); 
        
        res.status(200).json("Email has been sent for feature to send message!");

    }); 
});


export default login;