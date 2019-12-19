import { Router } from "@angular/router";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { User } from "../../auth/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() user: User;
  @Input() isLoggedIn: boolean;
  @Input() isLoading: boolean;
  @Input() isAdmin: boolean;

  @Output() logout = new EventEmitter<User>();

  constructor(private router: Router) {}

  ngOnInit() {}

  onLogout() {
    this.logout.emit(this.user);
  }
  onProfile() {
    this.router.navigate(["./profile"]);
  }

  onShopingCart() {
    this.router.navigate(["./shopping-list"]);
  }
}
