import { Component, OnInit } from '@angular/core';
import { Template } from 'src/app/models/template.model';
import { FormService } from './../../services/app.form.service';

@Component({
  selector: 'app-add-Template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  Template: Template = {
    name: '',
    subscriberId: '',
  };
  submitted = false;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
  }

  saveTemplate(): void {
    const data = {
      name: this.Template.name,
      subscriberId: this.Template.subscriberId
    };

    this.formService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTemplate(): void {
    this.submitted = false;
    this.Template = {
      name: '',
      subscriberId: '',
    };
  }

}
