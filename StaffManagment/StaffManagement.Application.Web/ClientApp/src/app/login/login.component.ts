import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MvLogin } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit, OnDestroy  {

  loginForm: FormGroup;
  errorMessage = null;
  errorMessageType : any = {
    invalidForm: 'Data Must be required',
    invalidLogin: 'Invalid Username or Password'
  }
  login: MvLogin = <MvLogin>{};
  constructor(
    public fb: FormBuilder,
    public loginService: LoginService,
    private router: Router,
    private snacBar: MatSnackBar
  ) { }
  ngOnDestroy() {
   
  }
  getUserDetails() {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    this.loginForm.updateValueAndValidity();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  submitForm(){
     if(!this.loginForm.valid ){
       this.openSnackBar(this.errorMessageType.invalidForm, "");
     }else{
       this.login.Username = this.Username.value.trim();
       this.login.Password = this.Password.value.trim();

       this.loginService.getLogin(this.login).subscribe((res)=>{
         if(res){ 
           console.log("res",res);
            localStorage.setItem('UserId', res.Login[0].UserId);
           this.openSnackBar("login successfully", "");
            
         }else{
           this.openSnackBar(this.errorMessageType.invalidLogin, "");
         }
       })
     }
  }

  get Username(): any{
    return this.loginForm.get('Username');
  }
  get Password() : any{
    return this.loginForm.get('Password');
  }
  openSnackBar(message,action){
    this.snacBar.open(message, action,{
      duration:3000,
      panelClass: ['login-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })
  }

}
