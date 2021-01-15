import {apiKey, baseUrl} from "../configs/configs";
import axios from "axios";

export const getWeather = async (lat, lon) => {
    const res = await axios.get(`${baseUrl}onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return await res.data;
};

export const getLocation = async (lat, lon) => {
    const res = await axios.get(`${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    console.log(res.data.data)
    return await res.data
}
