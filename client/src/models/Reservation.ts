export class Reservation{
    constructor(
       public carId:number,
       public startDate:string,
       public endDate:string,
       public orderLocation:number,
       public rentalDaysAmount?:number,
       public id?:number,
       public reservationNumber?:string,
       public userId?:number
    ){}
}