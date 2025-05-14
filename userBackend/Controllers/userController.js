import express from 'express';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const salt = bcrypt.genSaltSync(10);
import dotenv from 'dotenv';
dotenv.config();
import { tokenGenerator } from '../config/jwt.js';

// Post Register a new  User
export const registerUser = async(req,res)=>{
      const {email,password,username}  =req.body;
      const checkUser = await prisma.users.findFirst({
            where:{
                  email
            }
      })
      if(checkUser){
            res.json({
             status: 'Error',
            message: "the email is already exists"
            })
            return
      }
      if(!email || !password){
            res.json({
                  status: "Error",
                  message: "email or password was incorrect"
            })
            return
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newUser = await prisma.users.create({
            data:{
                  email,
                  username,
                  password: hashedPassword
            },
            select:{
                  username:true,
                  email: true,
                  password: true

            }
      });
      const token = tokenGenerator(newUser.userid);
      res.json({
            status: "Success Created a new user",
            users: {...newUser},
            token,
      })
};

// Post to login user Exist.
export const login = async(req,res)=>{
      const {email,  password} = req.body;
      if(!email || !password ){
            res.json({
                  status:"Error",
                  message: "Please enter your email or password"
            });
            return
      }
      const userExisting = await prisma.users.findFirst({
            where:{
                  email
            },
            select:{
                  userid: true,
                  username: true,
                  email: true,
                  password: true,
                  role: true
            }
      })
      if(!userExisting){
            res.json({
                  status:"Error",
                  message: "Fadlan Emailka ama Password ka mid ayaa qaldan"
            })
            return
      }
      const dehashedPassword = await bcrypt.compareSync(password,userExisting.password);
      if(dehashedPassword){
            const token = tokenGenerator(userExisting.userid)
            res.json({
                  status:'Success',
                  message: "You are now Logged",
                  token,
                  users: userExisting
            })
      }else{
            res.json({
                  status:'Error',
                  message: "Your are not Logged"
            })
      }
};

// Get All a Users

export const getAllUsers = async(req,res)=>{
      const users = await prisma.users.findMany();
      res.json({
            status: 'Success Gated All Users',
            users
      });
};

// Update User Role

export const updateUserRole = async(req,res)=>{
      const {id} = req.params;
      const {role} = req.body;
      const user = await prisma.users.findUnique({
            where: {
                  userid:+id
            },
      })
      if(user){
            const updateRole = await prisma.users.update({
                  where: {
                        userid: +id
                  },
                  data:{
                        role:role
                  }
            })
            if(updateRole){
                  return res.json({
                        message: `success Updated a role user: ${id}`
                  })
            }
            return res.json({
                  message: `error updating a role user`
            })
      }
};

// Find a User
export const findUser = async(req,res)=>{
      try {
       const {id} = req.params; 
       const user = await prisma.users.findFirst({
            where:{
                  userid:+id
            },
            select:{
                  email: true,
                  role: true,
                  userid:true
            }
       })
       res.json({
            message: "Success finding user",
            user
       })
      } catch (error) {
            res.json({
                  message: "Error finding user"
            })            
      }
    
};

// Delete a User
export const deleteUser = async(req,res)=>{
      try {
      const {id} = req.params;
      const user = await prisma.users.delete({
            where:{
                  userid:+id
            }
      });
      res.json({
            message: `Success Deleted on User: ${id}`
      })
      } catch (error) {
            res.json({
                  message:" Error Deleting a user"
            })
      }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        // Token-ka wuxuu ku jiraa req.user.user maadaama middleware-ka tokenGenerator uu ku shubay
        const userId = req.user.user;
        
        const userProfile = await prisma.users.findUnique({
            where: {
                userid: userId
            },
            select: {
                userid: true,
                username: true,
                email: true,
                role: true
                // Waxaad halkan ku dari kartaa columns kale oo aad rabto
            }
        });

        if (!userProfile) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'Success',
            user: userProfile
        });

    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Server error occurred'
        });
    }
};

// Get Current User (Me)
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.user; // Middleware-ka tokenGenerator ayaa ku shubay

        const currentUser = await prisma.users.findUnique({
            where: {
                userid: userId
            },
            select: {
                userid: true,
                username: true,
                email: true,
                role: true
            }
        });

        if (!currentUser) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'Success',
            user: currentUser
        });

    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Server error occurred'
        });
    }
};


