import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './app-error.handler';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxNLoggerModule } from 'ngx-n-logger';
import { NgxPaginationModule } from 'ngx-pagination';
import { Web3ConfigService } from './services';
import { components } from './components';
import { components as layoutComponents } from './layout';

@NgModule({
  declarations: [AppComponent, ...layoutComponents, ...components, FilterPipe],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    AppRoutingModule,
    // NgxNLoggerModule.forRoot({
    //   enableInterceptorLogging: true,
    //   isProduction: false,
    // }),
  ],
  providers: [
    Web3ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeWeb3,
      deps: [Web3ConfigService],
      multi: true,
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// load web3 config
export function initializeWeb3(appConfig: Web3ConfigService): any {
  return () => appConfig.load();
}
