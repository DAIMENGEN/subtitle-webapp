import {useCallback, useEffect, useRef} from "react";
import {Input, InputRef, Modal} from "antd-mobile";
import {DisplayBlock} from "@A/components/display-block/display-block";
import {useWebappDispatch, useWebappSelector} from "@A/core/store/webapp-hook";
import {CreateRequest} from "@A/core/grpc/chat/chat_pb";
import {useChatServiceClient} from "@A/core/hooks/use-chat-service-client";
import {setRoomId} from "@A/core/store/features/session-slice";

export const useJoinRoom = () => {
    const client = useChatServiceClient();
    const inputRoomRef = useRef<InputRef>(null);
    const webappDispatch = useWebappDispatch();
    const roomId = useWebappSelector(state => state.session.roomId);
    const join = useCallback(() => {
        Modal.confirm({
            title: "Join the Meeting Room",
            content: (
                <DisplayBlock title={""}>
                    <Input ref={inputRoomRef} placeholder="Please input room number" style={{
                        "--text-align": "center"
                    }} clearable/>
                </DisplayBlock>
            ),
            confirmText: "Join",
            cancelText: "Cancel",
        }).then(confirm => {
            if (confirm) {
                const roomId = inputRoomRef.current?.nativeElement?.value;
                if (!roomId) {
                    Modal.alert({
                        title: "Invalid Room Number",
                        content: "Please input room number",
                        confirmText: "OK",
                        onConfirm: () => join(),
                    }).then();
                } else {
                    const request = new CreateRequest().setMeetingRoom(roomId).setPassword("");
                    client.createChat(request, {}).then(_ => {
                        webappDispatch(setRoomId(roomId));
                    });
                }
            }
        });
    }, [client, webappDispatch]);
    useEffect(() => {
        !roomId && join();
        return () => Modal.clear();
    }, [roomId, join]);

    return roomId;
}