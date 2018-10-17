import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from "../../../../services/login.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  index_signin:string;
  details:{ firstname:string,
            lastname:string,
            dept_name:string,
            year:number,
            hall_id:number,
            room_id:number,
            password:string,
            hall_name:string};
  re_enter_password:string;
  editDetails:boolean=false;
  errorMessage:string="";
  error:boolean=false;
  successMessage:string="";
  success:boolean=false;
  today:Date;
  hour:number;
  greet:string;
  greetIcon:string;
  greetColor:string;

  constructor(private loginService:LoginService, private router:Router) {
    this.index_signin=loginService.getIndex();
    this.details={
      firstname:"",
      lastname:"",
      dept_name:"",
      year:null,
      hall_id:null,
      room_id:null,
      password:"",
      hall_name:""  
    }
    
    this.loginService.getDetails().subscribe(details=>{
      this.details.firstname=(details.firstname);
      this.details.lastname=details.lastname;
      this.details.dept_name=details.dept_name;
      this.details.year=details.year;
      this.details.hall_id=details.hall_id;
      this.details.room_id=details.room_id;
      this.details.password=details.password;
      this.details.hall_name=details.hall_name;
    });
    console.log(this.index_signin);
    
   }

  ngOnInit() {
    this.today = new Date();
    this.greet = this.greeting();
  }
  
  toggleEdit(){
    this.editDetails=!this.editDetails;
  }
  
  logout(){
    window.localStorage.removeItem('auth-key');
    this.router.navigate([""]);
  }
  search(){
    this.router.navigate(["user/search"]);
  }
  changeDetails(details,re_enter_password){
    if(this.details.password!=this.re_enter_password){
      console.log(this.details.password);
      console.log(this.re_enter_password);
      this.error=!this.error;
      this.errorMessage="Password Does not Match";
    }else{
      this.loginService.updateDetails(this.index_signin,this.details.firstname,this.details.lastname,this.details.password).subscribe(success=>{
        this.success=!this.success;
        this.error=false;
        this.successMessage="Profile Updated";
      },
      error=>{
        this.error=!this.error;
        this.errorMessage="Unexpected Error Occured";
      });
    }
  
  }
  greeting(){
    this.hour = this.today.getHours();
    if(this.hour>=0 && this.hour<12){
      this.greetIcon = "fa fa-sun-o";
      this.greetColor = "#f2c10e";
      return "Good Morning !";
    }else if(this.hour>=12 && this.hour<16){
      this.greetIcon = "fa fa-sun-o";
      this.greetColor = "#ff3700";
        return "Good Afternoon !"
    }else if(this.hour>=16 && this.hour<19){
      this.greetIcon = "fa fa-sun-o";
      this.greetColor = "#d6b948";
      return "Good Evening !"
  }else if(this.hour>=19 && this.hour<=23){
    this.greetIcon = "fa fa-moon-o";
    return "Good Night !"
}
  }
}
