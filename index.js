import express from 'express';
import router from './Routes/Todos.routes.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app=express();
const Port=process.env.PORT||3000;
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://abhinavlumenore2024:ABhi123@abhinavdb.axbmw.mongodb.net/?retryWrites=true&w=majority&appName=AbhinavDB')
.then(()=>console.log('connected successfully'))
.catch((err)=>console.log(err))

app.use('/api/todos',router);

app.listen(Port,()=>{ 
    console.log(`listening to port ${Port}`)    
})

