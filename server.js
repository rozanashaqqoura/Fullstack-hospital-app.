require('dotenv').config();            // لازم أول سطر
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');


const app = express();




// Connect to MongoDB
connectDB();
PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));



// Import routes
app.use('/api/user' , require('./router/userRouter'));
app.use('/api/doctor' , require('./router/doctorRouter'))
app.use('/files' ,  express.static(path.join(__dirname, '..', 'uploads')))
app.use('/api/appointment' , require('./router/appointmentRouter'))
app.use('/api/department' , require('./router/departmentRouter'))
app.use('/api/stats', require('./router/statsRoutes'));

// global error handler (JSON!)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Server error',
  });
});



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});