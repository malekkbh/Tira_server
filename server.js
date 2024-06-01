const http = require("http");
const app = require("./App");

const port = process.env.PORT || 8000;
const server = http.createServer(app);

app.listen(port)

module.exports = server;