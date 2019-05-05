import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ProblemListResolver } from './_resolvers/problems-list.resolver';
import { ProblemListComponent } from './problems/problem-list/problem-list.component';
import { ProblemDetailComponent } from './problems/problem-detail/problem-detail.component';
import { ProblemDetailResolver } from './_resolvers/problem-detail.resolver';
import { Observable } from 'rxjs';
import { isSymbol } from 'util';
import { ProblemEditResolver } from './_resolvers/problem-edit.resolver';
import { ProblemEditComponent } from './problems/problem-edit/problem-edit.component';
import { PreventUnsavedChangesProblem } from './_guards/prevent-unsaved-changes-problem.guard';
import { RegisterProblemComponent } from './register-problem/register-problem.component';

export const appRoutes: Routes = [
  { path: 'home',
    component: ProblemListComponent,
    data: {
      path: 'home'
    },
    resolve: {problems: ProblemListResolver} },
    { path: '',
    component: ProblemListComponent,
    data: {
      path: 'home'
    },
    resolve: {problems: ProblemListResolver} },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'problems',
        component: ProblemListComponent,
        data: {path: 'problems'},
        resolve: { problems: ProblemListResolver }
      },
      {
        path: 'problems/my',
        component: ProblemListComponent,
        data: {
               isMy: true,
               path: 'problems/my'
              },
        resolve: { problems: ProblemListResolver, }
      },
      {
        path: 'problems/my/edit/:id',
        component: ProblemEditComponent,
        data: {isMy: true},
        resolve: { problem: ProblemEditResolver },
        canDeactivate: [PreventUnsavedChangesProblem]
      },
      {
        path: 'problems/:id',
        component: ProblemDetailComponent,
        resolve: { problem: ProblemDetailResolver }
      },
      {
        path: 'problem/add',
        component: RegisterProblemComponent
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: 'messages', component: MessagesComponent },
      {
        path: 'lists',
        data: {path: 'lists'},
        component: ListsComponent ,
        resolve: { problems: ProblemListResolver }
      }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
