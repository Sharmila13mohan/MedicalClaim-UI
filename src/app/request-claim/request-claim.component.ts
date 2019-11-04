import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { DataServiceService } from '../core/dataService/data-service.service'
@Component({
  selector: 'app-request-claim',
  templateUrl: './request-claim.component.html',
  styleUrls: ['./request-claim.component.scss']
})

// Request claim class to reuest the claim for the user
export class RequestClaimComponent implements OnInit {
  claimForm : FormGroup;
  hospitalDetails:any;
  hospitalDetailsE:any;
  claimTypeDetails:any;
  claimTypeDetailsE:any;
  submitted:boolean;
  policyId:string;
  admissionDate: string;
  claimAmount:number;
 doctor: string;
  dischargeDate: string;
  hospitalId: number;
 claimDetailsDetails:any;
  userId: string;
  showloginmsg:boolean;
  constructor(private formBuilder: FormBuilder,private router: Router,private apiCall:DataServiceService) { 
    this.claimForm = this.formBuilder.group({
      pName: ['', Validators.required],
      aDate: ['', Validators.required],
      dDate: ['', Validators.required],
      cType: [],
      hos: [],
      docName: ['', Validators.required],
      clmAmount: ['', Validators.required],
      
  });
  // this.hospitalDetails = [];
  // this.claimTypeDetails = [];
  this.submitted = false;
  }
 /**
 on page load need to fetch hospital name and policy Type for dropdown
  */
  async ngOnInit() {
  this.showloginmsg = false;
  await this.getClaimTyprDetails();
  await this.getHospitalList();
  }

/**
API call to get hosptital list
 */
  async getHospitalList(){
    this.hospitalDetails = await this.apiCall.getHospitalList();
    this.hospitalDetailsE = this.hospitalDetails[0].hospitalDTOs;
    console.log(this.hospitalDetails);
   
    //localStorage.setItem('hospitalId',this.hospitalDetails.hospitalId)
   }
/**
API call to fetch policy type
 */
  async getClaimTyprDetails(){
      this.claimTypeDetails = await this.apiCall.getClaimTypelList();
      this.claimTypeDetailsE =  this.claimTypeDetails[0].policyDtos;
      console.log(this.claimTypeDetails);
     
      //localStorage.setItem('hospitalId',this.claimTypeDetails.hospitalId)
   }
/**
Submit call on click of submit claim
 */
   onSubmit(){
    console.log("in submit");
    console.log(this.claimForm.value.cate);
      debugger;
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.claimForm.invalid) {
        return;
    }
    console.log(this.claimForm.value.cType);
  
   this.admissionDate = this.claimForm.value.aDate
    this.claimAmount = this.claimForm.value.clmAmount,
    this.dischargeDate = this.claimForm.value.dDate,
    this.doctor = this.claimForm.value.docName
    this.hospitalId = this.claimForm.value.hos,
    this.policyId = localStorage.getItem('policyId');
    this.userId = localStorage.getItem('userId');
    this.admissionDate = this.admissionDate.split('/').reverse().join("-");
    this.dischargeDate = this.dischargeDate.split('/').reverse().join("-");
    
    // //console.log(this.loginId)
     this.saveClaimData(this.admissionDate,this.claimAmount, this.dischargeDate,this.doctor,this.hospitalId,this.policyId,this.userId)
   
    //this.router.navigateByUrl('/home')
  
  
  }
/**
@param admissionDate,claimAmount,dischargeDate,doctor,hospitalId,policyId,userId
API call to submit the claim where all the params are mandatory and fetched from USer input 
on success/failure returns message
 */
  async saveClaimData(admissionDate,claimAmount,dischargeDate,doctor,hospitalId,policyId,userId ){
    this.claimDetailsDetails = await this.apiCall.saveClaimData(admissionDate,claimAmount,dischargeDate,doctor,hospitalId,policyId,userId)
    console.log(this.claimDetailsDetails);
    if(this.claimDetailsDetails.statusCode = 200 ){
      this.showloginmsg = true;
    }
   // localStorage.setItem('userId',this.loginDetails.userId)
     }
}
