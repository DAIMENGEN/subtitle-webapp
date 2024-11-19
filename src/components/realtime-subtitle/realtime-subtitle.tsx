import "./realtime-subtitle.scss";
import {useEffect, useRef} from "react";
import {useWebappSelector} from "@A/core/store/webapp-hook";
import {FloatingAssistBall} from "@A/components/realtime-subtitle/segments/floating-assist-ball/floating-assist-ball";
import {useJoinRoom} from "@A/components/realtime-subtitle/hooks/use-join-room";
import {useChatListen} from "@A/components/realtime-subtitle/hooks/use-chat-listen";
import {SubtitleList} from "@A/components/realtime-subtitle/segments/subtitle-list/subtitle-list";

export const RealtimeSubtitle = () => {
    const {subtitles, startListen} = useChatListen();
    const {roomId, joinRoom, closeJoinRoom} = useJoinRoom();
    const realtimeSubtitleRef = useRef<HTMLDivElement>(null);
    const backgroundColor = useWebappSelector(state => state.static.backgroundColor);

    useEffect(() => {
        !roomId && joinRoom();
        return () => closeJoinRoom();
    }, [roomId, joinRoom, closeJoinRoom]);

    useEffect(() => {
        if (roomId) {
            const stream = startListen(roomId);
            return () => stream.cancel();
        }
    }, [roomId, startListen]);

    useEffect(() => {
        const realtimeSubtitle = realtimeSubtitleRef.current;
        if (realtimeSubtitle) {
            requestAnimationFrame(() => {
                realtimeSubtitle.scrollTop = realtimeSubtitle.scrollHeight;
            });
        }
    }, [subtitles]);

    return (
        <div ref={realtimeSubtitleRef}
             className={"realtime-subtitle"}
             style={{backgroundColor}}>
            <SubtitleList subtitles={subtitles}/>
            <FloatingAssistBall parent={realtimeSubtitleRef}/>
        </div>
    )
}