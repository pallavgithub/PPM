import { pp_Nozzle } from '../_models/pp_Nozzle';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../_services/pumpRegister.service';

@Component({
  selector: 'app-nozzle',
  templateUrl: './nozzle.component.html',
  styleUrls: ['./nozzle.component.css']
})
export class NozzleComponent implements OnInit {
  pumpNozzles:pp_Nozzle[];
  constructor(private router: Router,private formDataService: FormDataService) { }

  ngOnInit() {
    //this.pumpNozzles=this.formDataService.getPumpNozzleData();
  }
  
  addNozzle(nozzle:pp_Nozzle)
  {    
      // this.pumpNozzles.unshift(nozzle);
      // this.formDataService.setPumpNozzleData(this.pumpNozzles);
  }

  removeUser(i:number)
  {
    this.pumpNozzles.splice(i,1);
  }
}
