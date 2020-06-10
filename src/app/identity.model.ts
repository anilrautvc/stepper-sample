export class Identity {
  public id: number;
  public name: string;
  public description: string;
  public contacts: any[];
  public cities: any[];

  constructor(id: number, name: string, description: string, contacts: any[], cities: any[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.contacts = contacts;
    this.cities = cities;
  }
}
