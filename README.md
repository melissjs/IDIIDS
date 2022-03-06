NODE ::::::::::::::::::::::::::::::::::::::::::::::::::::
cd into idiids
nvm use v15.14.0 (only version supporting server and client both)
start mongod in one terminal (run mongod)
npm run dev to start both
 
MONGO ::::::::::::::::::::::::::::::::::::::::::::::::::::
run mongod (this before running server)
run mongo (mongo for shell)

notes for mongo db https://www.youtube.com/watch?v=pWbMrx5rVBE
commands https://docs.mongodb.com/manual/reference/mongo-shell/
brew services start mongodb-community@5.0
brew services stop mongodb-community@5.0
mongo
use idiid
show dbs
show collections
db.tasks.find()

NVM ::::::::::::::::::::::::::::::::::::::::::::::::::::
node -v
nvm ls

SERVER ::::::::::::::::::::::::::::::::::::::::::::::::::::
npm run server (idiids)

CLIENT ::::::::::::::::::::::::::::::::::::::::::::::::::::
cd client
npm run serve (idiids)

package.json
  "dev": "concurrently --names \"server,idiid\" \"npm run server --silent\" \"npm run client --silent\""
  "client": "cd idiid && npm run serve",
