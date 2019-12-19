import { Component } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent {
  longitude = 20.728218;
  latitude = 52.128973;

  markers = [{ latitude: 52.228973, longitude: 20.728218 }];
}
