import userData from '../model/user.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/jwtutils.js'
import cloudinary from '../config/cloudinary.js'

const uploadToCloudinary=(buffer)=>{
    return new Promise((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
            {folder:'mscit_users'},
            (error,result)=>{
                if(error)return reject(error)
                resolve(result)
            }
        )
        stream.end(buffer)
    })
}

export const addUser = async (req,res) => {
    try {
        const password = await bcrypt.hash(req.body.password,10)
        let imageUrl=""
        if(req.file){
            const result=await uploadToCloudinary(req.file.buffer)
            imageUrl=result.secure_url
        }
       const userDataval = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            password:password,
            image:imageUrl
       }
       const saveUSerData = await userData.create(userDataval)
        res.status(200).json({message:"user added successflly",data:saveUSerData})
    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getUser = async (req,res) => {
    try {
        const getuserData = await userData.find()
        res.status(200).json({message:"user get successfulyy",data:getuserData})
    } catch(error) {
        res.status(500).json({errorMessage:error.message})
    }

}

export const getSingleUser = async (req,res) =>{
    try{
        const id = req.params.uid
        const getsingleUserdata = await userData.findById(id)
        res.status(200).json({message:"user get successfully",data:getsingleUserdata})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const deleteUSer = async (req,res) => {
    try{
        const id = req.params.uid
        const deleteuserData = await userData.findByIdAndDelete(id)
        res.status(200).json({message:"user deleted successfully",data:deleteuserData})

    }catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const updateuserData = async(req,req) => {
    try{
    const updateuserData = await userData.findByIdAndUpdate(id,saveuserData,{
        new:true,
        runVailidators:true
    })
    res.status(200).json({"message":"User Update Successfully",data:updateUserData})


    }catch(error) {
        res.status(500).json({"message":error.message})
    }

}

export const loginUser = async (req,req) => {
    try{
        const uData = await userData.findOne({email:req.body.email})
        if(!uData) {
            return res.status(200).json({message:"User Not Found",status:0})
        }

        const comparePassword = await bcrypt.compare(req.body//baki)
    }
}

