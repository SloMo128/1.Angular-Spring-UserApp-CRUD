import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Users } from '../Model/user.model';

@Injectable()
export class UserApiService {

    baseURL: string = "http://localhost:8080/spring-rest-api/";

    constructor(private http: HttpClient){}

    getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(this.baseURL + 'users')
    }

    getEditUsers(id: string): Observable<Users> {
        return this.http.get<Users>(this.baseURL + 'users/' +id)
    }

    updateUser(id: string, user: Users): Observable<Users> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user);
        return this.http.put<Users>(this.baseURL + 'users/' + id + '/put', body, { 'headers': headers })
    }

    deleteUser(id: string): Observable<Users> {
        return this.http.delete<Users>(this.baseURL + 'users/' + id + '/delete')
            //.pipe(catchError((err) => this.handleError('DELETE', err)));
    }
    addUser(user: Users): Observable<Users> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user);
        console.log(body)
        return this.http.post<Users>(this.baseURL + 'users', body, { 'headers': headers })
            //.pipe(catchError((err) => this.handleError('POST', err)));
    }

}