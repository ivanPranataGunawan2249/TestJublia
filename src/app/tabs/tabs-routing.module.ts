import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../favorite/favorite.module').then(
                (m) => m.FavoritePageModule
              ),
          },
        ],
      },
      {
        path: 'home/:index',
        loadChildren: () =>
          import('../details/details.module').then((m) => m.DetailsPageModule),
      },
      {
        path: 'favorite/:index',
        loadChildren: () =>
          import('../details/details.module').then((m) => m.DetailsPageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
