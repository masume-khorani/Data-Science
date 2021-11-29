/**
* In this file the Stackoverflow API is called for each tag and 
* then CSV files are made and save in src/csvFiles folder.
*/

import axios from 'axios';
const fs = require('fs');
/* constants file includes all global constants */
import * as constant from '../common/constants';

export default {
  
    /**
     * This function calls stackoverflow API and receives data
     * and add them to the CSV file for each page
     * @param  {string} tagName
     * @param  {string} fileName the name of the csv file for this tagName
     */
    callapi(tagName, fileName) {
        var page = 0;
        var csvContent = "";
        var hasMore = true;
        async function getData() {
            page++
            csvContent = "";
            await axios.get(
                `${constant.API_ROOt}/questions?page=${page}&pagesize=100&fromdate=1609459200&todate=1625097600&order=desc&sort=activity&tagged=${tagName}&site=stackoverflow`
            ).then(res => {
                let data = res.data;
                hasMore = data.has_more;
                data.items.forEach(function (rowArray, index) {
                    let row = ((page - 1) * 100) + index + 1 + ","
                        + tagName + ','
                        + rowArray.question_id + ","
                        + rowArray.score + ","
                        + (rowArray.owner.reputation !== undefined ? rowArray.owner.reputation : 0) + ","
                        + (rowArray.owner.accept_rate !== undefined ? rowArray.owner.accept_rate : 0) + ","
                        + rowArray.answer_count + ","
                        + (rowArray.is_answered === true ? 1 : 0) + ",";
                    csvContent += row + "\r\n";
                    console.log(csvContent + "++" + page + "++" + hasMore)
                })
                fs.appendFile(__dirname + '/' + fileName, csvContent, function (err) {
                    if (err) return console.log(err);
                });
                if (hasMore) {
                    getData()
                } else {
                    return
                }
            }).catch(err => { console.log(err.data.error_message) })
        }
        return getData;
    },
    
    /**
     * This function creates cvs files for both tags.
     */
    createCSV() {
        let csvContent = "row" + "," + "tag" + ","
            + constant.IDENTIFIER + "," + constant.METRIC1 + ","
            + constant.METRIC2 + "," + constant.METRIC3 + ","
            + constant.METRIC4 + "," + constant.METRIC5
            + "\r\n";
        fs.writeFile(`${__dirname}/${constant.TAG1}.csv`, csvContent, function (err) {
            if (err) return console.log(err);
        });
        fs.writeFile(`${__dirname}/${constant.TAG2}.csv`, csvContent, function (err) {
            if (err) return console.log(err);
        });
        var tagData1 = this.callapi(constant.TAG1, `${constant.TAG1}.csv`);
        var tagData2 = this.callapi(constant.TAG2, `${constant.TAG2}.csv`);
        tagData1();
        tagData2();
    }
}
