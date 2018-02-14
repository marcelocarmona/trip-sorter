import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Trips, Deal, City, Cities } from './api';
import { BinaryHeap } from './heap';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { PathFindingService, UiDeal } from './path-finding.service';

@Component({
  selector: 'pf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  path: UiDeal[];
  cities: City[] = Cities;
  total: {totalCost: number, totalMinutes: number};
  searchForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
    criteria: new FormControl(),
  });
  subscription: Subscription;

  constructor(private apiService: ApiService, private pathFindingService: PathFindingService) {
  }

  search() {
    const from = this.searchForm.get('from').value;
    const to = this.searchForm.get('to').value;
    const criteria = this.searchForm.get('criteria').value;

    this.subscription = this.apiService.getAllTrips().subscribe(trips => {

      // path for the trip
      this.path = this.pathFindingService.dijkstra(trips, from, to, criteria);

      // calculate the total
      this.total = this.path.reduce((acumulate, deal) => ({
        totalCost : acumulate.totalCost + deal.netCost,
        totalMinutes: acumulate.totalMinutes + deal.durationInMinutes,
      }), {totalCost: 0, totalMinutes: 0});
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
