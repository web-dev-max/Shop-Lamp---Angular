import { Routes } from '@angular/router';

import { StarterStoreComponent } from './components/starter-store/starter-store.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
  { path: '', component: StarterStoreComponent },
  { path:'product/:productId', component: ProductComponent },
];
