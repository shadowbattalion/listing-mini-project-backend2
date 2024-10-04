import { Router} from "express";
import { getList, uploadList } from "./handle";
import multer from 'multer'

//middleware using multer library to name and store the file in csvParser
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/csvParser/')
    },
    filename: function (req, file, cb) {
      
      cb(null, "data.csv")
    }
  })

const router = Router()
const upload = multer({storage:storage})

router.get('/get', getList)//for the List Page
router.post('/', upload.single('file'), uploadList)//for the file Upload Page




export default router