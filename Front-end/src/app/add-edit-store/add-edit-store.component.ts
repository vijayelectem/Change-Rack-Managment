import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../models/store.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-add-edit-store',
  templateUrl: './add-edit-store.component.html',
  styleUrls: ['./add-edit-store.component.css']
})
export class AddEditStoreComponent implements OnInit {

  store: Store = {
    storeId: 0,
    storeName: '',
    location: '',
  };
  UserObj: any = {};
  storeObj = { storeName: '', location: '',client_fk:0};
  locationList:any;

  constructor(private router: Router,
    private storeService: StoreService,
    private formBuilder: FormBuilder,private route: ActivatedRoute) { }

    loading = false;
    submitted = false;
    storeForm: FormGroup;

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.getLocation();
    this.storeForm = this.formBuilder.group({
      storeName : ['', Validators.required],
      location:['', Validators.required],
      client_fk: this.UserObj.clientFk,
  });
  this.getStoreById(this.route.snapshot.params.storeId);

  }

  get f() { return this.storeForm.controls; }

  saveStore(): void {
    this.submitted = true;
    if (this.storeForm.invalid) {
      return;
    }
    if(this.route.snapshot.params.storeId) {
      return this.updateStoreById();
    }
    this.storeService.createStore(this.storeForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/stores']);
              },
              error => {
                console.log(error);
              });
  }  

  getStoreById(storeId){
    this.storeService.getStoreById(storeId)
    .subscribe(
    response=>{
      this.storeObj = response;
    }
    )
  }

  updateStoreById(): void {
    this.submitted = true;
    if (this.storeForm.invalid) {
      return;
    }
    this.storeService.updateStore(this.route.snapshot.params.storeId,this.storeForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/stores']);
          },
        error => {
          console.log(error);
        });
  }

  getLocation(): void {
    this.storeService.getLocation()
      .subscribe(
        data => {
          this.locationList = data;
        },
        error => {
          console.log(error);
        });
  }
}
