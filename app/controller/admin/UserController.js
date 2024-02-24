const superuser = require('../../models/User')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserService = require('../../services/UserService')
const frontenduser = require('../../models/FrontendUser')
const jwt = require('../../../config/common'); // Assuming you have a common.js file with JWT functionality
const { jwtSign } = require ('../../../config/common')



//  This is the function to register the super user (admin) in the backend.
exports.superUserRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body; 

        const existingUser = await superuser.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        } else {
            const newUser = new superuser({
                firstName,
                lastName,
                email,
                password,
            });

            await newUser.save(); 
            // return res.status(200).json({
            //     data: newUser,
            //     message: 'Super User Registered Successfully',
            // });
            return res.redirect('/user-login.html')
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


// // This is the function to login the superuser (admin) in the backend.
// exports.superUserLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required.' });
//         }

//         try {
//             const superusers = await superuser.findOne({ email });

//             if (!superusers) {
//                 return res.status(404).json({ message: 'User not found.' });
//             }

//             if (superusers.password === password) {
//                 // Passwords match - Successful login
//                 return res.redirect('/dashboard.html');
//             } else {
//                 // Incorrect password
//                 return res.status(401).json({ message: 'Incorrect password.' });
//             }
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'Internal server error.' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

exports.superUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
            const superusers = await superuser.findOne({ email });

            if (!superusers) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (superusers.password === password) {
                // Passwords match - Successful login

                // Create JWT token
                const token = await jwtSign(superusers._id, superusers.user_type);

                superusers.token = token;
                await superusers.save();

                console.log('Generated Token:', token);

                // Include the token in the response
                return res.status(200).json({ message: 'Login successful', token });
                
            

            } else {
                // Incorrect password
                return res.status(401).json({ message: 'Incorrect password.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};



exports.superUserLogout = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ message: 'Email is required for logout.' });
    }

    try {
        // Find the user by email
        const superuserDoc = await superuser.findOne({ email });

        if (!superuserDoc) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update the token field to null
        superuserDoc.token = null;
        await superuserDoc.save();

        // Send an instruction to the client to clear the token
        res.status(200).json({ message: 'Logout successful', token: null });

        // Log a message on the server side
        console.log(`User with email ${email} logged out.`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


exports.GetUsersBackend = async (req, res) => {
    try {
        const allUsers = await superuser.find().sort({ createdAt: -1 });
        res.status(200).json({ allUsers });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.Countsuperuser = async (req,res) =>{
    try{
const count = await superuser.countDocuments();
res.status(200).json({count});
    }catch (error){
      res.status(500).json({error: error.message})

    }
  };




