const { createServer } = require("https");
const { createReadStream } = require("fs");
const { decode } = require("querystring");

const sendFile = (res, status, type, filePath) => {
  res.writeHead(status, { "Content-Type": type });
  createReadStream(filePath).pipe(res);
};

createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", data => {
      body += data;
    });
    req.on("end", () => {
      const { name, email, message } = decode(body);
      console.log(`${name} (${email}): ${message}`);
    });
  }

  switch (req.url) {
    case "/":
      return sendFile(res, 200, "text/html", "./index.html");
    case "/contact":
      return sendFile(res, 200, "text/html", "./contact.html");
    case "/img/alex-banks.jpeg":
      return sendFile(res, 200, "image/jpeg", "./alex-banks.jpeg");
    case "/styles.css":
      return sendFile(res, 200, "text/css", "./styles.css");
    default:
      return sendFile(res, 200, "text/html", "./404.html");
  }
}).listen(3000);

console.log("Hans Christian Zoll @ port 3000");
