import "./realtime-subtitle.scss";
import {useEffect, useRef} from "react";
import {useWebappSelector} from "@A/core/store/webapp-hook";
import {FloatingAssistBall} from "@A/components/realtime-subtitle/segments/floating-assist-ball/floating-assist-ball";
import {useJoinRoom} from "@A/components/realtime-subtitle/hooks/use-join-room";
import {useChatListen} from "@A/components/realtime-subtitle/hooks/use-chat-listen";
import {SubtitleList} from "@A/components/realtime-subtitle/segments/subtitle-list/subtitle-list";

export const RealtimeSubtitle = () => {
    const roomId = useJoinRoom();
    const {subtitles, startListen} = useChatListen();
    const realtimeSubtitleRef = useRef<HTMLDivElement>(null);
    const backgroundColor = useWebappSelector(state => state.static.backgroundColor);

    useEffect(() => {
        const realtimeSubtitle = realtimeSubtitleRef.current;
        if (realtimeSubtitle) {
            const scroll = () => {
                realtimeSubtitle.scrollTop = realtimeSubtitle.scrollHeight;
            }
            if (roomId) {
                const stream = startListen(roomId, scroll);
                return () => stream.cancel();
            }
        }
    }, [roomId, startListen]);

    return (
        <div ref={realtimeSubtitleRef}
             className={"realtime-subtitle"}
             style={{backgroundColor}}>
            <SubtitleList subtitles={subtitles}/>
            <FloatingAssistBall parent={realtimeSubtitleRef}/>
        </div>
    )
}