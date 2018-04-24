import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        // array in local storage for registered users
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
           
            if (request.url.endsWith('api/getAllUsers') && request.method === 'GET') {
                request = request.clone({url: 'assets/user-data.json',method:"GET"});
          
            
            }
            if (request.url.endsWith('api/updateUser') && request.method === 'POST') {

                request = request.clone({url: 'assets/user-added.json',method:"GET"});
            }
            if (request.url.endsWith('api/DeleteUser') && request.method === 'POST') {

                request = request.clone({url: 'assets/user-deleted.json',method:"GET"});
            }

            if (request.url.endsWith('api/getAllProjects') && request.method === 'GET') {

                request = request.clone({url: 'assets/project-list.json',method:"GET"});
            }
            if (request.url.endsWith('api/updateProject') && request.method === 'POST') {

                request = request.clone({url: 'assets/project-added.json',method:"GET"});
            }
            if (request.url.endsWith('api/getAllTasks') && request.method === 'GET') {

                request = request.clone({url: 'assets/task-list.json',method:"GET"});
            }if (request.url.endsWith('api/getAllParentTasks') && request.method === 'GET') {

                request = request.clone({url: 'assets/parent-task.json',method:"GET"});
            }
            if (request.url.endsWith('api/updateTask') && request.method === 'POST') {

                request = request.clone({url: 'assets/task-updated.json',method:"GET"});
            }
            return next.handle(request);

        })

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .materialize()
            .delay(5)
            .dematerialize();
    }

}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
};

