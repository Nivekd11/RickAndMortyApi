import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup

  constructor(private authService: AuthService,private router: Router) { 
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      
      username: new FormControl("",[Validators.maxLength(10),Validators.minLength(4),Validators.required]),
      password: new FormControl("",Validators.required),
      
    });
  }

  onSubmit(){
    console.log(this.form.get("username")?.value)
    console.log(this.form.get("password")?.value)
    
    this.authService.login(this.form.get("username")?.value,this.form.get("password")?.value).subscribe(response=>{
      //console.log(response)
      this.router.navigate(['dashboard/main'])
      
    })

    
  }

}
