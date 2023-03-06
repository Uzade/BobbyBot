
import { UID, apiKey } from "./needsReload";

export const sendRequest = (amount: number, message: string) => {
    const answer= fetch("http://ashdragon.de/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "amount": amount,
            "UID": UID,
            "apiKey": apiKey,
            "message": message
        }),
    });
    window.location.reload();
    return answer	
}