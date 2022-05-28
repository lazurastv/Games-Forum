import { ChatControllerApi } from "../api/api";

async function getChatToken(): Promise<string> {
    const articles = new ChatControllerApi();
    return articles.getToken({ credentials: "include" });
}
export { getChatToken };
