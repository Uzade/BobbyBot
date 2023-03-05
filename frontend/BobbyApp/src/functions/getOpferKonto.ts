
import { UID, apiKey } from "./needsReload";

export const getOpferKonto = async () => {
    const response= await fetch("http://127.0.0.1:8081/konto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "UID": UID,
            "apiKey": apiKey
        }),
    });
    const passedresponse= await response.json();
    return passedresponse.opferKonto;
}