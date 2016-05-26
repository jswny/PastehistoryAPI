# PastehistoryAPI
The Pastehistory API is a rudementary API for [Pastehistory](https://github.com/jswny/pastehistory) which uses Node.js to interface with the SQL server of your implementation.

## Usage
At the moment, the API only supports `get` and `search`, remember to replace `localhost` and `1337` with the appropriate server and port that you have configured.

- `get` - Get a paste by it's ID
  - `http://localhost:1337/?cmd=get&id=<id>`
  - Returns a JSON object with the matching paste in its entirety including all fields.
- `search` - Search for pastes by keyword and return relevant data, supports multiple keywords seperated by spaces (yes I know this is dirty)
  - `http://localhost:1337/?cmd=search&keyword=<query>` 
  - Returns an array of pastes as JSON objects.

## Modules
Pastehistory uses the following modules to function.

1. `http` - Core Node module for handling HTTP requests. Pastehistory uses this module to perform basic request capturing and response handling.
2. `url` - Core Node module which is used to parse and decode urls and queries for processing.
3. `mysql` - NPM module used for accessing the SQL database.

## Test Environment
- CentOS 7
- Node 0.12
- NPM

## Installation

1. Configure the SQL connection by modifying the follwing block of code with the appropriate settings:
  
  ```
  var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'paste'
  });
  ```
2. Ensure that the server is configured to listen on the proper port:

  ```
  server.listen(1337);
  ```
3. Install the dependencies: `$ npm install`
4. Start the API server using the standard method: `$ npm start` or by using a process manager such as [forever](https://github.com/foreverjs/forever):
  1. `$ npm install -g forever`
  2. `$ forever start server.js`
