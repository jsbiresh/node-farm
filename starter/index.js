const fs = require("fs");
const http = require('http')

// =======================================================================================================

// const { text } = require("stream/consumers");

// const path = './txt/input.txt';
// // Blocking Synchronous way.
// const textIn = fs.readFileSync(path, "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// console.log(textOut);

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File has been written!")

// console.log("--------------------------------------------------")

// // Non-Blocking Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err1, data1) => {
//     if (err1) return console.log("ERROR!")
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err2, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err3, data3) => {
//             // console.log(`${data2}. \n${data3}`)
//             // console.log(data3)
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("File Reading and Writing completed.")
//             })
//         })
//     })
    
//     // if (err) {
//     //     console.log(`${err}, Found Error.` )
//     //     return
//     // }
//     // console.log(data1)
// })

// console.log('will read file')

// =======================================================================================================

// http SERVER
const server = http.createServer( (req, res) => {
    console.log(req)
    res.end("A request reached the server, and this is a response to that request.")
})

// Use process.env.PORT or default to 3000
const port = process.env.PORT || 8000;

server.listen(port, '127.0.0.1', () => {
    console.log(`Running on PORT: ${port}`)
})