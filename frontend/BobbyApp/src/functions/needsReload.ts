import { checkApiKey } from "./checkApiKey";

export let apiKey = sessionStorage.getItem("apiKey");
export let UID = sessionStorage.getItem("UID");

export const needsReload=  async () => {
    if(apiKey==null || UID==null){
        return true;
    }else if(!await checkApiKey(apiKey, UID)){
        return true;
    }
    return false
}