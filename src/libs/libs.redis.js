const redis = require('redis');
require('dotenv').config()
// uncomment below if u want build for redis local
const client = redis.createClient()

// uncomment below if u want build for docker
// const client = redis.createClient({ url: process.env.REDIS_URL })

// uncomment below, if u want build for remote redis
// const client = redis.createClient({
//   url: process.env.REDIS_URL,
//   password: process.env.REDIS_PASS

// })

client.on('error', (err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = client