import {useChatServiceClient} from "@A/core/hooks/use-chat-service-client";
import {Subtitle} from "@A/core/models/subtitle";
import {useCallback, useState} from "react";
import {ChatRespond, MeetingRoom} from "@A/core/grpc/chat/chat_pb";

export const useChatListen = () => {
    // Ensure the array has at most 100 items
    const maxSubtitles = 50;
    const client = useChatServiceClient();
    const [subtitles, setSubtitles] = useState<Array<Subtitle>>([]);

    const startListen = useCallback((roomId: string) => {
        const request = new MeetingRoom().setMeetingRoom(roomId);
        const stream = client.chatListen(request, {});
        stream.on("data", (response: ChatRespond) => {
            const subtitle = new Subtitle(response);
            setSubtitles(subtitles => {
                const updated = [...subtitles, subtitle];
                return updated.length > maxSubtitles ? updated.slice(-maxSubtitles) : updated;
            });
        });
        stream.on("error", (error: any) => {
            console.error(error);
        });
        return stream;
    }, [client]);
    return {
        subtitles,
        startListen,
    };
}