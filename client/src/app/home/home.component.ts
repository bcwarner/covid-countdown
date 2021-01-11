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

  displayedCols = ["name", "days", "date",];

  constructor(private homeService: HomeService) { 
    
  }

  ngOnInit(): void {
    this.homeService.getStats().subscribe(res => this.stats = res);
    this.homeService.getData().subscribe(res => this.projections = res);
  }

}
