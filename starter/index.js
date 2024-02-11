const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

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

//
// Synchronous code executed only once, when the machine starts
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //   const pathName = req.url;
  //   const pathName = req.url;

  // OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // PRODUCTS PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // FILE READ PAGE
  } else if (pathname == '/filec') {
    fs.readFile('./txt/output.txt', 'utf-8', (err, data) => {
      if (err) {
        console.error('ERROR:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      console.log(data + ' data');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });

    // API PAGE
  } else if (pathname === '/api') {
    // this code has been moved up to the top, for global access.
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    //     const productData = JSON.parse(data)

    //     res.writeHead(200, {
    //         'Content-type': 'application/json'
    //     })
    //     res.end(data)
    // });
    // res.end('API DATA')

    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // PAGE NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>No Page found for the URL.</h1>');
  }
});

// Use process.env.PORT or default to 3000
const port = process.env.PORT || 8000;

server.listen(port, '127.0.0.1', () => {
  console.log(`Running on PORT: ${port}`);
});

// ===========================================================
