import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './shell/not-found/not-found.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserResolver } from './users/user-details/user-resolver.service';
import { UserListComponent } from './users/user-list/user-list.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/:userName',
    component: UserDetailsComponent,
    resolve: { userResolvedData: UserResolver },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
