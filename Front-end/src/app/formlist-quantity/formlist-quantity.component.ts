import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../components/_alert';
import { FormService } from '../services/app.form.service';
import { RackService } from '../services/rack.service';
import * as $ from 'jquery'
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-formlist-quantity',
  templateUrl: './formlist-quantity.component.html',
  styleUrls: ['./formlist-quantity.component.css']
})
export class FormlistQuantityComponent implements OnInit {

  trayItems = { quantity: 0, trayId: 0, formId: 0, rackId: 0, tempId: 0 };
 
  @Input()
  name:string;

  @Input()
  id:string;

  @Input()
  isQuantity:boolean;

  @Input()
  trayId:string;

  @Input()
  rackId:string;

  @Input()
  rackName:string;

  rowDataList: any = [];

  dataList: any = {};

  filteredTemplates:any;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  elasticSearch = {
    name: '',
    rackId: 0,
    username: '',
    attributes:[{}]
  };

  dataSource = new MatTableDataSource<any>();

  quantity:any;

  displayedColumns: string[] = [];

  UserObj: any = {};

  text:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private formService: FormService,
    private route: ActivatedRoute,
    private rackService: RackService,
    private alertService: AlertService,
    private itemService:ItemService,
    private userService:UserService,) {
  }

  ngOnInit(): void {
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.elasticSearch.username = this.UserObj.username;
    this.retrieveForms();
  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  retrieveForms(): void {    
    this.formService.getAllProductsByItemTempId(this.id, this.name)
      .subscribe(
        data => {
          this.extractData(data);
        });
  }
  onKeyUp(x) { // appending the updated value to the variable
    this.text = x.target.value;
  }

  fetchAllProducts(){
    this.formService.getAllProductsByItemTempId(this.id, this.name)
    .subscribe(
      data => {
        this.editFormList(data)
      });
  }

  addItemsToTray(formId) {
    this.trayItems.quantity = this.text;
    this.trayItems.formId = formId;
    this.trayItems.trayId = parseInt(this.trayId);
    this.trayItems.rackId = parseInt(this.rackId);
    this.trayItems.tempId=  parseInt(this.id);
    this.rackService.fetchTrayTemplateAndFormById(this.trayItems.trayId,this.trayItems.tempId,this.trayItems.formId)
      .subscribe(
        response => {
          if (response.length > 0) {
            this.text = $("#updateQuantity").val();
            this.trayItems.quantity=this.text;
            this.rackService.updateTrayItem(response[0].id,this.trayItems)
            .subscribe(
              response => {
                 this.alertService.success("Items Updated Successfully To Tray", this.options)
              },
              error => {
                this.alertService.error(error.error.message, this.options)
                console.log(error);
              });
          }
          else{
            this.rackService.createTrayItems(this.trayItems)
            .subscribe(
              response => {
                 this.alertService.success("Items Added Successfully To Tray", this.options)
                 this.elasticSearch.name=this.rackName;
                 this.elasticSearch.rackId=this.trayItems.rackId;
                 this.filteredTemplates = response.filter(templateForms => templateForms.id == formId);
                 this.elasticSearch.attributes = this.filteredTemplates[0].attributes;
                 this.userService.updateUserElasticSearchUrl(this.UserObj.id,this.elasticSearch)
                 .subscribe(response=>{
                   console.log(response);
                 })
              },
              error => {
                this.alertService.error(error.error.message, this.options)
                console.log(error);
              });
          }
        }

      )
  }

  editForm(){
    this.formService.getAllProductsByItemTempId(this.id, this.name)
    .subscribe(
      data => {
        this.formListing(data)
      });
  }

  formListing(serverData) {
    var rowDataList: any = [];
    serverData.forEach(dbRecord => {
      var rowdata;
      //Prepare Row Data
      rowdata = Object.assign({ "id": dbRecord.id })

      //Extract label and values from the Attributes
      dbRecord.attributes.forEach(dbRecordCol => {
        var colVal = dbRecordCol.value ? dbRecordCol.value : ""
        var colLabel = dbRecordCol.label
        rowdata = Object.assign(rowdata, { [colLabel]: colVal })
      });
      
      rowdata = Object.assign(rowdata, { "quantity": this.quantity })
      rowdata = Object.assign(rowdata, { "actions": `` })
      //push a record 
      rowDataList.push(rowdata);
    });
    
    //Extract column names
    this.displayedColumns = Object.getOwnPropertyNames(rowDataList[0])
    this.dataSource.data = rowDataList
  }


  private extractData(serverData) {

    serverData.forEach(dbRecord => {
      var rowdata;
      // Prepare Row Data
      
      // rowdata = Object.assign(rowdata, {"name":dbRecord.name})
      if (this.trayId != undefined) {
        this.rackService.fetchTemplateAndTrayById(parseInt(this.id), parseInt(this.trayId))
          .subscribe(
            response => {
              if (response.length > 0) {
                rowdata = Object.assign({ "id": dbRecord.id })
                for (let i = 0; i < response.length; i++) {
                  if(dbRecord.id == response[i].formId) {
                    this.quantity = response[i].quantity;
                    if (this.isQuantity) {
                      dbRecord.attributes.forEach(dbRecordCol => {
                        var colVal = dbRecordCol.value ? dbRecordCol.value : ""
                        var colLabel = dbRecordCol.label
                        rowdata = Object.assign(rowdata, { [colLabel]: colVal })
                      });

                      rowdata = Object.assign(rowdata, { "quantity": this.quantity })
                      rowdata = Object.assign(rowdata, { "actions": `` })
                      // push a record 
                    }
                    this.rowDataList.push(rowdata);
                    // Extract column names
                     this.displayedColumns = Object.getOwnPropertyNames(this.rowDataList[0])
                     this.dataSource.data = this.rowDataList;
                  }
                  
                  }
                   
              }
              else {
                this.formListing(serverData);
              }
            }
          )
      } else {
        this.formListing(serverData);
      }
    });
  }

  editFormList(serverData){
    var rowDataList: any = [];
    serverData.forEach(dbRecord => {
      var rowdata;
      //Prepare Row Data
      rowdata = Object.assign({ "id": dbRecord.id })

      //Extract label and values from the Attributes
      dbRecord.attributes.forEach(dbRecordCol => {
        var colVal = dbRecordCol.value ? dbRecordCol.value : ""
        var colLabel = dbRecordCol.label
        rowdata = Object.assign(rowdata, { [colLabel]: colVal })
      });
      
      rowdata = Object.assign(rowdata, { "quantity": `` })
      rowdata = Object.assign(rowdata, { "actions": `` })
      //push a record 
      rowDataList.push(rowdata);
    });
    //Extract column names
    this.displayedColumns = Object.getOwnPropertyNames(rowDataList[0])
    this.rackService.fetchTemplateAndTrayById(parseInt(this.id), parseInt(this.trayId))
    .subscribe(response=>{
      this.dataSource.data = this.filterObjects(rowDataList, response);
      this.dataSource.data = this.dataSource.data.sort((a, b) => b.id - a.id);
    })

  }

  filterObjects = (arr1, arr2) => {
       let res = [];
       res = arr1.filter(formList => {
          return !arr2.find(retrievedFromDb => {
             return retrievedFromDb.formId === formList.id;
          });
       });
       return res;
    }

}
