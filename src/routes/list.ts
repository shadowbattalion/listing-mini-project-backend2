import { Router} from "express";
import { getList, uploadList } from "./handle";
import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, "data.csv")
    }
  })

const router = Router()
const upload = multer({storage:storage})

router.get('/get', getList)
router.post('/', upload.single('file'), uploadList)




export default router