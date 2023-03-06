
import { UID, apiKey } from "./needsReload";

export const getOpferKonto = async () => {
    const response= await fetch("http://ashdragon.de/konto", {
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