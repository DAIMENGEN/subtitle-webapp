import {persistReducer, persistStore} from "redux-persist";
import staticReducer from "@A/core/store/features/static-slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import sessionReducer from "@A/core/store/features/session-slice";
import {persistConfig, sessionPersistConfig, staticPersistConfig} from "@A/core/store/config";

const reducers = combineReducers({
    static: persistReducer(staticPersistConfig, staticReducer),
    session: persistReducer(sessionPersistConfig, sessionReducer),
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const webappStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(webappStore);
export type WebAppDispatch = typeof webappStore.dispatch;
export type WebAppState = ReturnType<typeof webappStore.getState>;