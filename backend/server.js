
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js'; 


const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(`${MONGO_URI}/userDB`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
   
  });

//built in middleware for parsing json 
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api', userRouter); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));