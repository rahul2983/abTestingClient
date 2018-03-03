import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../root/root.component';
import { TestPageComponent } from '../test-page/test-page.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'testPage.html', component: TestPageComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
