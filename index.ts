import ENV from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
/** Modules */
import Application from './server/application';

/** Setup Mongoose */
mongoose.connect('mongodb://root:rootpassword@localhost:27017/backend?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

/** Configuring app */
const PORT = 8000;
ENV.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
})

/** Setup HTTP server */
const server = http.createServer(Application);

/** Initiate server */
server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
