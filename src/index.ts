import express from 'express'
import list from './routes/list'
import cors from 'cors'

const app = express()



app.use(cors())
app.use('/api/list', list)




const PORT = 9000

app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})