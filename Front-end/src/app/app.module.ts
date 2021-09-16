import { AlertModule } from './components/_alert/alert.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { DndModule } from 'ngx-drag-drop';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTemplateComponent } from './components/add-template/add-template.component';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddFormComponent } from './components/add-form/add-forms.component';
import { EditFormsComponent } from './components/edit-forms/edit-forms.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { RackListComponent } from './components/rack-list/rack-list.component';
import { EditRackComponent } from './components/edit-rack/edit-rack.component';
import { CreateRackComponent } from './components/create-rack/create-rack.component';
import { TrayModule } from './components/tray-crud/tray.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StaffCrudComponent } from './staff-crud/staff-crud.component';
import { AddStaffComponent } from './add-edit-staff/add-edit-staff.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileListingComponent } from './components/profile-listing/profile-listing.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import { LoggingInterceptor } from './logging.interceptor';
import { ChartsModule } from 'ng2-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormListComponent } from './components/forms-list/forms-list.component';
import { AddEditStoreComponent } from './add-edit-store/add-edit-store.component';
import { StoreListingComponent } from './store-listing/store-listing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreeviewModule } from 'ngx-treeview';
const appRoutes: Routes = [
  // { path: '', component: EditAppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EditAppComponent,
    AddTemplateComponent,
    TemplateDetailsComponent,
    TemplateListComponent,
    EditFormComponent,
    AddFormComponent,
    EditFormsComponent,
    FormListComponent,
    RackListComponent,
    EditRackComponent,
    CreateRackComponent,
    StaffCrudComponent,
    AddStaffComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    ProfileListingComponent,
    ChangePasswordComponent,
    AddEditStoreComponent,
    StoreListingComponent,
    DashboardComponent,
    
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    SweetAlert2Module.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    AppRoutingModule,
    DndModule,
    MatSliderModule,
    MatToolbarModule,
    MatTableModule,
    TrayModule,
    NgSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    AlertModule,
    NgxNumberSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    TreeviewModule.forRoot()
  ],
    providers: [ DatePipe,
    {provide:HTTP_INTERCEPTORS,useClass:LoggingInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
