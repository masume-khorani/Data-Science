/**
* This file includes functions which are used in many places in the code.
*/

const fs = require('fs');
const csv = require('csv-parser');

export default {
    /**
     * This function read CSV file and return it as an array of object.
     * @param  {string} fileName the name of the file to be read
     */
    async readCsvFile(fileName) {
        let result = [];
        const readStream = fs.createReadStream(
            process.cwd() + `\\src\\csvFiles` + `/${fileName}.csv`
            ,
            { encoding: 'utf8' })
            .pipe(csv());
        for await (const chunk of readStream) {
            result.push(chunk)
        }
        console.log(`>>${fileName}:` + result.length);
        return result
    },

    /**
     * This function creates an simple array from an array of json objects for a specifide key in that object
     * @param  {Array} data array of json objects
     * @param  {string} key the key value from json object
     */
    async createArray(data, key) {
        let result = [];
        data.map(item => {
            result.push(Number(item[key]))
        })
        return result
    }
}