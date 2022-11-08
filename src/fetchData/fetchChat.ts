import { ChatControllerApi } from "../api/api";
import { ChatMessageVM } from "../api/api/models/ChatMessageVM";

async function getChatToken(): Promise<string> {
    const chat = new ChatControllerApi();
    return chat.getToken({ credentials: "include" });
}
async function getChatMessages(): Promise<ChatMessageVM[]> {
    const chat = new ChatControllerApi();
    return chat.getAll({ credentials: "include" });
}
export { getChatToken, getChatMessages };
