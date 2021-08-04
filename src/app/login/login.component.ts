import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  // submitForm(): void {
  //   for (const i in this.validateForm.controls) {
  //     if (this.validateForm.controls.hasOwnProperty(i)) {
  //       this.validateForm.controls[i].markAsDirty();
  //       this.validateForm.controls[i].updateValueAndValidity();
  //     }
  //   }
  // }
 
 
  constructor(private fb: FormBuilder,private router: Router, private login:LoginService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
 
    
  }
  submitForm(value)
  {
    
    this.login.getlogindata(value).subscribe((result)=>{
     
   
      if(Object.keys(result).length == 0)
      {
        this.router.navigate(['']);
      }
      else
      {
        let userid = result[0].id;
        let username =  result[0].username;
        localStorage.setItem('dataSource', userid);
        localStorage.setItem('username', username);
        this.router.navigate(['/home']);
      }
      
    })
    
  }

}
