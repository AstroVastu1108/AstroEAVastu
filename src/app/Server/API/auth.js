import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_APIURL1;
export async function sendSignInRequest(username,password) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
    try {
      const payload = {
        email:username
        // password: password
      }

      const response = await axios.post(`${API_URL}/Auth/LoginPost`, payload);
      responseBody.responseData = response.data;
      if (response.status === 200) {
        return {
          isOk: true,
          data: response.data,
        };
      }else{
        return {
          isOk: false,
          data: response.data,
        };
      }
    } catch (error) {
      return {
        isOk: false,
        data: responseBody.errorMessage =
        error.response?.data?.statusMsg ||
        error.message ||
        error.response?.data?.errors
      };
    }
  }

export async function registerCompnay(company) {
  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
    try {
      // console.log("Data compnay : ",company)
      const payload = {
        userType: "CompanyMaster",
        email:company.email,
        password: company.password,
        businessName:company.businessname,
        businessLocation:company.businesslocation,
        userAvatar:company.profilePicture,
        phone:company.phone
      }

      const response = await axios.post(`${API_URL}/Auth/Registration`, payload);
      responseBody.responseData = response.data;
      if (response.status === 200) {
        return {
          isOk: true,
          data: response.data.result,
        };
      }else{
        return {
          isOk: false,
          data: response.data,
        };
      }
    } catch (error) {
      return {
        isOk: false,
        data: responseBody.errorMessage =
        error.response?.data?.statusMsg ||
        error.message ||
        error.response?.data?.errors
      };
    }
  }



export const requestOtp = async (email, role) => {
  var payload = {
    eMail: email,
    userType: role
    }

  const responseBody = {
    responseData: null,
    hasError: false,
    error: null,
  };
  try {
    const response = await axios.post(
      `${API_URL}/Otp/GenerateOTP`,
      payload
    );
    responseBody.response = response.data;

    return responseBody;
  } catch (error) {
    responseBody.error =
      error.response?.data?.statusMsg ||
      error.message ||
      error.response?.data?.errors;
    responseBody.hasError = true;
    return responseBody;
  }
};

export const VerifyOtp = async (email, otp, role) => {
  const responseBody = {
    responseData: null,
    hasError: false,
    errorMessage: null,
  };

  const payload = {
    email: email,
    verifyOTP: otp,
    userType: role,
  };

  try {
    const response = await axios.post(`${API_URL}/Otp/VerifyOTP`, payload);
    responseBody.responseData = response.data;

    if (response.data.Status === 400) {
      responseBody.hasError = true;
      responseBody.errorMessage = response.data.statusMsg;
    }
    return responseBody;
  } catch (error) {
    responseBody.hasError = true;
    responseBody.errorMessage =
      error.response?.data?.statusMsg ||
      error.response?.data?.errors ||
      error.message;
    return responseBody;
  }
};
