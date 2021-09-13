import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile-listing',
  templateUrl: './profile-listing.component.html',
  styleUrls: ['./profile-listing.component.css']
})
export class ProfileListingComponent implements OnInit {

   displayedColumns: string[] = [ 'id', 'userName', 'email', 'phone','city','actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private profileService:UserProfileService,private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.fetchAllProfiles(this.route.snapshot.params.user_fk);
  }

  fetchAllProfiles(user_fk): void {
    this.profileService.fetchProfileByUserFK(user_fk)
      .subscribe(
        data => {
          this.dataSource.data = data;
        },
        error => {
          console.log(error);
        });
  }

  changePassword(id:any): void {
    this.router.navigate(['/changePassword',id]);
  }

}
