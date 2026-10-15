import express from "express"
import {addUser,getUser,getSingleUser,deleteUSer} from "../controller/userDataController.js"
import upload from "../utils/uploadMiddleware.js"

const router = express.Router()

router.post('/api/add-user',upload.single('image'),addUser)
router.post('/api/add-user',addUser)
router.get('/api/get-user',getUser)
router.get('/api/get-singleuser/:uid',getSingleUser)
router.delete('/api/delete-user/:uid',deleteUSer)


export default router