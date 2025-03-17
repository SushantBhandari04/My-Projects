import express, {Request, Response} from "express"
import { ContentModel, LinkModel, UserModel } from "./db";
import {z} from "zod";
import path from "path";
const app = express();
app.use(express.json());
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import  UserMiddleware from "./middleware";
import { generateHash } from "./utils";
import cors from "cors";
import fs from "fs"
app.use(cors());

const UserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*(),.?":{}|<>]/)
})

app.post("/api/v1/signup", async (req:Request,res:Response)=>{
    try{
        const parsedData = UserSchema.safeParse(req.body);

        if(parsedData.error){
            res.status(403).json({
                message: "Invalid credentials!"
            })
            return;
        }

        const {username, password} = parsedData.data;

        const user = await UserModel.findOne({username});

        if(user){
            res.status(403).json({
                message: "User already exists."
            })
        }
        else{
            await UserModel.create({
                username,
                password
            })
            res.status(200).json({
                message: "Succesfully signed up."
            })
        }
    }
    catch(e){
        res.status(411).json({
            message: "Invalid credentials!"
        })
    }
})


app.post("/api/v1/signin", async (req:Request,res:Response)=>{
    try{
        const parsedData = UserSchema.parse(req.body);
        const {username, password} = parsedData;

        const user = await UserModel.findOne({username, password});

        if(user){
            const token = jwt.sign({
                username,
                password
            },JWT_SECRET);

            res.status(200).json({
                token: token,
                message: "Succesfully signed in."
            })
        }
        else{
            res.status(403).json({
                message: "User does not exist!"
            })
        }
    }
    catch(e){
        res.status(411).json({
            message: "Invalid credentials!"
        })
    }
})


app.post("/api/v1/content", UserMiddleware, async (req:Request,res:Response)=>{
    const user = req.user;

    console.log("Request came");

    const userId = user._id;
    const {link, type, title} = req.body;

    try{
        const newContent = await ContentModel.create({
            link,
            type,
            title,
            userId
        })
    
    
        res.status(200).json({
            message: "Content added successfully.",
            content: newContent
        })
    }
    catch(e){
        console.error("error");
        res.status(500).json({
            message: "Error",
            
        })
    }
    
   
})


app.get("/api/v1/content", UserMiddleware, async (req:Request,res:Response)=>{
    const user = req.user;
    const userId = user._id;

    const content = await ContentModel.find({userId}).populate({
        path: "userId",
        select: "username"
    });

    if(content){
        res.status(200).json({
            content
        })
    }
    else{
        res.status(403).json({
            message: "No content present."
        })
    }  
})


app.delete("/api/v1/content", UserMiddleware, async (req: Request,res: Response)=>{
    const user = req.user;
    const userId = user._id;
    const contentId = req.body.id;

    const content = await ContentModel.find({userId, _id:contentId});

    if(!content){
        res.status(403).json({
            message: "No content present."
        })
    }
    else{
        await ContentModel.deleteMany({userId, _id:contentId});
        res.status(200).json({
            message: "Content deleted successfully."
        })
    }
})


app.post("/api/v1/brain/share", UserMiddleware, async (req,res)=>{
    const user = req.user;
    const userId = user._id;

    const share = req.body.share;

    if(share){
        try{
            const link = await LinkModel.findOne({userId});

            if(link){
                res.status(200).json({
                    hash : link.hash
                })
                return;
            }
            else{
                const hash = generateHash(10);
                await LinkModel.create({
                    hash,
                    userId
                })
                res.status(200).json({
                    hash: hash
                })
            }
        }
        catch(e){
            console.log("Error");
        }
        
    }
    else{
        const link = await LinkModel.findOne({userId});

        if(link){
            await LinkModel.deleteOne({userId});
        }

        res.status(200).json({
            message: "Sharing stopped successfully."
        })
    }
})


app.get("/api/v1/brain/:shareLink", async (req,res)=>{
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({hash});

    if(!link){
        res.status(411).json({
            message: "No such brain found."
        })
        return;
    }

    const userId = link.userId;

    const contents = await ContentModel.find({userId});

    res.status(200).json({
        contents
    })

})

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

import uploadRouter from "./routes/upload"; // Import upload route

// API Routes
app.use("/api/v1/upload", uploadRouter); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000);