const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");
const figlet = require("figlet");
// feature -> request
console.log("Before");
request(
  "https://www.espncricinfo.com/series/india-women-tour-of-england-2021-1260086/england-women-vs-india-women-only-test-1260093/ball-by-ball-commentary",
  cb
);

console.log("After");
function cb(error, response, html) {
  if (error) {
    console.error("error:", error); // Print the error if one occurred
  } else {
    handlehtml(html);
    // Print the HTML for the Google homepage.
  }
}
function handlehtml(html) {
  let selTool = cheerio.load(html);
  // let h1s = selTool("h1");
  let contentArr = selTool(".match-comment-wrapper p");
  let contentArrshort = selTool(".match-comment-short-text span");
  // [i] -> wrap selTool
  for (let i = 0; i < contentArr.length; i++) {
    let data = selTool(contentArr[i]).text();
    console.log("data", data);
  }
  // let total = selTool(contentArr[0]).text();
  // console.log(total);

  //   console.log(chalk.blue(selTool(contentArrshort[0]).text() ));
  //   console.log(chalk.blue(selTool(contentArr[0]).text() ));

  // let deaths = selTool(contentArr[1]).text();
  // let recovered = selTool(contentArr[2]).text();
  // // console.log(h1s.length);
  // console.log(chalk.red(figlet.textSync("last ball : "+total)));
  // console.log(chalk.red("Deaths: "+deaths));
  // console.log(chalk.green("Recovery : "+recovered));
}
