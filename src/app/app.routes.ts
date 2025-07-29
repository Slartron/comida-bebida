import { Routes } from '@angular/router';
import { MemberSearch } from './components/member-search/member-search';
import { ConsumptionDisplay } from './components/consumption-display/consumption-display';
import { NgDemo } from './components/ng-demo/ng-demo';

export const routes: Routes = [
  {
    path: '',
    component: MemberSearch,
  },
  {
    path: 'demo',
    component: NgDemo,
  },
  { path: 'details', component: ConsumptionDisplay },
];
