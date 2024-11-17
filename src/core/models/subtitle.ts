import dayjs from "dayjs";
import {ChatRespond} from "@A/core/grpc/chat/chat_pb";
import {Language} from "@A/core/contants/language";

export class Subtitle {
    private readonly timestamp: number;
    private readonly speaker: string;
    private readonly chinese: string;
    private readonly english: string;
    private readonly japanese: string;

    constructor(response: ChatRespond) {
        this.timestamp = response.getStart();
        this.speaker = response.getSpeaker();
        const languageList = response.getTargetLanguageList();
        const subtitleList = response.getTranslatedTextList();
        const chineseIndex = languageList.indexOf(Language.CHINESE);
        const englishIndex = languageList.indexOf(Language.ENGLISH);
        const japaneseIndex = languageList.indexOf(Language.JAPANESE);
        this.chinese = chineseIndex !== -1 ? subtitleList[chineseIndex] : "";
        this.english = englishIndex !== -1 ? subtitleList[englishIndex] : "";
        this.japanese = japaneseIndex !== -1 ? subtitleList[japaneseIndex] : "";
    }

    getTime(): string {
        return dayjs(this.timestamp).format("HH:mm:ss");
    }

    getSpeaker(): string {
        return this.speaker;
    }

    getChinese(): string {
        return this.chinese;
    }

    getEnglish(): string {
        return this.english;
    }

    getJapanese(): string {
        return this.japanese;
    }
}