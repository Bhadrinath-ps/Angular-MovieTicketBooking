import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../Register.service';
import { profiledata } from '../profileModel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.css']
})
export class EditProfileComponent implements OnInit {

  dataId: any;
  public profile: profiledata = {} as profiledata;

  constructor(
    private service: RegisterService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService) { }

  ngOnInit() {
    this.logger.log("EditProfile Component Initialized");

    this.route.paramMap.subscribe((param: Params) => {
      this.dataId = param['get']('id')
    })

    this.service.getProfilesById(this.dataId).subscribe((data: any) => {
      this.profile = data;
      this.logger.log(JSON.stringify(this.profile));
    })
  }

  updateProfile() {
    this.service.updateProfiles(this.profile, this.dataId).subscribe((data: any) => {
      this.router.navigateByUrl('/Profile');
    })
  }
}
