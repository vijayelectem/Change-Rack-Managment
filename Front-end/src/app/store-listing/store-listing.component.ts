import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from '../store.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-store-listing',
  templateUrl: './store-listing.component.html',
  styleUrls: ['./store-listing.component.css']
})
export class StoreListingComponent implements OnInit {

  UserObj: any = {};
  
  displayedColumns: string[] = ['storeName','location','actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.getStores(this.UserObj.clientFk);
  }

  getStores(client_fk): void{
    this.storeService.fetchAllStoresByClientFK(client_fk)
    .subscribe((data: any) => {
      this.dataSource.data = data;
    },
      error => {
        console.log(error);
      });
  }

  deleteStore(id:any){
    swal({
      title: 'Are you sure?',
      text: 'Do you want to remove this ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.value) {
        this.deleteStoreById(id);
      }
    });
  }
  deleteStoreById(id){
    this.storeService.deleteStoreById(id)
    .subscribe(
      response=>{
        console.log(response);
        this.getStores(this.UserObj.clientFk);
      }
    )
  }

}
