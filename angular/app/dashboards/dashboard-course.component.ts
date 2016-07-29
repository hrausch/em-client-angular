/**
 * Created by hrausch on 22/07/16.
 */

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CourseAverage} from "./DashBoard";
import {DashboardCourseService} from "./dashboard-course.service";
import {StudentSummary} from "../student/student";
import {StudentService} from "../student/student.service";

/// <reference path="AmCharts.d.ts" />

const url = 'app/dashboards/radarChart.js';

@Component({
    selector: 'dashcourse-selector',
    templateUrl: 'app/dashboards/dashboard-course.component.html',
    providers: [
        DashboardCourseService,
        StudentService
    ]

})
export class DashboardCourseComponent implements OnInit {


    classLost: any;
    classAverages: any;
    studentSummary: StudentSummary[];
    error: any;


    loadAPI: Promise<any>;

    constructor(
        private router: Router,
        private services: DashboardCourseService,
        private serviceStudent: StudentService) { }

    ngOnInit() {



         this.loadAPI = new Promise((resolve) => {
             this.getLostGrades();
             this.getAverageGrades();
             this.getStudentSummary();
         });


    }

    getAverageGrades() {
        this.services
            .getAveragesGradesByClass()
            .subscribe(
                data => { this.classAverages = data; this.loadBarChart();},
                err => { this.error = true }

            );

    }

    getLostGrades() {
        this.services
            .getLostGradesByClass()
            .subscribe(
                data => { this.classLost = data; this.loadRadarChart();},
                err => { this.error = true }

            );

    }

    getStudentSummary(){
        this.serviceStudent
            .getStudentSummary()
            .subscribe(
                data => { this.studentSummary = data; },
                err => { this.error = true }

            );
    }



    public loadBarChart(){

        var grades2json = JSON.stringify(this.classAverages);

        var js : string = 'var chart2 = AmCharts.makeChart( "chartbar", { '+
            '\"type\": \"serial\", '+
            '\"theme\": \"light\", ' +
            '\"categoryField\": \"category\", '+
            '\"startDuration\": 1, '+
            '\"categoryAxis\": { '+
            '    \"gridPosition\": \"start\" '+
            '},'+
            '\"graphs": [ '+
             '   { '+
            '       \"balloonText\": \"Média de [[categoryTitle]]:[[value]]\", '+
            '       \"fillAlphas\": 1, '+
            '       \"id\": \"AmGraph-1\", '+
            '       \"title\": \"1 Bimestre\", '+
            '       \"type\": \"column", '+
            '       \"valueField\": \"1 Bimestre\" '+
            '   }, '+
            '   { '+
            '        \"balloonTex\t": \"Média de [[categoryTitle]]:[[value]]\",'+
            '        \"fillAlphas\": 1,'+
            '        \"id\": \"AmGraph-2\",'+
            '        \"title\": \"2 Bimestre\",'+
            '        \"type\": \"column\",'+
            '        \"valueAxis\": \"ValueAxis-2\",'+
            '        \"valueField\": \"2 Bimestre\"'+
            '    },'+

            '   { '+
            '       \"balloonText\": \"Média de [[categoryTitle]]:[[value]]\", '+
            '       \"fillAlphas\": 1, '+
            '       \"id\": \"AmGraph-3\", '+
            '       \"title\": \"AS1\", '+
            '       \"type\": \"column", '+
            '       \"valueField\": \"AS1\" '+
            '   }, '+
            '   { '+
            '        \"balloonTex\t": \"Média de [[categoryTitle]]:[[value]]\",'+
            '        \"fillAlphas\": 1,'+
            '        \"id\": \"AmGraph-4\",'+
            '        \"title\": \"3 Bimestre\",'+
            '        \"type\": \"column\",'+
            '        \"valueAxis\": \"ValueAxis-2\",'+
            '        \"valueField\": \"3 Bimestre\"'+
            '    },'+

            '   { '+
            '       \"balloonText\": \"Média de [[categoryTitle]]:[[value]]\", '+
            '       \"fillAlphas\": 1, '+
            '       \"id\": \"AmGraph-5", '+
            '       \"title\": \"4 Bimestre\", '+
            '       \"type\": \"column", '+
            '       \"valueField\": \"4 Bimestre\" '+
            '   }, '+
            '   { '+
            '        \"balloonTex\": \"Média de [[categoryTitle]]:[[value]]\",'+
            '        \"fillAlphas\": 1,'+
            '        \"id\": \"AmGraph-4\",'+
            '        \"title\": \"AS2\",'+
            '        \"type\": \"column\",'+
            '        \"valueAxis\": \"ValueAxis-2\",'+
            '        \"valueField\": \"AS2\"'+
            '    }'+


            '],'+

            '\"valueAxes\": ['+
            '	{'+
            '		\"id\": \"ValueAxis-1\",'+
            '		\"title\": \"Nota Média\"'+
            '	}'+
            '],'+

        '\"legend\": {'+
        '   	\"useGraphSettings\": true'+
        '},'+
        '\"titles\": ['+
        '	{'+
        '		\"id\": \"Title-1\",'+
        '		\"size\": 15,'+
        '		\"text\": \"Nota média da disciplina por etapa\"'+
        '	}'+
        '],'+

            '\"dataProvider\": '+  grades2json + ',' +

            '} );';


        this.insertJSCode(js);

    }

    public loadRadarChart() {

        var grades2json = JSON.stringify(this.classLost);

        var js : string = 'var chart = AmCharts.makeChart( \"chartradar\", {' +
            '\"type\": \"radar\", '+
            '\"theme\": \"light\", ' +
            '\"dataProvider\": '+  grades2json + ',' +
            '\"valueAxes\": [ { ' +
            '    \"axisTitleOffset\": 20, ' +
             '   \"minimum\": 0, ' +
            '    \"axisAlpha\": 0.15 ' +
            '} ], ' +
           ' \"startDuration\": 2,  ' +
           ' \"graphs\": [ { ' +
            '    \"balloonText\": \"[[value]] médias perdidas\", ' +
            '    \"bullet\": \"round\", ' +
           '     \"valueField\": \"lostAverages\" ' +
           ' } ], ' +
           ' \"categoryField\": \"category\", ' +
           ' \"export\": { ' +
            '    \"enabled\": true ' +
          '  } ' +
        '} );';


        this.insertJSCode(js);
    }

    private insertJSCode(code : string){

        let node = document.createElement('script');
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8'
        node.text = code;
        document.getElementsByTagName('head')[0].appendChild(node);

    }

    private insertJSCodeUrl(url : string){

        let node = document.createElement('script');
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8'
        node.src = url;
        document.getElementsByTagName('head')[0].appendChild(node);

    }

}
