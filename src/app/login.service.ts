import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http:HttpClient) { }
  getlogindata(value) 
  {
    
    let  name= value.userName;
    let password=value.password;
    
    let url="http://localhost:3000/credinals?username";
     return this.http.get(`${url}=${name}&password=${password}`);
  
  }
  getTodo(id)
  {
   let url ="http://localhost:3000/todo?uid=";
   return this.http.get(`${url}${id}`); 
  }
  deleteData(id)
  {
    let url ="http://localhost:3000/todo/";
    return this.http.delete(`${url}${id}`);
  }
  saveTodo(data)
  {
    let url ="http://localhost:3000/todo";
    return this.http.post(url,data);
  }
  updatetodo(data)
  {
   
    let id = data.id;
    let url ="http://localhost:3000/todo";
    return this.http.put(`${url}/${id}`,data);
  }
}
