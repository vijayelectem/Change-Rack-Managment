import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/form.model';
import { FormService } from './../../services/app.form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
const columnLength=environment.columnLength;
interface CustomColumn {
  possition: number;
  name: string;
  isActive: boolean;
}
@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormListComponent implements OnInit {
  products?: Product[];
  public columnShowHideList: CustomColumn[] = [];
  currentTemplate?: Product;
  currentIndex = -1;
  name = '';
  tempid = '';
  clientFk = '';
  UserObj: any = {};
  templateName: any;
  showHideColumn=false;

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private formService: FormService,
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {
      route.params.subscribe(val => {
        this.tempid = this.route.snapshot.params['id'];
        this.retrieveForms();
        this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
        this.clientFk = this.UserObj.clientFk;
      });
     }

     ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    dataSource = new MatTableDataSource<any>();
    
  ngOnInit(): void {
    //this.getData();
    this.tempid = this.route.snapshot.params['id'];
    this.retrieveForms();
    this.UserObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.clientFk = this.UserObj.clientFk;
  }

  retrieveForms(): void {    
    this.formService.getAllProductsByItemTempId(this.tempid, this.route.snapshot.params.name)
      .subscribe(
        data => {
          this.extractData(data)
        });
  }

  refreshList(): void {
    this.retrieveForms();
    this.currentTemplate = undefined;
    this.currentIndex = -1;
  }

  setActiveTemplate(Template: Product, index: number): void {
    this.currentTemplate = Template;
    this.currentIndex = index;
  }

  removeAllTemplates(): void {
    this.formService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentTemplate = undefined;
    this.currentIndex = -1;

    this.formService.findByFormsName(this.name)
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteFormData(id): void {
    this.formService.deleteFormData(id, this.route.snapshot.params.name)
      .subscribe(
        response => {
          console.log(response);
          this.formService.getAll(this.clientFk);
          this.router.navigate(['/template']);
        },
        error => {
          console.log(error);
        });
  }


  removeForm(id) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to remove this form?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.value) {
        this.deleteFormData(id);
      }
    });

  }

  addNewForm(): void {
    this.router.navigate(['/addForm/' + this.route.snapshot.params.name + '/' + this.tempid ]);
  }

  private extractData(serverData) {
    var rowDataList:any = [];

    serverData.forEach(dbRecord => {

      var rowdata; 
      //Prepare Row Data
      rowdata = Object.assign({"id":dbRecord.id})
     // rowdata = Object.assign(rowdata, {"name":dbRecord.name})

      //Extract label and values from the Attributes
      dbRecord.attributes.forEach(dbRecordCol => {
        var colVal = dbRecordCol.value ? dbRecordCol.value : ""
        var colLabel = dbRecordCol.label
        rowdata = Object.assign(rowdata, { [colLabel]:colVal })
      });
      rowdata = Object.assign(rowdata, {"actions": `<a  class="bi-pencil-fill" data-toggle="tooltip" data-placement="bottom" title="Edit Form" href="http://localhost:4200/EditForm/${this.route.snapshot.params.name}/${dbRecord.id}"></a>`})
      //push a record 
      rowDataList.push(rowdata);
    });

    //Extract column names
    this.displayedColumns = Object.getOwnPropertyNames(rowDataList[0])
    if(this.displayedColumns.length>columnLength){
      this.showHideColumn=true;
      this.initializeColumnProperties();
    }
    this.dataSource.data = rowDataList
  }
  
  initializeColumnProperties() {
    
    this.displayedColumns.forEach((element, index) => {
      if(this.columnShowHideList.length == this.displayedColumns.length-1){
          
      }
      else
      if(element == 'actions'){

      }
        else
        this.columnShowHideList.push(
          { possition: index, name: element, isActive: true }
        );
        
    }); 
    
  }
  
  toggleColumn(column) {
    if (column.isActive) {
      if (column.possition > this.displayedColumns.length - 1) {
        this.displayedColumns.push(column.name);
      } else {
        this.displayedColumns.splice(column.possition, 0, column.name);
      }
    } else {
      let i = this.displayedColumns.indexOf(column.name);
      let opr = i > -1 ? this.displayedColumns.splice(i, 1) : undefined;
    }
  }

  private getData(): any {
    this.http.get('/assets/testdata/itemlisting.json')
    .subscribe((data: any) => {
      this.extractData(data)      
    });
  }

}