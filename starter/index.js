const fs = require("fs");
// const { text } = require("stream/consumers");

const path = './txt/input.txt';


// Blocking Synchronous way.
const textIn = fs.readFileSync(path, "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
console.log(textOut);

fs.writeFileSync('./txt/output.txt', textOut);
console.log("File has been written!")

