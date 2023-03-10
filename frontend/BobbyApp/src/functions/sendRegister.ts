
export const sendRegister= async (username: string, password: string)=>{
    const response= await fetch("http://ashdragon.de/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "UID": username,
            "password": password
        }),
    });
    const passedResponse= await response.json();
    if(response.status==200){
        sessionStorage.setItem("apiKey", passedResponse.apiKey);
        sessionStorage.setItem("UID", username);
    }
    window.location.reload();      
}