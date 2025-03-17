const express = require("express");
const router = express.Router();
const z = require("zod");
const { UserModel, AccountModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.post("/signup", async (req, res) => {
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await UserModel.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "User already exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 5);

    const user = await UserModel.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    if(!user){
        return res.status(411).json({
            message: "Error while signing up!"
        })
    }

    const account = await AccountModel.create({
        userId: user._id,
        balance: 1 + Math.floor(Math.random()*10000)
    })

    res.status(200).json({
        message: "User signed up successfully!"
    })
})

router.post("/signin", async (req,res) => {
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Invalid inputs!"
        })
    }


    const existingUser = await UserModel.findOne({
        username: req.body.username
    })


    if(!existingUser){
        return res.status(411).json({
            message: "User does not exist!"
        })
    }

    const checkPassword = await bcrypt.compare(req.body.password, existingUser.password);

    if(!checkPassword){
        return res.status(411).json({
            message: "Incorrect password!"
        })
    }


    const token = await jwt.sign({
        userId: existingUser._id
    }, JWT_SECRET);

    res.status(200).json({
        message: "USer signed in successfully!",
        token: token
    })
})

router.get("/me", authMiddleware, async (req, res)=>{
    const userId = req.userId;

    const user = await UserModel.findOne({
        _id: userId
    })

    if(!user){
        return res.status(411).json({
            message: "Error"
        })
    }

    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
    })
})

router.put("/", authMiddleware, async (req,res)=>{
    const success = await updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Invalid inputs!"
        })
    }

    await UserModel.updateOne({
        _id: req.userId
    },req.body)

    res.status(200).json({
        message: "Updated successfully!"
    })
})

router.get("/bulk", authMiddleware, async (req,res) => {
    const filter = req.query.filter;

    const users = await UserModel.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i"
            }
        },
        {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }
        ],
        _id: { $ne: req.userId } // Exclude the user itself
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router

