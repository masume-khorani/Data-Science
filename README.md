
### Description
<p>This project is written in Javascript language. Node js is used as runtime environment, npm for managing the packages and VSCode as the IDE.
  </p>
  <p>
  <b> How the code works</b><br/>
  The Entry point of the code is <b>index.js</b> file which implements <b>run</b> function in <b>main.js</b> file. The run function has three following functions inside it: <br/>
1 - createCSV() for creating CSV files: calls StackOverflow API for questions and provides a start and end date (01/01/2021 - 01/07/2021), and a tag (“wordpress” or “drupal”, and stores the required metrics of the received data in a csv file for each tag in src/csvFiles folder. Because the maximum number of received data for each API call is limited, a recursive function is used to get all desired data.
The content of the csv files is as follows:<br/>
  The identifier is <b>question id</b><br/>
  Five chosen metrics are : <b>reputation</b>, <b>answer count</b>, <b>is answered</b>, <b>accept rate</b>, <b>score</b> <br/>
  <b>Tip:</b> As the type of value of “is answered “ is boolean they are saved as 1 and 0 for true and false values respectively.<br/>
2- createChart() for creating json files for plots: converts the content of csv files for “wordpress” and “drupal” tags to an array suitable for Vega Viewer plugin. This function also creates json files based on Vega grammar for plots and saves these json files in src/charts folder. Vega Viewer can be used to create plots of the data.<br/>
3 - runTtest() for calculating p-value for t-test: calculate the p-value for t-test for data under score metric.

  </p>
  <p>
  <b>Useful links: </b>
  </p>
  <p>Stackoverflow API documentation:</br>
    https://api.stackexchange.com/docs</p>
  <p>Stackoverflow API for questions with wordpress tag within a 6-month period (01/01/2021 - 01/07/2021) : </br>
     https://api.stackexchange.com/2.3/questions?fromdate=1609459200&todate=1622505600&order=desc&sort=activity&tagged=wordpress&site=stackoverflow</p>
  <p>Stackoverflow API for questions with drupal tag within a 6-month period (01/01/2021 - 01/07/2021) : </br>
     https://api.stackexchange.com/2.3/questions?fromdate=1609459200&todate=1622505600&order=desc&sort=activity&tagged=wordpress&site=stackoverflow</p>
  
  ### Used Libraries
<p><b>axios :</b> for making http requests<br/>
<span>link : </span>https://github.com/axios/axios</p>
<p><b>fs :</b> for interacting with files such as reading and writing files<br/>
<span>link : </span>https://nodejs.dev/learn/the-nodejs-fs-module</p>
<p><b>csv-parser :</b> for converting CSV file into JSON<br/>
<span>link : </span>https://github.com/mafintosh/csv-parser</p>
<p><b>jstat :</b> or statistical analysis<br/>
<span>link : </span>https://github.com/jstat/jstat</p>

### Plots
<p>Vega Viewer plugin for VSCode IDE is used to draw plots.
Vega document link: 
https://vega.github.io/vega-lite/docs/data.html#inline
  <br/> <b>Tip:</b> In VSCode, from the View menu click the Extension button. In  Extensions panel, then click on the Install button to install the Visual Studio Code extension you want
</p>

### Installation and run
<p>
You need to install Node js and then clone the project from the github repository. Open the command prompt (cmd) window and navigate to the project folder. Use the <b> npm install </b> command to create the <b> node_module </b>folder which contains all packages used in the project. <br/>
Then run the program using the <b> npm start </b> command. To restart the program use the <b>rs</b> command.</br>
To view a plot open the .vl.json file and click the vega icon on the top right corner of the tab.
</p>

### Results
<p>
In the 6 month period from 01-01-2021 to 01-07-2021 “wordpress” tag had about 33 times more questions than “drupal” (9244 for wordpress and 274). This can be a sign of the popularity of Wordpress compared to Drupal. Because of the big difference between the number of questions for the two tags, in the following plots relative frequencies are used, instead of frequencies, to make comparison between the two data sets possible.<br/>
Plots show that for all metrics except “answer count” the trends for the two tags were the same, i.e., either both had increasing or decreasing patterns. At some parts the plot for both tags overlap which means they had identical relative frequencies. <br/>
  </p>
  
  <p>
 <img src="https://github.com/masume-khorani/Data-Science/blob/main/src/assets/scoreChart.vl.png" width="500" height="500"> <br/>
  <b>Figure 1 (red: “wordpress” blue: “drupal”)</b></p>
  <p>As shown in Figure 1, there is a relatively normalized distribution for both tags with a mean close to zero. Therefore, for both tags, nearly half of the questions have negative scores. Questions with a score equal to 1 have the highest frequency. With increasing the score value, the number of questions drops drastically. There is no question for “drupal” tag with a high score and for “wordpress” there are very few ones.<br/>
  </p>
  <p>
 <img src="https://github.com/masume-khorani/Data-Science/blob/main/src/assets/reputationChart.vl.png" width="500" height="500"><br/>
<b>Figure 2 (red: “wordpress” blue: “drupal”)</b><br/>
  </p>
  <p>
As shown in Figure 2, there are very few questions with reputation value more than 7000. For “drupal” tag there are no question with reputation value more than 15000.<br/> 
  </p>
<p >
 <img src="https://github.com/masume-khorani/Data-Science/blob/main/src/assets/acceptrateChart.vl.png" width="500" height="500"><br/>
<b>Figure 3 (red: “wordpress” blue: “drupal”)</b><br/>
</p>
<p>
  As shown in Figure 3, most of the questions of both tags have accept rate between 0 and 8. Questions with a higher accept rate are rare.
</p>
<p>
<img src="https://github.com/masume-khorani/Data-Science/blob/main/src/assets/answercountChart.vl.png" width="500" height="500"><br/>
<b>Figure 4 (red: “wordpress” blue: “drupal”)</b><br/>
  </p>
 <p>
  For answer count most of the questions have values between 1 and 2. For “wordpress” a few percent of questions have more than 2 answers. <br/>
</p>
 <p>
<img src="https://github.com/masume-khorani/Data-Science/blob/main/src/assets/isansweredChart.vl.png" width="500" height="500"><br/>
<b>Figure 5 (red: “wordpress” blue: “drupal”)</b></br>
 </p>
 <p>  
As shown in Figure 5, the percentage of answered questions for the two tags are similar. A high percentage of questions remained unanswered for both tags. For “wordpress” the percent of answered questions is a bit lower than “drupal”.<br/>
  </p>
  

<b>T-test</b> <br/>
As an additional analysis, an independent t-test is conducted to check whether the mean value of scores metric for “wordpress” and “drupal” tags differ significantly. The p-value for this test is 0.19 which means there is no statistically significant difference between two sets of data. (The distribution of other metrics was not normal, so it was not possible to use t-tests for them.)
  </p>
  
