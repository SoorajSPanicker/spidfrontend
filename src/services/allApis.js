import BASE_URL from "./base_url";
import { commonStructure } from "./commonStructure";

export const adddocApi = async (body, header) => {
    return await commonStructure('POST', `${BASE_URL}/docdetail`, body, header)
}

export const addtaginfo=async(body) => {
    return await commonStructure('POST', `${BASE_URL}/tagdetail`, body)
}

export const geteletag = async () => {
    return await commonStructure('GET', `${BASE_URL}/tagdetails`, {})
}

export const addeleApi = async (body) => {
    return await commonStructure('POST', `${BASE_URL}/eledetail`, body)
}

export const getinfoapi = async (id) => {
    return await commonStructure('GET', `${BASE_URL}/singleele/${id}`, {})
}

export const getgroupapi = async (id) => {
    return await commonStructure('GET', `${BASE_URL}/groupele/${id}`, {})
}

export const gettableapi = async (id) => {
    return await commonStructure('GET', `${BASE_URL}/getfullinfo/${id}`, {})
}
export const adddlayApi = async (body) => {
    return await commonStructure('POST', `${BASE_URL}/layerdetail`, body)
}
export const getlayApi = async (body) => {
    return await commonStructure('GET', `${BASE_URL}/layerdetails`, {})
}

export const getsinlay = async (id) => {
    return await commonStructure('GET', `${BASE_URL}/singlelayer/${id}`, {})
}


export const getareaApi = async (body) => {
    return await commonStructure('GET', `${BASE_URL}/areadetails`, {})
}

export const getsinarea=async (id) => {
    return await commonStructure('GET', `${BASE_URL}/sinarea/${id}`, {})
}

export const getareatag= async (id) => {
    return await commonStructure('GET', `${BASE_URL}/eletag/${id}`, {})
}

export const gettagsleft= async () => {
    return await commonStructure('GET', `${BASE_URL}/tagsleft`, {})
}

export const getalltags = async (id) => {
    return await commonStructure('GET', `${BASE_URL}/getalltag/${id}`, {})
}

export const getdocnames= async () => {
    return await commonStructure('GET', `${BASE_URL}/docnumbers`, {})
}

export const getfiledis= async (id) => {
    return await commonStructure('GET', `${BASE_URL}/getsinglefile/${id}`, {})
}

export const getflagdet = async () => {
    return await commonStructure('GET', `${BASE_URL}/getflags`, {})
}

export const addflagassi = async (body) => {
    return await commonStructure('POST', `${BASE_URL}/flagassidetails`, body)
}

export const getcdoc= async (id) => {
    return await commonStructure('GET', `${BASE_URL}/connectdoc/${id}`, {})
}



