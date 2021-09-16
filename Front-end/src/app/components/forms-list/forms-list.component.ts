import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/form.model';
import { FormService } from './../../services/app.form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { UserPreference } from 'src/app/user-preference';
import { UserPreferenceService } from 'src/app/user-preference.service';
import { ArrayDataSource } from '@angular/cdk/collections';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
const columnLength = environment.columnLength;
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
  public columnShowHideLists: CustomColumn[] = [];
  currentTemplate?: Product;
  currentIndex = -1;
  name = '';
  tempid = 0;
  clientFk = '';
  UserObj: any = {};
  templateName: any;

  userPreference: UserPreference = {
    id: 0,
    userFk: 0,
    templateId: 0,
    selectedColumn: ''
  };

  userSelectedColumns: string[];

  showHideColumn = false;

  displayedColumns: string[] = [];
  selectedColumn = this.displayedColumns.toString();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns: string;
  constructor(private formService: FormService,
    private userPreferenceService: UserPreferenceService,
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
    //this.retrieveSelectedColumns(this.tempid,this.UserObj.id);
  }

  retrieveForms(): void {
    this.formService.getAllProductsByItemTempId(this.tempid, this.route.snapshot.params.name)
      .subscribe(
        data => {
          this.extractData(data)
          this.retrieveSelectedColumns(this.tempid, this.UserObj.id);
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
    this.router.navigate(['/addForm/' + this.route.snapshot.params.name + '/' + this.tempid]);
  }

  private extractData(serverData) {
    var rowDataList: any = [];

    serverData.forEach(dbRecord => {

      var rowdata;
      //Prepare Row Data
      rowdata = Object.assign({ "id": dbRecord.id })
      // rowdata = Object.assign(rowdata, {"name":dbRecord.name})

      //Extract label and values from the Attributes
      dbRecord.attributes.forEach(dbRecordCol => {
        var colVal = dbRecordCol.value ? dbRecordCol.value : ""
        var colLabel = dbRecordCol.label
        rowdata = Object.assign(rowdata, { [colLabel]: colVal })
      });
      rowdata = Object.assign(rowdata, { "actions": `<a  class="bi-pencil-fill" data-toggle="tooltip" data-placement="bottom" title="Edit Form" href="http://localhost:4200/EditForm/${this.route.snapshot.params.name}/${dbRecord.id}"></a>` })
      //push a record 
      rowDataList.push(rowdata);
    });

    //Extract column names
    this.displayedColumns = Object.getOwnPropertyNames(rowDataList[0])
    if (this.displayedColumns.length > columnLength) {
      this.showHideColumn = true;
      this.initializeColumnProperties();
    }
    this.dataSource.data = rowDataList
  }

  initializeColumnProperties() {

    this.displayedColumns.forEach((element, index) => {
      if (this.columnShowHideList.length == this.displayedColumns.length - 1) {

      }
      else
        if (element == 'actions') {

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

  saveUserSelected(): void {
    this.userPreference.selectedColumn = this.displayedColumns.toString(),
      this.userPreference.templateId = this.tempid,
      this.userPreference.userFk = this.UserObj.id
    if (this.userPreference.id) {
      this.updateSelectedColumns(this.userPreference.id);
    } else {
      this.userPreferenceService.createUserPreference(this.userPreference)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
    }

  }

  retrieveSelectedColumns(tempid, userFk): void {
    this.userPreferenceService.getAllSelectedColumns(this.tempid, userFk)
      .subscribe(
        data => {
          if (data.length > 0) {
            this.userPreference = data[0];
            this.userSelectedColumns = data[0].selectedColumns.split(",");
            this.displayedColumns = this.userSelectedColumns;
            for (let x = 0; x < this.columnShowHideList.length - 1; x++) {
              for (let y = 0; y < this.displayedColumns.length - 1; y++) {
                if (this.displayedColumns[x] === this.columnShowHideList[y].name) {
                  this.columnShowHideList[y].isActive = false;
                } else {
                  this.columnShowHideList[y].isActive = true;
                }
              }
            }
          }
        });
  }

  toggleColumns(column) {

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


  updateSelectedColumns(id: number) {
    this.userPreferenceService.updateSelectedColumns(id, this.userPreference)
      .subscribe(data => {
        console.log(data);
        this.userPreference = data;
        //this.router.navigate(['/racks']);
      }, error => {
        console.log(error);
      });
  }

}