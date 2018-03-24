import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoadUrlService } from './services/load-url.service';
import { HttpClientModule } from '@angular/common/http';

import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { TestPageComponent } from './test-page/test-page.component';
import { HomeComponent } from './home/home.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { CustomCodeViewComponent } from './custom-code-view/custom-code-view.component';
import { FroalaWusiwygComponent } from './froala-wusiwyg/froala-wusiwyg.component';
import { ActivateComponent } from './activate/activate.component';
import { TestControlComponent } from './test-control/test-control.component';
import { TestVariationComponent } from './test-variation/test-variation.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    TestPageComponent,
    HomeComponent,
    CreateTestComponent,
    CustomCodeViewComponent,
    FroalaWusiwygComponent,
    ActivateComponent,
    TestControlComponent,
    TestVariationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  providers: [LoadUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
