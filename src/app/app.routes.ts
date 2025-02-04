import { Routes } from '@angular/router';

import { StarterStoreComponent } from './components/starter-store/starter-store.component';
import { ProductComponent } from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import { AuthUserComponent } from './components/auth-user/auth-user.component';

export const routes: Routes = [
  { path: '', component: StarterStoreComponent },
  { path:'product/:productId', component: ProductComponent },
  { path:'cart', component: CartComponent },
  { path:'auth', component: AuthUserComponent }
];
