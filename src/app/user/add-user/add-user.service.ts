import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { RequestOptions } from '@angular/http';
import { Users } from '../../entities/users';
import { Observable } from 'rxjs/Observable';
import { UserEdit } from '../../entities/useredit';
import { status } from '../../entities/status';
import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class AddUserService {
  apiEndPOint:String='http://localhost:8090';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
   
    return this.http.get<Users[]>(this.apiEndPOint+"/user/getAllUsers");
    
  }
  updateUsers(user:Users): Observable<UserEdit> {
    

    return this.http.post<UserEdit>(this.apiEndPOint+"/user/updateUser",user );
  }
  deleteUser(user:Users): Observable<status> {
  

    return this.http.post<status>(this.apiEndPOint+"/user/DeleteUser",user);
  }
}


