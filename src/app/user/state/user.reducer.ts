import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface UserState {
    maskUserName: boolean;
}

const initialState: UserState = {
    maskUserName: true
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export function reducer(state = initialState, action): UserState {
    switch (action.type) {
        case 'MASK_USER_NAME':
            return {
                ...state,
                maskUserName: action.payload
            };
        default:
            return state;
    }
}
