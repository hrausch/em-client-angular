/**
 * Created by hrausch on 23/07/16.
 */
import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {GenericService} from "../generic.service";



@Injectable()
export class StudentService {

    //private baseUrl = 'app/dashboards/lostgrades.json';

    constructor(private http: Http, private _appGlobals: GenericService) {

    }

    getStudentSummary() {

        let url = this._appGlobals.getBaseUrl() + "dashboard/studentsummary";
        let file = "app/dashboards/studentsummary.json"
        return this.http.get(file).map((res:Response) => res.json());

    }




}
