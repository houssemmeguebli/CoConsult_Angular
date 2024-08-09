import { Component , OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.css']
})
export class NavbarBackComponent  implements OnInit {
  role!:string;
  name!:string;
  constructor(private authService: AuthenticationService) { }



  ngOnInit(): void {
    this.role  = this.authService.logDecodedToken();
    this.name= this.authService.logDecodedTokenName();



  }
}
