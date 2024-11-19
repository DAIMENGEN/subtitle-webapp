import {useCallback, useRef} from "react";
import {Input, InputRef, Modal, Toast} from "antd-mobile";
import {DisplayBlock} from "@A/components/display-block/display-block";
import {useWebappDispatch, useWebappSelector} from "@A/core/store/webapp-hook";
import {CreateRequest} from "@A/core/grpc/chat/chat_pb";
import {useChatServiceClient} from "@A/core/hooks/use-chat-service-client";
import {setRoomId} from "@A/core/store/features/session-slice";

export const useJoinRoom = () => {
    const client = useChatServiceClient();
    const webappDispatch = useWebappDispatch();
    const inputRoomRef = useRef<InputRef>(null);
    const roomId = useWebappSelector(state => state.session.roomId);
    const joinRoom = useCallback(() => {
        Modal.alert({
            title: "Join the Meeting Room",
            content: (
                <DisplayBlock title={""}>
                    <Input ref={inputRoomRef} placeholder="Please input room number" style={{
                        "--text-align": "center"
                    }} clearable/>
                </DisplayBlock>
            ),
            confirmText: "Join",
            onConfirm: () => {
                const roomId = inputRoomRef.current?.nativeElement?.value;
                if (!roomId) {
                    Modal.alert({
                        title: "Invalid Room Number",
                        content: "Please input room number",
                        confirmText: "OK",
                        onConfirm: () => joinRoom(),
                    }).then();
                } else {
                    const request = new CreateRequest().setMeetingRoom(roomId).setPassword("");
                    client.createChat(request, {}).then(response => {
                        const result = response.getResult();
                        if (result) {
                            Toast.show({content: "Join the room successfully"});
                            webappDispatch(setRoomId(roomId));
                        } else {
                            Modal.alert({
                                title: "Unable to join the room.",
                                content: `Error: ${response.getMessage()}`,
                                confirmText: "OK",
                                onConfirm: () => joinRoom(),
                            }).then();
                        }
                    });
                }
            }
        }).then();
    }, [client, webappDispatch]);

    const closeJoinRoom = useCallback(() => {
        Modal.clear();
    }, []);

    return {roomId, joinRoom, closeJoinRoom}
}