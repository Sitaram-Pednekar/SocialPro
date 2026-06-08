import app from './app.js';

import PORT from './src/config/config.js';

import runDB from './src/config/db.config.js';

const serverPort = PORT || 5000;

await runDB();

app.listen(serverPort , ()=>{
    console.log(`The server is running on ${serverPort}`);
})