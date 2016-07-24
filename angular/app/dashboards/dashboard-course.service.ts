/**
 * Created by hrausch on 23/07/16.
 */
import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class DashboardCourseService {

    // private baseUrl = 'http://localhost:8080/dashboard/lostgrades';  // URL to web api
    private baseUrl = 'app/dashboards/lostgrades.json';

    constructor(private http: Http) {

    }

    getLostGrades() {

        return this.http.get(this.baseUrl).map((res:Response) => res.json());

    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
