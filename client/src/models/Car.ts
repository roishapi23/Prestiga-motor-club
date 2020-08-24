import { Picture } from './Picture';
import { CarData } from './Car details';
export class Car{
    
    constructor(

        // public details:CarData,
        // public pictures:Picture[]
       public company?:string,
       public model?:string,
       public submodel?:string,
       public engine?:string,
       public hp?:number,
       public topSpeed?:number,
       public pictures?: string,
       public productionYear?:number,
       public numberOfSeats?:number,
       public trunkSize?:number,
       public color?:string,
       public interiorColor?:string,
       public pointsPerDay?:number,
       public kilometersPerDay?:number,
       public carLocation?:number,
       public isAvailble?:string,
       public youtubeVid?:string,
       public id?:number
    
    ){}
}