import { Routes } from '@angular/router';
import { MemberSearch } from './components/member-search/member-search';
import { ConsumptionDisplay } from './components/consumption-display/consumption-display';

export const routes: Routes = [
  {
    path: '',
    component: MemberSearch,
  },
  { path: 'details', component: ConsumptionDisplay },
];
