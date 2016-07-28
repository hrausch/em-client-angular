/**
 * Created by hrausch on 23/07/16.
 */
import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {GenericService} from "../generic.service";



@Injectable()
export class DashboardCourseService {

    //private baseUrl = 'app/dashboards/lostgrades.json';

    constructor(private http: Http, private _appGlobals: GenericService) {

    }

    getLostGradesByClass() {

        let url = this._appGlobals.getBaseUrl() + "dashboard/lostgrades";
        return this.http.get(url).map((res:Response) => res.json());

    }

    getAveragesGradesByClass() {

        let url = this._appGlobals.getBaseUrl() + "dashboard/averagesgrades";
        return this.http.get(url).map((res:Response) => res.json());

    }

    protected handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}
