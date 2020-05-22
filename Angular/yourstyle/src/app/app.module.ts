import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { UserServiceService } from './service/user-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { UpdateProfileComponent } from './components/user-profile/update-profile/update-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { ProductsComponent } from './components/products/products.component';
import { PublishComponent } from './components/admin/manage-products/publish/publish.component';
import { ManageProductComponent } from './components/admin/manage-products/manage-product/manage-product.component';
import { UpdateProductComponent } from './components/admin/manage-products/update-product/update-product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'logout', component: LogoutComponent,
  },
  {
    path: 'userprofile', component: UserProfileComponent,canActivate : [AuthGuard]
  },
  {
    path: 'updateprofile', component: UpdateProfileComponent,canActivate : [AuthGuard],
  },
  {
    path: 'manageusers', component: ManageUserComponent,canActivate : [AuthGuard]
  },
  {
    path: 'products', component: ProductsComponent,
  },
  {
    path: 'product-details', component: ProductDetailComponent,
  },
  {
    path: 'manageProducts', component: ManageProductComponent,
  },
  {
    path: 'publishProduct', component: PublishComponent,
  },
  {
    path: 'updateProduct', component: UpdateProductComponent,
  },
  {
    path: 'cart', component: CartComponent,
  },
  {
    path: 'wishlist', component: WishlistComponent,
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: '/home' , pathMatch: 'full',
  }


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    UserProfileComponent,
    AdminComponent,
    ManageUserComponent,
    UpdateProfileComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    ProductsComponent,
    PublishComponent,
    ManageProductComponent,
    UpdateProductComponent,
    ProductDetailComponent,
    CartComponent,
    WishlistComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    CarouselModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },UserServiceService, AuthGuard, AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }