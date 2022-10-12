import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/modules/auth/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  
  characterName=""
  data$!:Observable<any>
  ngOnInit(): void {
    // this.apiService.getCharacters("morty").subscribe(response=>{
    //   console.log(response)
    //   this.data=response
    // })
    this.data$=this.apiService.getCharacters("morty").pipe()
  }

  searchCharacter(){
    console.log(this.characterName)
    // this.apiService.getCharacters(this.characterName).subscribe(response=>{
    //   console.log(response)
    //   this.data=response
    // })
    this.data$ =this.apiService.getCharacters(this.characterName).pipe()
  }

}
