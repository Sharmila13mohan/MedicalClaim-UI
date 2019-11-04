import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../core/dataService/data-service.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-adminapproval',
  templateUrl: './adminapproval.component.html',
  styleUrls: ['./adminapproval.component.scss'],
    providers: [MessageService]
})

// Approval/Reject class for admin
export class AdminapprovalComponent implements OnInit {
userId:string;
AdminDetails:any;
adminId:string;
 msgs: Message[];
  constructor(private apiCall:DataServiceService,private messageService: MessageService) { }

  async ngOnInit() {

    await this.getAdminDetails();
  }

  /**
  API call to get the list of pending claims with admin
  @param userId fetched i login pae from user
   */
   async getAdminDetails(){
    this.userId = localStorage.getItem('userId');
    this.AdminDetails = await this.apiCall.getAdminDetails(this.userId);
    this.AdminDetails = this.AdminDetails.medicalClaimsResponseDto
    console.log(this.AdminDetails);
   
   
   }
  // On click of Approve/Reject button by user
   onApproveRejectClick(status,claimId){
     this.adminId = localStorage.getItem('AdminId')
    this.saveApproveReject(status,claimId, this.adminId);
    }
 
   /**
   API call on Approve/Reject click to update the status in database
   @param status, claimId,adminId 
   */
   async saveApproveReject(status,claimId,adminId){
    this.msgs = [];
    this.AdminDetails = await this.apiCall.saveApproveReject(status,claimId,adminId);
    this.msgs.push({severity:'error', summary:'', detail:'Request has been Rejected'});
    if(status == 'APPROVED'){
    this.msgs.push({severity:'success', summary:'', detail:'Request has been Approved'});
    }
   
    console.log(this.AdminDetails);
   
   
   }
}
