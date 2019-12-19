import { RecipesModule } from "./../recipes/recipes.module";
import { RecentComponent } from "./homeMain/recently-added/recent.component";
import { SliderCatComponent } from "./../recipes/containers/main-category-slider/slider-cat.component";
import { CountryCategoriesComponent } from "./../recipes/containers/countries/categories.component";
import { SpecialCardComponent } from "./homeMain/special-cat/special-card.component";
import { RandomRecipeComponent } from "./homeMain/sliders/random-recipe.component";
import { LandingComponent } from "./homeMain/sliders/landing.component";
import { PopularComponent } from "./homeMain/popular/popular.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { MainComponent } from "./main/main.component";

import {
  ModalModule,
  CarouselModule,
  NavbarModule,
  DropdownModule,
  CardsModule,
  ButtonsModule,
  IconsModule
} from "angular-bootstrap-md";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TestimonialsComponent } from "./homeMain/testimonials/testimonials.component";

@NgModule({
  imports: [
    RecipesModule,
    CommonModule,
    NavbarModule,
    ModalModule,
    IconsModule,
    CarouselModule,
    RouterModule,
    DropdownModule.forRoot(),
    CardsModule,
    ButtonsModule
  ],
  declarations: [
    CountryCategoriesComponent,
    SliderCatComponent,

    SpecialCardComponent,
    PopularComponent,
    TestimonialsComponent,
    LandingComponent,
    RandomRecipeComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    RecentComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    MainComponent,
    HomeComponent
  ]
})
export class CoreModule {}
