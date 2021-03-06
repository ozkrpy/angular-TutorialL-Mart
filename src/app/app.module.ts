import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
//import { InventoryModule } from './inventory/inventory.module';
// import { ManagerModule } from './manager/manager.module';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component';
import { UiService } from './common/ui.service';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
    // ManagerModule, /* esto se debe comentar para que pueda funcionar el lazy-loading */
    //InventoryModule,
    //PosModule,
    //UserModule,
  ],
  providers: [
    AuthService,
    UiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
