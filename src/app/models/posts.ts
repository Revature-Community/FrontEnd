import { Loc } from "./location";
import { Locations } from "./locations";

export class Posts {
    static find(arg0: Posts, arg1: boolean) {
      throw new Error('Method not implemented.');
    }
    [x: string]: any;
    constructor(
    //I'm going to add an id field to this class... So I need to add it to all instantiations of this class in every file...
    public id: number,
    public title: string,
    public content: string,
    public locationId: Locations, //change to location type later
    public categoryType: string, 
    public userId?: number,
    public username?: string
)
{}

}