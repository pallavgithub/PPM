import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../_services/pumpRegister.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  responseData:string;
  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
   this.responseData= "Pump Register Sucessfully";
  }
  
 
}
