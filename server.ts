export {};
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect DB
connectDB();

// initialize Middleware
app.use(express.json({ extended: false }));

app.get('/', (req: any, res: any) => res.send('API runnning '));

// Routes

app.use('/api/users', require('./router/api/users'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/profile', require('./router/api/profile'));
// app.use('/api/posts', require('./router/api/posts'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is running on port ' + port));
