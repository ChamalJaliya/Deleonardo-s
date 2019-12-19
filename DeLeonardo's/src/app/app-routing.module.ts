import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { RegisterComponent } from "./auth/components/register/register.component";
import { HomeComponent } from "./core/home/home.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { MainComponent } from "./core/main/main.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { AdminComponent } from "./admin/containers/admin/admin.component";
import { AdminGuard } from "./admin/guard/admin.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", component: MainComponent },
      {
        path: "recipes",
        loadChildren: "./recipes/recipes.module#RecipesModule",
        canActivate: [AuthGuard]
      },
      {
        path: "shopping-list",
        loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule",
        canActivate: [AuthGuard]
      },
      {
        path: "profile",
        loadChildren: "./profile/profile.module#ProfileModule",
        canActivate: [AuthGuard]
      },
      {
        path: "category",
        loadChildren:
          "./recipesCat/recipeCategories/categories.module#CategoriesModule",
        canActivate: [AuthGuard]
      },
      {
        path: "contact",
        loadChildren: "./contact/contact.module#ContactModule",
        canActivate: [AuthGuard]
      },
      {
        path: "charts",
        loadChildren: "./charts/charts.module#ChartsDataModule",
        canActivate: [AuthGuard]
      },
      {
        path: "admin-panel",
        component: AdminComponent,
        canActivate: [AdminGuard]
      }
    ]
  },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
