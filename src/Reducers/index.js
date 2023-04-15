
import * as actionTypes from "./types";
import { combineReducers } from "redux";
import {assets4Dark,assets4Light,theme4DarkMode,theme4Default} from '../Components/config'
import {DarkModeStyles} from '../Components/AppKaStyle/DarkModeStyles'
import {DefaultStyles} from '../Components/AppKaStyle/DefaultStyles'

import AsyncStorage from '@react-native-async-storage/async-storage';
const initial_user_state={
    authStatus:false,
    insDetails:{},
    themeMode: "default",
    user_id : "",
    images :[],
    slots : [],
    appointments : [],
    themeStyle : DefaultStyles,
    themeAssets:assets4Light,
    appMode:0,//this will let developer know if app has to be paid or not
    themeColors:theme4Default
}

const user_reducer=(state=initial_user_state,action)=>
{
    switch (action.type) {
        case actionTypes.SET_USER_DETAILS:
            return{
                ...state,
                insDetails: action.payload.insDetails,
            }
        case actionTypes.SET_AUTH_STATUS:
            return{
                ...state,
                authStatus: action.payload.authStatus,
            }
        case actionTypes.SET_THEME_MODE:
            let styles = action.payload.themeMode=='default'?DefaultStyles:DarkModeStyles
            let assets = action.payload.themeMode=='default'?assets4Dark:assets4Light
            let color = action.payload.themeMode=='default'?theme4Default:theme4DarkMode
            AsyncStorage.setItem('userThemeMode',action.payload.themeMode)
            return{
                ...state,
                themeMode: action.payload.themeMode,
                themeStyle:styles,
                themeAssets:assets,
                themeColors:color
            }
        case actionTypes.SET_USER_ID:
            return{
                ...state,
                user_id : action.payload.user_id,
            }
        case actionTypes.SET_USER_IMAGES:
            return{
                ...state,
                images : action.payload.images,
            }
        case actionTypes.SET_USER_SLOTS:
            return{
                ...state,
                slots: action.payload.slots,
            }
        case actionTypes.SET_APPOINTMENTS:
            return{
                ...state,
                appointments: action.payload.appointments,
            }
        case actionTypes.SET_USER_PRO_STATUS:
            return{
                ...state,
                insDetails:{...state.insDetails,pro:action.payload.status}
            }
        case actionTypes.SET_DEPOSIT_STATUS:
            return{
                ...state,
                insDetails:{...state.insDetails,deposits:action.payload.deposits}
            }
        case actionTypes.SET_APP_MODE:
            return {
                ...state,
                appMode:action.payload.appMode,
            }
        default:return state
    }
}



const rootReducer = combineReducers({
     user:user_reducer
})


export default rootReducer