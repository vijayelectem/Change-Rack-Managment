
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { Rack } from '../../models/rack.model';
import { RackService } from '../../services/rack.service';
import { StoreService } from 'src/app/store.service';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-create-rack',
  templateUrl: './create-rack.component.html',
  styleUrls: ['./create-rack.component.css']
})
export class CreateRackComponent implements OnInit {

  UserObj: any = {};
  PlanObj: any={};

  rack: Rack = {
    name: '',
    no_of_rows: 0,
    no_of_columns:0,
    client_fk:0,
    createdon:'',
    storeFk:0
    
  };
  store: Store={
    storeId:0,
    storeName:'',
    location:'',
  };
  storeList:any;

  constructor(
    private router: Router,
    private rackService: RackService,
    private formBuilder: FormBuilder,
    private storeService:StoreService,
  ) { }
  loading = false;
  submitted = false;
  rackForm: FormGroup;
  rackObj:any;
  createdon:any;
  isStorePresent=true;
  ngOnInit() {
   
    this.PlanObj = JSON.parse(sessionStorage.getItem('planObj'));
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
     this.rack.client_fk = this.UserObj.clientFk;
    this.rackForm = this.formBuilder.group({
      name : ['', Validators.required],
      no_of_rows: ['', [Validators.required ]],
      no_of_columns: ['', [Validators.required]],
      createdon:['', [Validators.required]],
      client_fk:this.UserObj.clientFk,
      storeFk:null,
      createdBy:'',
  });

  if(this.PlanObj[0].name == 'Personal'){
    this.isStorePresent = false;
    this.rackForm.value.storeFk = null;
  }
  this.getStores(this.UserObj.clientFk);
  }

  getStores(client_fk): void{
    this.storeService.fetchAllStoresByClientFK(client_fk)
    .subscribe((data: any) => {
     this.storeList = data;
    },
      error => {
        console.log(error);
      });
  }

  get f() { return this.rackForm.controls; }

  saveRack(): void {
    this.submitted = true;
    if (this.rackForm.invalid) {
      return;
    }
    this.rackService.createRack(this.rackForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/racks']);
              },
              error => {
                console.log(error);
              });
  }  

  fetchAllRacks(){
    this.router.navigate(['/racks',]);
  }
}
