import * as Config from "../constants/Config";
import axios from "axios";


const apiCaller = async (endpoint: string, method: any, body?: any) => {
  try {
    const res = await axios(`${Config.API_URL}/${endpoint}`, {
        method: method,
        data: body
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export default apiCaller;
