export class ProfileDetails{
    constructor(
       public id:number,
       public userName:string,
       public familyName:string,
       public currentPointsAmount:number,
       public type:string,
       public pointsPerYear:number,
       public pic:string,
       public totalUsedPoints:number,
       public amoutOfOrders:number,
       public phoneNumber:string,
       public drivingLicense:string,
       public idNumber:string,
       public city:string,
       public street:string
    ){}
}