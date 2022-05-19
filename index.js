const mongoose = require("mongoose")
// const port=process.env.PORT || 3000
// const MongoUrl = process.env.MONGO_URL
const config = require('./src/config/config');
const log = require('./src/config/logger');
const app = require('./app');
let server;


mongoose.connect(config.mongoose.url).then(() => {
    log.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
      log.info(`Listening to port ${config.port}`);
    });
});
