import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ListeEtudiantComponent } from './liste-etudiant/liste-etudiant.component';
import { CreerEtudiantComponent } from './creer-etudiant/creer-etudiant.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'register/login', component: LoginComponent },
  { path: 'app-liste-etudiant', component: ListeEtudiantComponent },
  { path: 'app-creer-etudiant', component: CreerEtudiantComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
