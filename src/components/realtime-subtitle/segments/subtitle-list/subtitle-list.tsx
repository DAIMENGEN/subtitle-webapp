import React from "react";
import {Subtitle} from "@A/core/models/subtitle";
import {List, Space} from "antd-mobile";
import {useWebappSelector} from "@A/core/store/webapp-hook";
import {Language} from "@A/core/contants/language";
import {SubtitleLayout} from "@A/core/contants/subtitle-layout";

export const SubtitleList: React.FC<{
    subtitles: Array<Subtitle>
}> = ({subtitles}) => {

    const fontSize = useWebappSelector(state => state.static.fontSize);
    const fontColor = useWebappSelector(state => state.static.fontColor);
    const timeColor = useWebappSelector(state => state.static.timeColor);
    const speakerColor = useWebappSelector(state => state.static.speakerColor);
    const backgroundColor = useWebappSelector(state => state.static.backgroundColor);

    const displayChinese = useWebappSelector(state => state.static.displayLanguage.includes(Language.CHINESE));
    const displayEnglish = useWebappSelector(state => state.static.displayLanguage.includes(Language.ENGLISH));
    const displayJapanese = useWebappSelector(state => state.static.displayLanguage.includes(Language.JAPANESE));

    const displayTime = useWebappSelector(state => state.static.displayLayout.includes(SubtitleLayout.TIME));
    const displaySpeaker = useWebappSelector(state => state.static.displayLayout.includes(SubtitleLayout.SPEAKER));
    const displaySubtitle = useWebappSelector(state => state.static.displayLayout.includes(SubtitleLayout.SUBTITLE));
    return (
        <List style={{"--font-size": `${fontSize}px`}}>
            {subtitles.map((subtitle, index) => (
                <List.Item key={index} style={{backgroundColor}}>
                    <Space direction={"vertical"}>
                        {
                            displayChinese && (
                                <div>
                                    {displayTime &&
                                        <span style={{color: timeColor}}>{subtitle.time}&nbsp;&nbsp;</span>}
                                    {displaySpeaker &&
                                        <span style={{color: speakerColor}}>{subtitle.speaker}&nbsp;&nbsp;</span>}
                                    {displaySubtitle && <span style={{color: fontColor}}>{subtitle.chinese}</span>}
                                </div>
                            )
                        }

                        {
                            displayEnglish && (
                                <div>
                                    {displayTime &&
                                        <span style={{color: timeColor}}>{subtitle.time}&nbsp;&nbsp;</span>}
                                    {displaySpeaker &&
                                        <span style={{color: speakerColor}}>{subtitle.speaker}&nbsp;&nbsp;</span>}
                                    {displaySubtitle && <span style={{color: fontColor}}>{subtitle.english}</span>}
                                </div>
                            )
                        }

                        {
                            displayJapanese && (
                                <div>
                                    {displayTime &&
                                        <span style={{color: timeColor}}>{subtitle.time}&nbsp;&nbsp;</span>}
                                    {displaySpeaker &&
                                        <span style={{color: speakerColor}}>{subtitle.speaker}&nbsp;&nbsp;</span>}
                                    {displaySubtitle && <span style={{color: fontColor}}>{subtitle.japanese}</span>}
                                </div>
                            )
                        }
                    </Space>

                </List.Item>
            ))}
        </List>
    )
}