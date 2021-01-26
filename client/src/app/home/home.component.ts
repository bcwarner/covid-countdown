import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projections: Object[][];
  stats: Map<String, number>;
  r2: "r^2";

  displayedCols = ["name", "days", "date"];
  lowerCols: number;
  uppercols: number;

  constructor(private homeService: HomeService) { 
    
  }

  ngOnInit(): void {
    this.homeService.getStats().subscribe(res => this.stats = res);
    this.homeService.getData().subscribe(res => this.projections = res);

    this.lowerCols = (window.innerWidth <= 400) ? 1 : 3;
    this.uppercols = (window.innerWidth <= 400) ? 1 : 4;
  }

  windowResize(event) {
    this.lowerCols = (event.target.innerWidth <= 400) ? 1 : 3;
    this.uppercols = (event.target.innerWidth <= 400) ? 1 : 4;
  }
}
