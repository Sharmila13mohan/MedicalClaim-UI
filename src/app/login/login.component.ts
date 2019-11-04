import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { DataServiceService } from '../core/dataService/data-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// Login class to allow supervisors to logi in
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginId: string;
    password: string;
    loginDetails:any;
    showloginmsg: boolean = false;
  constructor( private formBuilder: FormBuilder,private router: Router,private apiCall:DataServiceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.loginForm.controls; }
  
  //On login button click
  onSubmit(){
    console.log("in submit")
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
  
    this.loginId = this.loginForm.value.loginId,
    this.password = this.loginForm.value.password
    console.log(this.loginId)
    this.loginData(this.loginId,this.password)
   
  
  
  }
  /**
  @param userid, password
  API call which fetches userId and password fro the user and validates the credentails and
   redirects to approval page if successfull
  if failure displays the validation message
   */
  async loginData(userId,password){
    this.loginDetails = await this.apiCall.loginData(userId,password)
    console.log(this.loginDetails);
    if(this.loginDetails.status == 'failure' ){
      this.showloginmsg = true;
      return ;
    }
    localStorage.setItem('AdminId',this.loginDetails.adminId);
     this.router.navigateByUrl('/admin')
     }
}
