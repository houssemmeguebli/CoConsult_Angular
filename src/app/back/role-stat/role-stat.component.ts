import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { StatService } from 'src/app/_services/stat/stat.service';


@Component({
  selector: 'app-role-stat',
  templateUrl: './role-stat.component.html',
  styleUrls: ['./role-stat.component.css']
})
export class RoleStatComponent {

  @ViewChild('roleChart') roleChart!: ElementRef<HTMLCanvasElement>;

  constructor(private statsService: StatService) {}

  ngOnInit(): void {}

 
}

