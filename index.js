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


try {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
    } else {
      console.error('Server error:', error);
    }
    process.exit(1);
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}

