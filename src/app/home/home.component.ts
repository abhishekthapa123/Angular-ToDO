import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import{LoginService} from '../login.service';
import{FormControl,FormGroup} from '@angular/forms';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})

export class HomeComponent implements OnInit {
  
 
   uid = localStorage.getItem("dataSource"); 
  
  uname:string =  localStorage.getItem("username");
  username =  this.uname.charAt(0).toUpperCase()+this.uname.slice(1);

savetodo= new FormGroup({
 items: new FormControl(''),
 uid: new FormControl(this.uid)
})
editgroup = new FormGroup({
  items : new FormControl(''),
  id: new FormControl(),
  uid: new FormControl(),
})


  isVisible = false;
  constructor(private router: Router,private login:LoginService) {}
  todo:any=[];
  showModal(data): void {
    this.isVisible = true;
    this.editgroup = new FormGroup({
      items : new FormControl(''),
      id : new FormControl(data),
      uid: new FormControl(this.uid)
    })
    
  }
  
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  ngOnInit() {
    if (localStorage.getItem("dataSource") == null) {
      this.router.navigate(["/"]);
    } else {
      
     this.login.getTodo(localStorage.getItem("dataSource")).subscribe((result)=>{
       
      this.todo = result;
     });

    }
  }
  logout() {
    localStorage.removeItem("dataSource");
    localStorage.removeItem("username");
    this.router.navigate(["/"]);
  }
  delete(id,index)
  {
    // console.log(data.id);
    this.todo.splice(index,1);
    
    this.login.deleteData(id).subscribe(()=>{
     
    });

    
  }
  addtodo( )
  {
    
    // console.log(this.savetodo.value);
  //  let obj:Object= {};
    this.login.saveTodo(this.savetodo.value).subscribe((result)=>{
      this.todo.push(result);

      this.savetodo.get('items').reset();
    });
 

  }
  update()
  {
    console.log(this.editgroup.value);
    this.login.updatetodo(this.editgroup.value).subscribe(()=>{
      this.login.getTodo(localStorage.getItem("dataSource")).subscribe((result)=>{
       
        this.todo = result;
       });
    })
  }
}
