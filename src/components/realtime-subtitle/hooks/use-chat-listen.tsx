import {useChatServiceClient} from "@A/core/hooks/use-chat-service-client";
import {Subtitle} from "@A/core/models/subtitle";
import {useCallback} from "react";
import {ChatRespond, MeetingRoom} from "@A/core/grpc/chat/chat_pb";
import {Toast} from "antd-mobile";
import {useWebappDispatch, useWebappSelector} from "@A/core/store/webapp-hook";
import {addSubtitle} from "@A/core/store/features/session-slice";

export const useChatListen = () => {
    const client = useChatServiceClient();
    const webappDispatch = useWebappDispatch();
    const subtitles = useWebappSelector(state => state.session.subtitles);

    const startListen = useCallback((roomId: string) => {
        const request = new MeetingRoom().setMeetingRoom(roomId);
        const stream = client.chatListen(request, {});
        stream.on("data", (response: ChatRespond) => {
            const subtitle = new Subtitle(response);
            webappDispatch(addSubtitle(subtitle));
        });
        stream.on("error", (error: any) => {
            Toast.show("Error: " + error.message);
        });
        stream.on("end", () => {
            Toast.show("The connection has been disconnected. Please refresh and try reconnecting!");
        });
        return stream;
    }, [client, webappDispatch]);
    return {
        subtitles,
        startListen,
    };
}