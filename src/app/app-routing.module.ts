import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'tabs/home',
    redirectTo: '',
    pathMatch: 'full',
  },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomePageModule),
  // },
  // {
  //   path: 'home/:index',
  //   loadChildren: () =>
  //     import('./details/details.module').then((m) => m.DetailsPageModule),
  // },
  // {
  //   path: 'favorite',
  //   loadChildren: () =>
  //     import('./favorite/favorite.module').then((m) => m.FavoritePageModule),
  // },
  // {
  //   path: 'favorite/:index',
  //   loadChildren: () =>
  //     import('./details/details.module').then((m) => m.DetailsPageModule),
  // },
  // {
  //   path: 'tabs/home',
  //   loadChildren: () =>
  //     import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
