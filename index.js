#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const axios = require("axios");

clear();

console.log(
  chalk.yellow(
    figlet.textSync('Chupacabra', { horizontalLayout: 'full' })
  )
);
// console.log(
//     chalk.yellowBright(
//         figlet.textSync('V ' + pjson.version, { horizontalLayout: 'full' })
//     )
// );

const run = async () => {
  //console.log('runned')
};

run();

const yargs = require("yargs");

const options = yargs
    .usage("Usage: -u <url>")
    .option("u", { alias: "url", describe: "Target file URL", type: "string", demandOption: true })
    .option("p", { alias: "parallel", describe: "Number of parallel processes", type: "int"})
    .option("i", { alias: "interval", describe: "Execution interval time", type:"int"})
    .default('p', 3)
    .default("i", 1000)
    .argv;

const greeting = `Launching on target: ${options.url}
On intervals of: ${options.interval}
At ${options.parallel} simultaneous requests per execution`;

console.log(greeting);
var total_size = 0;
const download_image = (url, image_path = './dump/file1.gif') =>
    axios({
      url,
      responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                //console.log('size ' + response.headers['content-length']);
                //console.log('x-cache', response.headers['x-cache']);
              response.data
                  .pipe(fs.createWriteStream(image_path))
                  .on('finish', () => {
                      total_size += parseInt(response.headers['content-length']);
                      process.stdout.clearLine();
                      process.stdout.cursorTo(0);
                      process.stdout.write('Total downloaded size: ' + bytesToSize(total_size));
                      resolve()
                  })
                  .on('error', e => reject(e));
            }),
    );

const teste = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("tick");
            resolve();
        }, 5000);
    });
}

async function asyncRepeat (f, n) {
    //console.log('aqui');
     while (n-- > 0)
         await f
}

//console.log('Total size:' + total_size);
setInterval(function () {
    asyncRepeat(download_image(options.url), options.parallel)
}, options.interval);

//0,12 centavos de dolar por GB

     //
     // asyncRepeat(teste, 2).then(() => {
     //     console.log('done')
     // })

// let example_image_1 = download_image('https://images.unsplash.com/photo-1526666923127-b2970f64b422', './dump/teste1.jpeg');
//    download_image('http://127.0.0.1/api_uas_dinamicas_uploads/uploads/anexos/1570812272.705_15708122728bf363c4bc271e0166362bdffa9f50f49a771b9f.gif', './dump/teste2.gif');

//ifstat -bt
//tcptrack -i eth0


  //
  // console.log(example_image_1.status); // true
  // console.log(example_image_1.error); // ''


function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// function myFunc(arg) {
//   console.log(`arg was => ${arg}`);
// }
//
// setTimeout(myFunc, 1500, 'funky');

//https://www.npmjs.com/package/cli-table-redemption

// process.stdout.write("Hello, World");
// process.stdout.write("\n");
// process.stdout.cursorTo(10);
// process.stdout.write("asdasd");

//
// async.eachLimit(files, 1, function(file, callback) {
//   // ... Process 5 files at the same time
// }, function(err){
// });