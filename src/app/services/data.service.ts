import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  queryUrl_ARTSY = "https://api.artsy.net/api/partners/4f99c7b793ab4b0001000179"
  tokenquery = "https://api.artsy.net/api/tokens/xapp_token?client_id=20cdb0de773465e8161d&client_secret=770236ee86445bdaa9b7b27dae8de974";
  tokendata : any;

  constructor(private http: HttpClient ) {

    const httpOptions =  {
      headers: new HttpHeaders({
        'Authorization':'my-auth-token'
      })
    };
    
   }


  getRemoteData(url: string){

    try {
      return this.http.get(url)
    } catch (err) {
     console.log(err)
    
    }
  }

  getRemoteDataWithHeader(url: string, _authToken: any){

    let headers = new HttpHeaders();
    headers = headers.append(`X-Xapp-Token`, `${_authToken}`);
    try {
      return this.http.get(url,{headers})
    } catch (err) {
    console.log(err)
    }
    
  }



  getToken(){

      try {
      return this.http.post(this.tokenquery,'');
      } catch (err) {
      console.log(err)
      }

  }

}
