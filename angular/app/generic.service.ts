/**
 * Created by hrausch on 28/07/16.
 */

import { Injectable }    from '@angular/core';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class GenericService {

    private baseUrl = 'http://herbertrausch.ddns.net:8080/';  // URL to web api
    //private baseUrl = 'app/dashboards/lostgrades.json';

    getBaseUrl(){
        return this.baseUrl;
    }



}

