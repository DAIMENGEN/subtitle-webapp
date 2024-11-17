import {useMemo} from "react";
import {hostname} from "@A/host";
import {ChatServiceClient} from "@A/core/grpc/chat/ChatServiceClientPb";

export const useChatServiceClient = () => {
    const options = null;
    const credentials = null;
    return useMemo(() => new ChatServiceClient(hostname, credentials, options), [credentials, options]);
}