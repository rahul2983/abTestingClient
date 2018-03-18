import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../root/root.component';
import { TestPageComponent } from '../test-page/test-page.component';
import { HomeComponent } from '../home/home.component';
// import { CreateTestComponent } from '../create-test/create-test.component';
import { CustomCodeViewComponent } from '../custom-code-view/custom-code-view.component';
import { VisualEditorComponent } from '../visual-editor/visual-editor.component';
import { FroalaWusiwygComponent } from '../froala-wusiwyg/froala-wusiwyg.component';
import { ActivateComponent } from '../activate/activate.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'testPage.html', component: TestPageComponent},
  { path: 'home', component: HomeComponent },
  // { path: 'create', component: CreateTestComponent },
  { path: 'customCodeView', component: CustomCodeViewComponent },
  { path: 'visualEditorView', component: VisualEditorComponent },
  { path: 'wysiwyg', component: FroalaWusiwygComponent },
  { path: 'activate', component: ActivateComponent }
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
