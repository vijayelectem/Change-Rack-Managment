import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';
import { AddTemplateComponent } from './components/add-template/add-template.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddFormComponent } from './components/add-form/add-forms.component';
import { EditFormsComponent } from './components/edit-forms/edit-forms.component';
import { FormListComponent } from './components/forms-list/forms-list.component';
import { CreateRackComponent } from './components/create-rack/create-rack.component';
import { RackListComponent } from './components/rack-list/rack-list.component';
import { EditRackComponent } from './components/edit-rack/edit-rack.component';
import { TrayComponent } from './components/tray-crud/tray.component';
import { StaffCrudComponent } from './staff-crud/staff-crud.component';
import { AddStaffComponent } from './add-edit-staff/add-edit-staff.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileListingComponent } from './components/profile-listing/profile-listing.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ItemListingComponent } from './components/item-crud/item-listing.component';
import { StoreListingComponent } from './store-listing/store-listing.component';
import { AddEditStoreComponent } from './add-edit-store/add-edit-store.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: 'dashboard', component:DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'template', component: TemplateListComponent },
  { path: 'template/:id', component: TemplateDetailsComponent },
  { path: 'add', component: AddTemplateComponent },
  { path: 'addTemplate', component: EditAppComponent },
  { path: 'edit/:id', component: EditFormComponent },
  { path: 'edit/:name/:id', component: EditFormComponent},
  { path: 'addForm', component: AddFormComponent },
  { path: 'addForm/:id', component: AddFormComponent},
  { path: 'addForm/:name/:id', component: AddFormComponent},
  { path: 'EditForm/:name/:id', component: EditFormsComponent },
  { path: 'form/:name/:id', component: FormListComponent },
  { path: 'menu/:id', component: AppComponent },
  { path: 'menu/:name/:id', component: FormListComponent},
  { path: 'createRack', component: CreateRackComponent},
  { path: 'racks', component:RackListComponent},
  { path: 'stores', component:StoreListingComponent},
  { path: 'editRack/:id', component:EditRackComponent},
  { path: 'racklayout/:id/:name', component:TrayComponent},
  { path: 'staff', component:StaffCrudComponent},
  { path: 'add-staff', component:AddStaffComponent},
  { path: 'add-store', component:AddEditStoreComponent},
  { path: 'edit-staff/:id', component:AddStaffComponent},
  { path: 'edit-store/:storeId', component:AddEditStoreComponent},
  { path: 'forgotpassword', component:ForgotPasswordComponent},
  { path: 'userProfile/:id', component:UserProfileComponent},
  { path: 'profileListing/:user_fk', component:ProfileListingComponent},
  { path: 'changePassword', component:ChangePasswordComponent},
  { path: 'form/:name/:id', component: FormListComponent },
   { path: 'itemList/:trayListId/:rackId/:rackName', component: ItemListingComponent},

  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
