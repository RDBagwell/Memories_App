import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userModel from '../models/user.js'

export const signin = async (req, res)=>{
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({email: email});

        if(!existingUser) return res.status(404).json({message: "User can not be found."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(403).json({message: "Please check credentials."})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: '1h'});

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({error});        
    }
}

export const signup = async (req, res)=>{
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    
    try {
        const existingUser = await userModel.findOne({email: email});

        if(existingUser) return res.status(400).json({message: "User already exists."});

        if(password !== confirmPassword) return res.status(400).json({error: "Password dose not match Repeat Password."})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: '1h'});

        res.status(200).json({result, token});        
    
    } catch (error) {
        res.status(500).json({error: "Something whent wrong in sighnup"});  
    }
    
}