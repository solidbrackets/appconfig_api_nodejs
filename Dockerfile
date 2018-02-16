FROM node:argon


RUN npm config set -g production false

WORKDIR /app

EXPOSE 3000

CMD ["node_modules/.bin/nodemon --exec \"node_modules/.bin/serverless serve start  \""]