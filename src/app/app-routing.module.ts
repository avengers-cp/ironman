import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    ...canActivate(redirectLoggedInTo(['/tabs/tab1']))
  },
  {
    path: 'forgot-password',
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule',
    ...canActivate(redirectLoggedInTo(['/tabs/tab1']))
  },
  {
    path: 'create-exercise',
    loadChildren: './pages/admin/create-exercise/create-exercise.module#CreateExercisePageModule'
    // canActivate: []
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
