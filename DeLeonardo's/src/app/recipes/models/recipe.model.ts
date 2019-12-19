export class Recipe {
  public key?: any;
  public title?: string;
  public description?: string;
  public photoUrl?: string;

  constructor(title: string, description: string, photoUrl: string) {
    this.title = title;
    this.description = description;
    this.photoUrl = photoUrl;
  }
}
