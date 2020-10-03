import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { DataService} from './services/data.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  tokendata : any;
  tokenquery = "https://api.artsy.net/api/tokens/xapp_token?client_id=20cdb0de773465e8161d&client_secret=770236ee86445bdaa9b7b27dae8de974";
  _dataservice: any;

  constructor( private injector: Injector ) {


   }

    intercept(req, next){
   
    let dataService = this.injector.get(DataService);
    
    dataService.getToken().toPromise().then(data => {
      this.tokendata = data;
      console.log('intercepting', this.tokendata);
    });
    let tokenizedReq = req.clone({
      setHeaders: {
         /* Authorization: `Bearer ${this.tokendata.token}`  */
         Authorization: `Bearer xx.yy.zz` 
        
      }
    })
    return next.handle(tokenizedReq)
    
  }



}


