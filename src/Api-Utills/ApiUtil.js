import axios from 'axios';

const API_BASE_URL = "http://localhost:5000"

const request = options => {
    const head = {
        "Content-Type": "application/json"
    };

   if (sessionStorage.getItem("accessToken")) {
        head["Authorization"] = "Bearer " + sessionStorage.getItem("accessToken");
    }
    const defaults = {headers: head};
    options = Object.assign({}, defaults, options);

    return axios(options.url, options).then(response => {
        return response;
    }).catch(error => {
        return Promise.reject(error.response);
});
};




export function signUp(signUpRequest) {
    return request({
        method: 'post',
        url: API_BASE_URL + "/users/signUp",
        data: signUpRequest,
        header : {
            'Content-Type': 'application/json'
        }
    });

}

export function signIn(signInRequest) {
    return request({
        method: 'post',
        url: API_BASE_URL + "/users/signIn",
        data: signInRequest,
        header : {
            'Content-Type': 'application/json'
        }
    });
}

export function getAllUserRoll() {
    return request({
        method: 'get',
        url: API_BASE_URL + "/userRoll/getAllUserRoll",
    });
}

export function getUsersByAuthType(authType) {
    return request({
        method: 'get',
        url: API_BASE_URL + "/users/getUsersByAuthType?authType="+authType,
         headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    });
}

export function createRole(createRoleRequest) {
    return request({
        method: 'post',
        url: API_BASE_URL + "/userRoll/createRole",
        data: createRoleRequest,
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + sessionStorage.getItem("token")
          }
    });
}

export function changeAuthorizeStatus(authStatusRequest) {
        return request({
            method: 'post',
            url: API_BASE_URL + "/users/changeAuthorizeStatus",
            data: authStatusRequest,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + sessionStorage.getItem("token")
              }
        });
}

export function signOut() {
    return request({
        method: 'get',
        url: API_BASE_URL + "/users/signOut",
    });
}

export function registerUser(registerRequest,loginUserId) {
    return request({
        method: 'post',
        url: API_BASE_URL + "/users/registerUser",
        data: registerRequest,loginUserId:loginUserId,
    });

}


export function getUsersInfoCacheByRoleId(roleId) {
    return request({
        method: 'get',
        url: API_BASE_URL + "/users/getUsersInfoCacheByRoleId?roleId="+roleId,
    });
}

export function changeApproveStatus(approveStatusRequest) {
    return request({
        method: 'post',
        url: API_BASE_URL + "/users/changeApproveStatus",
        data: approveStatusRequest,
    });
}



export function getUserDetailsByUserId(userIdrequest) {
    return request({
        method: 'get',
        url: API_BASE_URL + "/users/getUserDetailsByUserId?userId="+userIdrequest,
    });
}

export function getLoginUserDetails() {
    return request({
        method: 'get',
        url: API_BASE_URL + "/users/getLoginUserDetails",
    });
}
