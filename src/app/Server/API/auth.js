import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_APIURL1;
export async function sendSignInRequest(username,password) {
    try {
      const payload = {
        email:username,
        password: password
      }

      const response = await axios.post(`${API_URL}/Auth/LoginPost`, payload);
      if (response.status === 200) {
        // console.log("response==============> : ",response)
        return {
          isOk: true,
          data: response.data.result,
        };
      }
    } catch (error) {
      return {
        isOk: false,
        message: error,
      };
    }
  }