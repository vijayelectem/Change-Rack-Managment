import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from '../services/user.service';
import { Staff } from '../models/staff.model';
import swal from 'sweetalert2';
import { StoreService } from '../store.service';
import { Store } from '../models/store.model';
@Component({
  selector: 'app-add-edit-staff',
  templateUrl: './add-edit-staff.component.html',
  styleUrls: ['./add-edit-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  dropdownList = [];
  selected:any = [];
  dropdownSettings = {};
  
  staff: Staff = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  storeList:any;
  UserObj: any = {};
  PlanObj: any={};
  staffRoleID: '';
  clientName: '';
  isStorePresent=true;
  storeName:any;
  staffObj = { username: '', email: '', password:'' , confirmPassword : ''};
  store: Store={
    storeId:0,
    storeName:'',
    location:'',
  };
  noOfUsers: '';
  isExist = false;
  constructor(  private router: Router,
    private userService: UserService,
    private storeService: StoreService,
    private formBuilder: FormBuilder,private route: ActivatedRoute) { }
    loading = false;
    submitted = false;
    staffForm: FormGroup;
  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'storeId',
      textField: 'storeName',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 3
   }

    this.PlanObj = JSON.parse(sessionStorage.getItem('planObj'));
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.getStaffRole();
    this.getClientName(this.UserObj.clientFk);
    this.staffForm = this.formBuilder.group({
      username : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      clientFk: this.UserObj.clientFk,
      status: 'ACTIVE',
      roleId: this.staffRoleID,
      storeFk:null,
      stores: {},
  });
  if(this.PlanObj[0].name == 'Personal'){
    this.isStorePresent = false;
    this.staffForm.value.storeFk = null;
    
  }
  this.getStaffData(this.route.snapshot.params.id);
  this.getStores(this.UserObj.clientFk);
  
 
  }

  getStores(client_fk): void{
    this.storeService.fetchAllStoresByClientFK(client_fk)
    .subscribe((data: any) => {
      if(this.staffForm.value.username){
          this.storeList=this.selected;
      }else{
        this.storeList= data;
      }
     
    },
      error => {
        console.log(error);
      });
  }

 get f() { return this.staffForm.controls; }

  saveClientStaff(): void {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    }
     
    if(this.staff.password == this.staff.confirmPassword){
    if(this.route.snapshot.params.id) {
      return this.updateClientStaff();
    }
    this.staffForm.value.roleId = this.staffRoleID;
    this.staffForm.value.username =  this.clientName + '.' + this.staffForm.value.username;
    this.staffForm.value.stores = this.selected;
    this.userService.backendValidation(this.staffForm.value.username,this.staffForm.value.email)
    .subscribe(
      response => {
        if(response.length>0){
          this.isExist = true;
        }
      else
    this.userService.saveClientStaff( this.clientName,this.staffForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.getSelectedValue();
          this.router.navigate(['/staff']);
          },
        error => {
          console.log(error);
        });
      },
      error => {
        console.log(error);
    });
  }
  }

  updateClientStaff(): void {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    }
    this.staffForm.value.roleId = this.staffRoleID;
    this.userService.updateClientStaff(this.route.snapshot.params.id,this.staffForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/staff']);
          },
        error => {
          console.log(error);
        });
  }

  getStaffRole(): void {
    this.userService.getStaffRole()
        .subscribe(
            data => {
                this.staffRoleID = data[0].id;
            },
            error => {
                console.log(error);
  });
}

    getClientName(id:any): void {
      this.userService.getClientName(id)
          .subscribe(
              data => {
                  this.clientName = data[0].name;
              },
              error => {
                  console.log(error);
    });
    }
  
    getStaffData(id: string): void {
        this.userService.get(id)
            .subscribe(
              data => {
                console.log(data);
                this.staffObj = data;
                this.staffObj.confirmPassword = data.password;
                this.storeService.getStoreById(data.storeFk)
                .subscribe(
                  response=>{
                    this.store=response;
                  }
                )
            },
                error => {
                    console.log(error);
      });
    }  

    changeFn(item: any) {
      this.selected.push(item);
    }

    onItemSelect(item: any) {
      this.selected.push(item);
    }

    onSelectAll(items: any) {
      this.selected.push(items);
    }

    getSelectedValue(){
      console.log(this.selected);
    }
}
