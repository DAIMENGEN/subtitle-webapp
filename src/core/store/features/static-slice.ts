import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Language} from "@A/core/contants/language";
import {SubtitleLayout} from "@A/core/contants/subtitle-layout";

export type StaticStore = {
    fontSize: number;
    fontColor: string;
    timeColor: string;
    speakerColor: string;
    backgroundColor: string;
    displayLayout: Array<string>;
    displayLanguage: Array<string>;
}

const initialState: StaticStore = {
    fontSize: 22,
    fontColor: "#FFFFFF",
    timeColor: "#FFFFFF",
    speakerColor: "#FFFFFF",
    backgroundColor: "#24262f",
    displayLayout: [SubtitleLayout.TIME, SubtitleLayout.SPEAKER, SubtitleLayout.SUBTITLE],
    displayLanguage: [Language.CHINESE, Language.ENGLISH, Language.JAPANESE],
}

const staticSlice = createSlice({
    name: "static",
    initialState,
    reducers: {
        setFontSize(state, action: PayloadAction<number>) {
            state.fontSize = action.payload;
        },
        setFontColor(state, action: PayloadAction<string>) {
            state.fontColor = action.payload;
        },
        setTimeColor(state, action: PayloadAction<string>) {
            state.timeColor = action.payload;
        },
        setSpeakerColor(state, action: PayloadAction<string>) {
            state.speakerColor = action.payload;
        },
        setBackgroundColor(state, action: PayloadAction<string>) {
            state.backgroundColor = action.payload;
        },
        setDisplayLayout(state, action: PayloadAction<Array<string>>) {
            state.displayLayout = action.payload;
        },
        setDisplayLanguage(state, action: PayloadAction<Array<string>>) {
            state.displayLanguage = action.payload;
        }
    }
});

export const {
    setFontSize,
    setFontColor,
    setTimeColor,
    setSpeakerColor,
    setDisplayLayout,
    setBackgroundColor,
    setDisplayLanguage
} = staticSlice.actions;
export default staticSlice.reducer;