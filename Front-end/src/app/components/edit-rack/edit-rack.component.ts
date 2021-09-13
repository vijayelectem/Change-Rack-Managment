import { DatePipe } from '@angular/common';
import { Rack } from './../../models/rack.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RackService } from '../../services/rack.service';
import { AlertService } from '../_alert/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/store.service';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-edit-rack',
  templateUrl: './edit-rack.component.html',
  styleUrls: ['./edit-rack.component.css']
})
export class EditRackComponent implements OnInit {
  rackId:any;
  client_fk:any;
  rackObject: Rack = {
    name: '',
    no_of_rows: 0,
    no_of_columns: 0,
  };

  store: Store={
    storeId:0,
    storeName:'',
    location:'',
  };

  isStorePresent=true;
  storeObj = { storeName: '', location: '',client_fk:0};
  storeList:any;
  submitted=false;
  UserObj: any = {};
  PlanObj:any={};
  options = {
    autoClose: true,
    keepAfterRouteChange: false
 };
 rackForm:FormGroup;

 ngOnInit(): void {
  this.PlanObj = JSON.parse(sessionStorage.getItem('planObj'));
  this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
  this.client_fk = this.UserObj.clientFk;
  this.rackId = this.route.snapshot.params['id'];

  if(this.PlanObj[0].name == 'Personal'){
    this.isStorePresent = false;
    this.rackForm.value.storeFk = null;
  }
  this.getStores(this.UserObj.clientFk);
  this.getRackById(this.rackId);
}

  constructor(private route: ActivatedRoute,
    private router: Router,
    private rackService:RackService,
    private storeService:StoreService,
    private datepipe: DatePipe,
    private alertService:AlertService,
    private formBuilder: FormBuilder,) { 
    
      this.rackForm = this.formBuilder.group({
        name : ['', Validators.required],
        no_of_rows:['', Validators.required],
        no_of_columns:['', Validators.required],
        createdon:['', Validators.required],
        storeFk:null,
    });
    }

    get f() { return this.rackForm.controls; }

    getStores(client_fk): void{
      this.storeService.fetchAllStoresByClientFK(client_fk)
      .subscribe((data: any) => {
       this.storeList= data;
      },
        error => {
          console.log(error);
        });
    }

    getRackById(id: any) {
      this.rackService.getRackById(id)
        .subscribe(data => {
          this.rackObject = data;
       
          this.rackObject.createdon = this.datepipe.transform(this.rackObject.createdon, "yyyy-MM-dd");
          this.storeService.getStoreById(data.storeFk)
            .subscribe(
              response => {
                this.store = response;
              }
            )
        }, error => console.log(error));
  
  
    }

  onSubmit() {   
    this.submitted = true;
    if (this.rackForm.invalid) {
      return;
    }
    this.updateRack()
  }

  updateRack() {
    
    this.rackService.updateRack(this.rackId,this.rackObject)
      .subscribe(data => {
        console.log(data);
        this.rackObject = data;
          this.router.navigate(['/racks']);
      },  error => {
        console.log(error);
      });
  }

  fetchAllRacks(){
    this.router.navigate(['/racks']);
  }

 

}
