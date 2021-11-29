
const fs = require('fs'); 
import * as constant from '../common/constants';
import helper from '../common/helper';

export default {
    /**
     * This function manages the creation of json files required for drawing charts
     */
    async createChart() {
        let tagData1 = await helper.readCsvFile(constant.TAG1);
        let tagData2 = await helper.readCsvFile(constant.TAG2);
        let allData = tagData1.concat(tagData2);
        await this.creatChartJson(allData, constant.METRIC1, 1);
        await this.creatChartJson(allData, constant.METRIC2, 10000);
        await this.creatChartJson(allData, constant.METRIC3, 1);
        await this.creatChartJson(allData, constant.METRIC4, 0.1);
        await this.creatChartJson(allData, constant.METRIC5, 0.1);
    },

    /**
     * This function create *.vl.json files in src/charts folder according to
     * Vega Viewer extension in VSCode.
     * @param  {Array} data the data array for which a chart should be drawn
     * @param  {string} metric the name of the metric for which a chart is required
     * @param  {number} bin_step the bin value for binnig data in histograms
     */
    async creatChartJson(data, metric, bin_step) {
        let chartJson = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": { "values": data },
            "width": 600,
            "height": 600,
            "layer": [
                {
                    "transform": [
                        { "filter": "datum.tag == 'wordpress' " },
                        {
                            "bin": { "anchor": 0, "step": bin_step }, "field": metric, "as": "bin_value"
                        }, {
                            "aggregate": [{ "op": "count", "as": "Count" }],
                            "groupby": ["bin_value", "bin_value_end"]
                        }, {
                            "joinaggregate": [{ "op": "sum", "field": "Count", "as": "TotalCount" }]
                        }, {
                            "calculate": "datum.Count/datum.TotalCount", "as": "PercentOfTotal"
                        }
                    ],
                    "mark": {
                        "type": "line",
                        "interpolate": "monotone"
                    },
                    "encoding": {
                        "x": {
                            "title": metric,
                            "field": "bin_value",
                            "bin": { "binned": true, "step": bin_step }
                        },
                        "x2": { "field": "bin_value_end" },
                        "y": {
                            "title": "Relative Frequency",
                            "field": "PercentOfTotal",
                            "type": "quantitative",
                            "axis": {
                                "format": ".1~%"
                            }
                        },

                        "color": { "value": "red" }
                    }
                },
                {
                    "transform": [
                        { "filter": "datum.tag == 'drupal' " },
                        {
                            "bin": { "anchor": 0, "step": bin_step }, "field": metric, "as": "bin_value"
                        }, {
                            "aggregate": [{ "op": "count", "as": "Count" }],
                            "groupby": ["bin_value", "bin_value_end"]
                        }, {
                            "joinaggregate": [{ "op": "sum", "field": "Count", "as": "TotalCount" }]
                        }, {
                            "calculate": "datum.Count/datum.TotalCount", "as": "PercentOfTotal"
                        }, {
                            "calculate": "datum.Count/datum.TotalCount", "as": "PercentOfTotal"
                        }
                    ],
                    "mark": {
                        "type": "line",
                        "interpolate": "monotone"
                    },
                    "encoding": {
                        "x": {
                            "title": metric,
                            "field": "bin_value",
                            "bin": { "binned": true }
                        },
                        "x2": { "field": "bin_value_end" },
                        "y": {
                            "title": "Relative Frequency",
                            "field": "PercentOfTotal",
                            "type": "quantitative",
                            "axis": {
                                "format": ".1~%"
                            }
                        },

                        "opacity": { "value": 0.8 },
                        "stroke": { "value": "blue" }
                    }
                }
            ]
        }
        fs.writeFile(`${__dirname}/${metric}Chart.vl.json`.replace(/\s/g, ''), JSON.stringify(chartJson), function (err) {
            if (err) return console.log(err);
        });
        return
    }

}