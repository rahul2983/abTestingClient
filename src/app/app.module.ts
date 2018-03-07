import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoadUrlService } from './services/load-url.service';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { InputFormComponent } from './input-form/input-form.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    InputFormComponent,
    TestPageComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [ContextMenuComponent],
  providers: [LoadUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
