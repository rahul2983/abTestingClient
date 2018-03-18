import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoadUrlService } from './services/load-url.service';
import { HttpClientModule } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { HomeComponent } from './home/home.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { CustomCodeViewComponent } from './custom-code-view/custom-code-view.component';
import { VisualEditorComponent } from './visual-editor/visual-editor.component';
import { FroalaWusiwygComponent } from './froala-wusiwyg/froala-wusiwyg.component';
import { ActivateComponent } from './activate/activate.component';


@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    TestPageComponent,
    ContextMenuComponent,
    HomeComponent,
    CreateTestComponent,
    CustomCodeViewComponent,
    VisualEditorComponent,
    FroalaWusiwygComponent,
    ActivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  entryComponents: [ContextMenuComponent],
  providers: [LoadUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
