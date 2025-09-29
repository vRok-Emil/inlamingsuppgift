import express, {Request, Response} from 'express';
import {User } from '../models/User';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register a new user 
router.post('/', async (request: Request, response: Response) => {
    try {
        const {username, email, password} = request.body;
        if (!username || !email || !password) {
            return response.status(400).json({message: 'Username, email and password are required'});
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return response.status(400).json({message: 'Invalid email format'});
        }
        // Hasha lösenordet innan det sparas
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword});
        await user.save();
        response.status(201).json(user);
    } catch (error) {
        response.status(500).json({message: 'Server error', error});
    }
});

// Get user by ID
router.get("/:id", async (req:Request, res:Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
});

// Update user by ID
router.put("/:id", async (req:Request, res:Response) => {
    try {
        const {username, email, password} = req.body;
        const update: any = {};
        if (username) update.username = username;
        if (email){
            if (!/\S+@\S+\.\S+/.test(email)){
                return res.status(400).json({message: 'Invalid email format'});
            }
            update.email = email;
        }
        // Om nytt lösenord skickas in, hasha det innan uppdatering
        if (password) {
            update.password = await bcrypt.hash(password, 10);
        }
        const user = await User.findByIdAndUpdate(req.params.id, update, {new: true});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
});

export default router;