import { Car } from './../models/Car';

export class AppState {
    public cars: Car[] = [];
    public isUserLoggedIn: boolean = false;
    public userName:string = "Guest";
}