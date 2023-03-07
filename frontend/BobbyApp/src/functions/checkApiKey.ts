export const checkApiKey = async (apiKey: String, UID: String) => {
    const response= await fetch("http://ashdragon.de/keyCheck", {
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
    return passedresponse.apiKey;
}