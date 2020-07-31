export {};
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const app = express();

//Connect DB
connectDB();
app.use(cors());

// initialize Middleware
app.use(express.json({ extended: false }));

app.get('/', (req: any, res: any) => res.send('API running '));

// Routes

app.use('/api/users', require('./router/api/users'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/profile', require('./router/api/profile'));
app.use('/api/posts', require('./router/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is running on port ' + port));
