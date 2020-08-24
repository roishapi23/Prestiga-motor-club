export class CarData{
   constructor(
       public company?:string,
       public model?:string,
       public submodel?:string,
       public engine?:string,
       public hp?:number,
       public topSpeed?:number,
       public pictures?: [{picture:string},{picture:string},{picture:string},{picture:string}],
       public productionYear?:number,
       public numberOfSeats?:number,
       public trunkSize?:number,
       public color?:string,
       public interiorColor?:string,
       public pointsPerDay?:number,
       public kilometersPerDay?:number,
       public carLocation?:number,
       public id?:number
    
    ){}
}