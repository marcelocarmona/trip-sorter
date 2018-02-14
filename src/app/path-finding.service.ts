import { Injectable } from '@angular/core';
import { Deal, City, Trips } from './api';
import { BinaryHeap } from './heap';

interface Graph {
  [city: string]: {
    [city: string]: UiDeal[]
  };
}

type Criteria = 'netCost' | 'durationInMinutes';

export interface UiDeal extends Deal {
  durationInMinutes: number;
  netCost: number;
}

interface AuxiliaryDataStructure {
  parent?: City;
  weight?: number;
}

@Injectable()
export class PathFindingService {

  constructor() { }


  dijkstra(trips: Trips, origin: City, destination: City, criteria: Criteria): UiDeal[] {
    const graph = this.createGraph(trips);
    const auxiliaryDataStructure = this.createAuxiliaryDataStructure(graph);
    const heap = new BinaryHeap(deal => deal.weight);

    auxiliaryDataStructure[origin].weight = 0;
    heap.push({city: origin, weight: 0});

    while (heap.size() > 0) {
      const minimumValue = heap.pop();
      auxiliaryDataStructure[minimumValue.city].visited = true;

      Object.keys(graph[minimumValue.city]).forEach(departure => {
        if (!auxiliaryDataStructure[departure].visited &&
          auxiliaryDataStructure[departure].weight > auxiliaryDataStructure[minimumValue.city].weight) {
            auxiliaryDataStructure[departure].parent = graph[minimumValue.city][departure]
            .reduce((p , v ) => p[criteria] < v[criteria] ? p : v);
            auxiliaryDataStructure[departure].weight =
              auxiliaryDataStructure[departure].parent[criteria] + auxiliaryDataStructure[minimumValue.city].weight;
            heap.push({city: departure, weight: auxiliaryDataStructure[departure].weight});
        }
      });
    }

    return getPath(destination).reverse();

    /**
     * Recursive calls that create the path from the origin to the destination and retorn an array of deals
     */
    function getPath(departure: City): UiDeal[] {
      const previousDeparture = auxiliaryDataStructure[departure].parent.departure;
      return previousDeparture !== origin
      ? [ auxiliaryDataStructure[departure].parent, ...getPath(previousDeparture)]
      : [auxiliaryDataStructure[departure].parent];
    }
  }

  /**
   * Create a dictionary between cities and their connected cities
   */
  createGraph(trips: Trips): Graph {
    const graph: Graph = {};
    trips.deals.forEach(deal => {
      graph[deal.departure]
      ? graph[deal.departure][deal.arrival]
        ? graph[deal.departure][deal.arrival] = [
          ...graph[deal.departure][deal.arrival],
          this.dealsToUiDeals(deal)
        ]
        : graph[deal.departure] = {
        ...graph[deal.departure],
        [deal.arrival]: [
          this.dealsToUiDeals(deal)
        ]}
      : graph[deal.departure] = {
        [deal.arrival]: [this.dealsToUiDeals(deal)]
      };
    });
    return graph;
  }

  /**
   * Adding the filds durationInMinutes and netCost
   * These values ​​will allow us to calculate the weight of the edges of the graph.
   */
  dealsToUiDeals(deal: Deal): UiDeal {
    // distance
    const hours = parseInt(deal.duration.h, 10);
    const minutes = parseInt(deal.duration.m, 10);
    const durationInMinutes = hours * 60 + minutes;

    // cost
    const netCost = deal.cost - deal.discount * deal.cost * 0.01;

    return {...deal, durationInMinutes, netCost};
  }

  /**
   * Return an auxilar dictionary, weight can represent the cost or the time
   * E.g
   *
   * {
   *   Amsterdam: {
   *     weight: Infinity,
   *     parent: undefined,
   *     visited: false
   *   },
   *   Athens: {
   *     weight: Infinity,
   *     parent: undefined
   *     visited: false
   *   },
   *   Brussels: {
   *     weight: Infinity,
   *     parent: undefined,
   *     visited: false
   *   },
   *   ...
   * }
   *
   */
  createAuxiliaryDataStructure(graph: Graph): AuxiliaryDataStructure {
    return Object.keys(graph).reduce((previous, current) => ({
      ...previous,
      [current]: {
        parent: undefined,
        weight: Infinity,
        visited: false
      }
    }), {});
  }

}
