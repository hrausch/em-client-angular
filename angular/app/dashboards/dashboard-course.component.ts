/**
 * Created by hrausch on 22/07/16.
 */

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CourseAverage} from "./DashBoard";
import {DashboardCourseService} from "./dashboard-course.service";

/// <reference path="AmCharts.d.ts" />

const url = 'app/dashboards/radarChart.js';

@Component({
    selector: 'dashcourse-selector',
    templateUrl: 'app/dashboards/dashboard-course.component.html',
    providers: [
        DashboardCourseService,
    ]

})
export class DashboardCourseComponent implements OnInit {


    grades: CourseAverage[];
    grades2json : string;
    error: any;


    loadAPI: Promise<any>;

    constructor(
        private router: Router,
        private services: DashboardCourseService) { }

    ngOnInit() {



         this.loadAPI = new Promise((resolve) => {
             this.getLostGrades();
         });



    }

    getLostGrades() {
        this.services
            .getLostGrades()
            .subscribe(
                data => { this.grades = data; this.loadRadarChart();},
                err => { this.error = true }

            );

    }

    public loadRadarChart() {

        this.grades2json = JSON.stringify(this.grades);

        var js : string = 'var chart = AmCharts.makeChart( \"chartdiv\", {' +
            '\"type\": \"radar\", '+
            '\"theme\": \"light\", ' +
            '\"dataProvider\": '+  this.grades2json + ',' +
            '\"valueAxes\": [ { ' +
            '    \"axisTitleOffset\": 20, ' +
             '   \"minimum\": 0, ' +
            '    \"axisAlpha\": 0.15 ' +
            '} ], ' +
           ' \"startDuration\": 2,  ' +
           ' \"graphs\": [ { ' +
            '    \"balloonText\": \"[[value]] litres of beer per year\", ' +
            '    \"bullet\": \"round\", ' +
           '     \"valueField\": \"lostAverages\" ' +
           ' } ], ' +
           ' \"categoryField\": \"category\", ' +
           ' \"export\": { ' +
            '    \"enabled\": true ' +
          '  } ' +
        '} );';


        let node = document.createElement('script');
        // node.src = js;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8'
        node.text = js;
        document.getElementsByTagName('head')[0].appendChild(node);
    }


}
