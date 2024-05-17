import axios from "axios";

export const commonStructure = async (method, url, body, header) => {
    let config = {
        method,
        url,
        headers: header ? header : "application/json",
        data: body
    }
    return await axios(config).then(response => {
        return response
    }).catch(response => {
        return response
    })

}