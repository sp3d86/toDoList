import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient  } from '@angular/common/http';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const API_URL = environment.apiUrl;


@Injectable()
export class ApiService {

  constructor(private http: HttpClient ) {}

  public getAllTodos(): Observable<any> {
    return this.http
      .get(API_URL + '/todos')
      .pipe(map((response : any)=> {
        const todos = response; 
        return todos.map((todo) => new Todo(todo));
      }))
      .catch(this.handleError);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos', todo)
      .pipe(map(response => {
        return new Todo(response);
      }))
      .catch(this.handleError);
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(map(response => {
        return new Todo(response);
      }))
      .catch(this.handleError);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(map(response => {
        return new Todo(response);
      }))
      .catch(this.handleError);
  }

  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(map(response => null))
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
