const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const proposalRoutes = require('./routes/proposalRoutes');

// Initialize the express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/proposalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Use the proposal routes
app.use('/api', proposalRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
