import "./subtitle-setting.scss";
import React, {useState} from "react";
import {Button, Card, CheckList, Grid, Image, Modal, Popup, Slider, Space} from "antd-mobile";
import bubble_webp from "@A/assets/jpeg/bubble.jpeg";
import {FontSizeIcon01} from "@A/assets/svg/font-size-icon-01";
import {ThemeIcon01} from "@A/assets/svg/theme-icon-01";
import {LayoutIcon01} from "@A/assets/svg/layout-icon-01";
import {LanguageIcon01} from "@A/assets/svg/language-icon-01";
import {useWebappDispatch, useWebappSelector} from "@A/core/store/webapp-hook";
import {
    setBackgroundColor,
    setDisplayLanguage,
    setDisplayLayout,
    setFontColor,
    setFontSize, setSpeakerColor,
    setTimeColor
} from "@A/core/store/features/static-slice";
import {DisplayBlock} from "@A/components/display-block/display-block";
import {Language} from "@A/core/contants/language";
import {ColorPicker} from "antd";
import {ColorPaletteUtil} from "@A/utils/style/ColorPaletteUtil";
import {SwitchRoomIcon01} from "@A/assets/svg/switch-room-icon-01";
import {setRoomId} from "@A/core/store/features/session-slice";

export const SubtitleSetting = () => {
    const container = document.getElementById("root");
    const webappDispatch = useWebappDispatch();
    const [isAdjustingTheme, setIsAdjustingTheme] = useState(false);
    const [isAdjustingDisplayLayout, setIsAdjustingDisplayLayout] = useState(false);
    const [isAdjustingSetting, setIsAdjustingSetting] = useState(false);
    const [isAdjustingFontSize, setIsAdjustingFontSize] = useState(false);
    const [isAdjustingLanguage, setIsAdjustingLanguage] = useState(false);
    const roomId = useWebappSelector(state => state.session.roomId);
    const fontSize = useWebappSelector(state => state.static.fontSize);
    const fontColor = useWebappSelector(state => state.static.fontColor);
    const timeColor = useWebappSelector(state => state.static.timeColor);
    const backgroundColor = useWebappSelector(state => state.static.backgroundColor);
    const displayLayout = useWebappSelector(state => state.static.displayLayout);
    const displayLanguage = useWebappSelector(state => state.static.displayLanguage);
    return (
        <div className={"subtitle-setting"}>
            <Image src={bubble_webp} onClick={() => setIsAdjustingSetting(true)}/>
            <Modal
                visible={isAdjustingSetting && !isAdjustingTheme && !isAdjustingDisplayLayout && !isAdjustingFontSize && !isAdjustingLanguage}
                destroyOnClose={true}
                closeOnMaskClick={true}
                getContainer={container}
                stopPropagation={[]}
                bodyStyle={{paddingTop: "0"}}
                content={
                    <div className={"subtitle-setting-modal"}>
                        <Card title={`Room: ${roomId}`} headerStyle={{display: "flex", justifyContent: "center"}}>
                            <Grid columns={2}>
                                <Grid.Item span={2}>
                                    <Space direction={"vertical"} style={{textAlign: "center", width: "100%"}}>
                                        <Button onClick={() => {
                                            setIsAdjustingSetting(false);
                                            webappDispatch(setRoomId(undefined));
                                        }} style={{border: "none"}}>
                                            <SwitchRoomIcon01 width={50} height={50} color={"#91003c"}/>
                                        </Button>
                                        Switch Room
                                    </Space>
                                </Grid.Item>
                                <Grid.Item>
                                    <Space direction={"vertical"} style={{textAlign: "center", width: "100%"}}>
                                        <Button onClick={() => setIsAdjustingFontSize(true)} style={{border: "none"}}>
                                            <FontSizeIcon01 width={50} height={50} color={"#91003c"}/>
                                        </Button>
                                        <span>FontSize</span>
                                    </Space>
                                </Grid.Item>
                                <Grid.Item>
                                    <Space direction={"vertical"} style={{textAlign: "center", width: "100%"}}>
                                        <Button onClick={() => setIsAdjustingTheme(true)} style={{border: "none"}}>
                                            <ThemeIcon01 width={50} height={50} color={"#91003c"}/>
                                        </Button>
                                        Theme
                                    </Space>
                                </Grid.Item>
                                <Grid.Item>
                                    <Space direction={"vertical"} style={{textAlign: "center", width: "100%"}}>
                                        <Button onClick={() => setIsAdjustingDisplayLayout(true)} style={{border: "none"}}>
                                            <LayoutIcon01 width={50} height={50} color={"#91003c"}/>
                                        </Button>
                                        Layout
                                    </Space>
                                </Grid.Item>
                                <Grid.Item>
                                    <Space direction={"vertical"} style={{textAlign: "center", width: "100%"}}>
                                        <Button onClick={() => setIsAdjustingLanguage(true)} style={{border: "none"}}>
                                            <LanguageIcon01 width={50} height={50} color={"#91003c"}/>
                                        </Button>
                                        Language
                                    </Space>
                                </Grid.Item>
                            </Grid>
                        </Card>
                    </div>
                }
                onClose={() => setIsAdjustingSetting(false)}/>

            <Popup visible={isAdjustingFontSize}
                   onMaskClick={() => setIsAdjustingFontSize(false)}>
                <DisplayBlock title={`FontSize: ${fontSize}`}>
                    <Slider defaultValue={fontSize} max={50} onChange={(value) => {
                        if (typeof value === "number") {
                            webappDispatch(setFontSize(value))
                        }
                    }}/>
                </DisplayBlock>
            </Popup>

            <Popup visible={isAdjustingLanguage}
                   onMaskClick={() => setIsAdjustingLanguage(false)}>
                <DisplayBlock title={"Please select the language you need to translate."}>
                    <CheckList multiple={true} defaultValue={displayLanguage}
                               onChange={(value) => webappDispatch(setDisplayLanguage(value as Array<string>))}>
                        <CheckList.Item value={Language.CHINESE}>Chinese</CheckList.Item>
                        <CheckList.Item value={Language.ENGLISH}>English</CheckList.Item>
                        <CheckList.Item value={Language.JAPANESE}>Japanese</CheckList.Item>
                    </CheckList>
                </DisplayBlock>
            </Popup>

            <Popup visible={isAdjustingDisplayLayout}
                   onMaskClick={() => setIsAdjustingDisplayLayout(false)}>
                <DisplayBlock title={"Please select the layout info you want to display."}>
                    <CheckList multiple={true} defaultValue={displayLayout}
                               onChange={(value) => webappDispatch(setDisplayLayout(value as Array<string>))}>
                        <CheckList.Item value={"time"}>Time</CheckList.Item>
                        <CheckList.Item value={"speaker"}>Speaker</CheckList.Item>
                        <CheckList.Item value={"subtitle"}>Subtitle</CheckList.Item>
                    </CheckList>
                </DisplayBlock>
            </Popup>

            <Popup visible={isAdjustingTheme}
                   onMaskClick={() => setIsAdjustingTheme(false)}>
                <DisplayBlock title={"Adjust Time Color"}>
                    <ColorPicker defaultValue={timeColor}
                                 placement={"rightTop"}
                                 style={{marginLeft: "10px"}}
                                 presets={[ColorPaletteUtil.summerColors()]}
                                 onChange={(value) => webappDispatch(setTimeColor(value.toHexString()))}/>
                </DisplayBlock>
                <DisplayBlock title={"Adjust Font Color"}>
                    <ColorPicker defaultValue={fontColor}
                                 placement={"rightTop"}
                                 style={{marginLeft: "10px"}}
                                 presets={[ColorPaletteUtil.summerColors()]}
                                 onChange={(value) => webappDispatch(setFontColor(value.toHexString()))}/>
                </DisplayBlock>
                <DisplayBlock title={"Adjust Speaker Color"}>
                    <ColorPicker defaultValue={fontColor}
                                 placement={"rightTop"}
                                 style={{marginLeft: "10px"}}
                                 presets={[ColorPaletteUtil.summerColors()]}
                                 onChange={(value) => webappDispatch(setSpeakerColor(value.toHexString()))}/>
                </DisplayBlock>
                <DisplayBlock title={"Adjust Background Color"}>
                    <ColorPicker defaultValue={backgroundColor}
                                 placement={"rightTop"}
                                 style={{marginLeft: "10px"}}
                                 presets={[ColorPaletteUtil.summerColors()]}
                                 onChange={(value) => {
                                     webappDispatch(setBackgroundColor(value.toHexString()))
                                 }}/>
                </DisplayBlock>
            </Popup>
        </div>
    )
}