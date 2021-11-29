/**
* This file calculates P-value for given data using jstat library.
*/

import { jStat } from 'jstat';
import * as constant from '../common/constants';
import helper from '../common/helper';
const fs = require('fs');


export default {
    /**
     * This function creates arrays for a given metric ("score") for both tags
     * and calculate the p-value of ttest.
     * The results can be found in testResult.txt file
     */
    async runTtest() {
        let tagData1 = await helper.readCsvFile(constant.TAG1);
        let tagData2 = await helper.readCsvFile(constant.TAG2);
        fs.writeFile(__dirname + '/testResult.txt', `**** P-Value for "score" ****` + "\r\n", function (err) {
            if (err) return console.log(err);
        });
        let array1 = await helper.createArray(tagData1, constant.METRIC1);
        let array2 = await helper.createArray(tagData2, constant.METRIC1);
        const pValue = jStat.anovaftest(array1, array2);
        fs.appendFile(__dirname + '/testResult.txt', `>>P-Value of ${constant.METRIC1} : ` + pValue + "\r\n", function (err) {
            if (err) return console.log(err);
        });
    }
}
