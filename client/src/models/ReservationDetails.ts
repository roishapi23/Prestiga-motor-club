export class ReservationDetails{
    constructor(
       public company:string,
       public model:string,
       public startDate:string,
       public endDate:string,
       public pointsCost:number,
       public rentalDaysAmount:number,
       public reservationNumber?:string,
       public pictures?:string,
       public id?:number
    ){}
}