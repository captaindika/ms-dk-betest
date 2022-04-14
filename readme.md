## Installation on local

Clone master branch and make sure docker installed on your computer, clone this project and run:

```sh
cd directory project
run "docker-compose up -d --build"
```

## Installation on Heroku

Clone devheroku branch and make sure you already have heroku account. Create an app on heroku, you can see this [tutorial] how to deploy an app on heroku. Use [mongoDB-atlass] for free mongodb remote and [redislab] for free redis remote. Insert the environment variable on heroku.

[tutorial]: https://dev.to/ebereplenty/hosting-a-nodejs-and-mongodb-app-on-heroku-38b8
[mongodb-atlass]: https://www.mongodb.com/cloud/atlas/register2
[redislab]: https://redis.com/try-free/
