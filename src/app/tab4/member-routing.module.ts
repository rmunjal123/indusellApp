import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tab4', loadChildren: './tab4/tab4.module#tab4PageModule'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule { }
