/**
* This file calculates t-test and Mann-Whitney U test for given data.
*/

import { jStat } from 'jstat';
import * as constant from '../common/constants';
import helper from '../common/helper';
const fs = require('fs');
var mwu = require('mann-whitney-utest');


export default {
    /**
     * This function creates arrays for "score" and "accept rate" metrics for both tags
     * and calculate the p-value of ttest and U-values for Mann-Whitney tests.
     * The results can be found in testResult.txt file
     */
    async runStatisticalTests() {
        let wordpressData = await helper.readCsvFile(constant.TAG1);
        let drupalData = await helper.readCsvFile(constant.TAG2);
        fs.writeFile(__dirname + '/testResult.txt',
            `**** t-test and Mann-whitney U test results ****` + "\r\n" + "\r\n",
            function (err) {
                if (err) return console.log(err);
            });
        let scoreArrayWorpress = await helper.createArray(wordpressData, constant.METRIC1);
        let scoreArrayDrupal = await helper.createArray(drupalData, constant.METRIC1);

        let acceptRateArrayWordpress = await helper.createArray(wordpressData, constant.METRIC3);
        let acceptRateArrayDrupal = await helper.createArray(drupalData, constant.METRIC3);

        // t-test for score metric
        const tTestPValue = jStat.anovaftest(scoreArrayWorpress, scoreArrayDrupal);
        let ttestExplanation = "";
        if (tTestPValue <= 0.05) {
            ttestExplanation = "There is a significant difference between the two samples"
        } else {
            ttestExplanation = "There is no significant difference between the two samples"
        }

        //Mann-Whitney U test for score metric
        var mannWhitneyUScore = mwu.test([scoreArrayWorpress, scoreArrayDrupal]);
        let mannWhitneyUScoreExplanation = "";
        if (mwu.significant(mannWhitneyUScore, [scoreArrayWorpress, scoreArrayDrupal])) {
            mannWhitneyUScoreExplanation = "There is a significant difference between the two samples"
        } else {
            mannWhitneyUScoreExplanation = "There is no significant difference between the two samples"
        }

        //Mann-Whitney U test for accept rate metric
        var mannWhitneyURate = mwu.test([acceptRateArrayWordpress, acceptRateArrayDrupal]);
        let mannWhitneyURateExplanation = "";
        if (mwu.significant(mannWhitneyURate, [acceptRateArrayWordpress, acceptRateArrayDrupal])) {
            mannWhitneyURateExplanation = "There is a significant difference between the two samples"
        } else {
            mannWhitneyURateExplanation = "There is no significant difference between the two samples"
        }

        fs.appendFile(__dirname + '/testResult.txt',
            `t-test for Score >>> P-Value : ${tTestPValue}` +
            "\r\n" + ttestExplanation + "\r\n" + "\r\n" +
            `Mann-Whitney U test for Score >>> U1 = ${mannWhitneyUScore[0]} and U2 = ${mannWhitneyUScore[1]}` +
            "\r\n" + mannWhitneyUScoreExplanation + "\r\n" + "\r\n" +
            `Mann-Whitney U test for Accept rate >>> U1 = ${mannWhitneyURate[0]} and U2 = ${mannWhitneyURate[1]}` +
            "\r\n" + mannWhitneyURateExplanation
            , function (err) {
                if (err) return console.log(err);
            });
    }
}
