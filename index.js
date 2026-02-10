require('dotenv').config(); 

const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "manveer2063.be23@chitkara.edu.in";

app.locals.OFFICIAL_EMAIL = OFFICIAL_EMAIL; 


app.use(express.json({ }));

const healthRoute = require('./Routes/health');
const bfhlRoute  = require('./Routes/bfhl');

app.use(healthRoute);  
app.use(bfhlRoute);    

// Root route
app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

// Only listen locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

