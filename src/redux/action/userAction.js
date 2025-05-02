export const FETCH_USER_lOGIN_SUCCESS = "FETCH_USER_lOGIN_SUCCESS";
export const doLogin = (data) => {
    return {
        type: FETCH_USER_lOGIN_SUCCESS,
        payload: data
    }
};