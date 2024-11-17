import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {WebAppDispatch, WebAppState} from "@A/core/store/webapp-store";

export const useWebappDispatch = () => useDispatch<WebAppDispatch>();
export const useWebappSelector: TypedUseSelectorHook<WebAppState> = useSelector;
