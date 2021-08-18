import { Downvote } from "./downvote";
import { Loc } from "./location";
import { Locations } from "./locations";
import { Pinstatus } from "./pinstatus";
import { Upvote } from "./upvote";

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
    // public upvotes: Upvote[],
    // public downvotes: Downvote[],
    public userId?: number,
    public username?: string,
    public activeState?: boolean,
    public pinstatus?: Pinstatus,
    

)
{}

}