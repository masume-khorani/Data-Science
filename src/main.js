/**
* This file includes a function which includes functions for 
* creating CSV files from StackOverflow APIs, 
* creating charts and running a t-test. 
*/

/* api includes functions for accessing data and creating CSV files */
import api from "./csvFiles/api";
/* chart includes functions for drawing charts */
import chart from "./charts/chart";
/* test includes a function for calculating P-value for t-test */
import test from "./tests/test";

export default {
    run() {
        /*The following function Creates CSV file from StackOverflow APIs. 
        It is commented because it takes quite long to download all the data.
        So I put the created CSV files src/csvFiles folder so that the program run faster.
        Ctrl + / will uncomment if you want to create CSV files again. */
        // api.createCSV(); 
        /* This function draws charts for all 5 metrics */
        chart.createChart();
        /* This function calculates p-value for all 5 metrics */
        test.runTtest();
    }
}