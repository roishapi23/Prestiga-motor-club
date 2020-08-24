import { AppState } from "./app-state";
import { ActionType } from "./action-Type";
import { Action } from "./action";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.Login:
            newAppState.isUserLoggedIn = true;
            newAppState.userName = action.payload;
            break;
        
        case ActionType.GetAllCars:
            newAppState.cars = action.payload;
            break;
        case ActionType.Logout:
            newAppState.isUserLoggedIn = false;
            newAppState.userName = "Guest"
            break;
        case ActionType.setUserName:
            newAppState.userName = action.payload;
            break;
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}