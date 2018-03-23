import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// reference -> https://github.com/froala/angular-froala-wysiwyg/issues/17 for fixing issues with froala and jQuery
import * as $ from 'jquery'; 
window["$"] = $;
window["jQuery"] = $;

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
