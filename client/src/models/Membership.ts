export class Membership{
    constructor(
       public type:string,
       public membershipPrice:number,
       public pointsPerYear:number,
       public pricePerPoint:number,
       public yearsOfMembership:number,
       public prepayment:string,
       public monthlyPayment:string,
       public pic:string,
       public id?:number
    ){}
}