// const request = require("request");
// const cheerio = require("cheerio");
// const fs = require("fs");

// request(
//   "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard",
//   function (err, response, body) {
//     let data = cheerio.load(body);
//     let wteamName
//     let teamTable = data(
//       ".card.content-block.match-scorecard-table .Collapsible"
//     );
//     for (let index = 0; index < teamTable.length; index++) {
//       let hasClass = data(teamTable[index]).hasClass("team-gray");
//       if (hasClass == false) {
//         wteamName = data(teamTable[index]).find(".name");
//         let xyz =wteamName.text();
//         xyz = xyz.trim();
//         console.log(xyz);
//       }
//     }
//     // let htmlstr = "";
//     for (let i = 0; i < teamTable.length; i++) {
//       const singleTeamTable = teamTable[i];
//       let teamName = data(singleTeamTable).find(".header-title.label");
//       teamName = teamName.text();
//       // console.log(teamName);
//       teamName = teamName.split("INNINGS")[0];
//       teamName= teamName.trim();
//       // console.log(teamName);
//       if (teamName==wteamName) {
//         console.log(wteamName);
//       }
//       else{
//         console.log('hi');
        
//       }
      
//       // htmlstr+= data(singleTeamTable).html();
//     }
//     // console.log(htmlstr);
//     // fs.writeFileSync("webscraping/espnTable.html", htmlstr)
//   }
// );






const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
const chalk = require("chalk");
console.log("Before");
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}
function extractHTML(html) {
    let $ = cheerio.load(html);
    // full page search
    let teamsArr = $(".match-info.match-info-MATCH .team");
    let wTeamName;
    let lTeamName;
    for (let i = 0; i < teamsArr.length; i++) {
        let hasclass = $(teamsArr[i]).hasClass("team-gray");
        if (hasclass) {
            // find 
            let teamNameElem = $(teamsArr[i]).find(".name");
            lTeamName = teamNameElem.text().trim();
        }
        else{
          let teamNameElem = $(teamsArr[i]).find(".name");
            wTeamName = teamNameElem.text().trim();
        }
    }
    // segregate 
    // shorter form html
    let innigsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    // let htmlStr = "";
    for (let i = 0; i < innigsArr.length; i++) {
        // let cHtml = $(innigsArr[i]).html();
        // htmlStr += cHtml;
        // team names
        let teamNameElem = $(innigsArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        // team table
        // console.log(teamName);
        let hwtName = "";
        let hwt = 0;
        if (lTeamName == teamName) {
            // console.log(teamName);
            let tableElem = $(innigsArr[i]).find(".table.bowler");
            let allBowlers = $(tableElem).find("tr");
            for (let j = 0; j < allBowlers.length; j++) {
                let allColsOfPlayer = $(allBowlers[j]).find("td");
                let playerName = $(allColsOfPlayer[0]).text();
                let wickets = $(allColsOfPlayer[4]).text();
                if (wickets >= hwt) {
                    hwt = wickets;
                    hwtName = playerName;
                }
            }
            // console.log()
            console.log(chalk.green(`Winning Team : ${wTeamName}`))
            console.log(chalk.red(`loosing Team : ${lTeamName}`))
            console.log(chalk.yellow(`mostWicketTaker : ${hwtName}`))
            console.log(chalk.blue(`wickets : ${hwt}`))
        }


    }
    // console.log(htmlStr);

}