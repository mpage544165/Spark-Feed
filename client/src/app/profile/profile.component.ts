import { Component, Input } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails;

  activeComponent: string = 'topics';

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  setActiveComp(comp: string): void {
    this.activeComponent = comp;
  }
}
