import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, image) => {
     //call api
     const data  = new FormData();
     data.append("email", email);
     data.append("password", password);
     data.append("username", username);
     data.append("role", role);
     data.append("userImage", image);
     return axios.post("api/v1/participant", data);
}
const getAllUser = () => {
    return axios.get("api/v1/participant/all");
}
const putUpdateUser =  (id, username, role, image) => {
    //call api
    const data  = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.put(`api/v1/participant`, data);
}
const deleteUserApi = (idUser) => {
    return axios.delete("api/v1/participant", {data: {id:idUser}});
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}
const postLogin = (userEmail,userPassword) =>{
    return axios.post(`api/v1/login`, {
        email: userEmail,
        password: userPassword,
        delay: 5000
    });
}

const postRegister = (email,username,password,role) =>{
    return axios.post(`api/v1/register`, {email: email, username: username, password: password , role: role});
}

const getQuizByUser = () =>{
    return axios.get(`api/v1/quiz-by-participant`)
}
const getDataQuiz = (quizId) =>{
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}
const postSubmitQuiz = (data) =>{
    return axios.post(`api/v1/quiz-submit`,{...data})

}

export { postCreateNewUser, getAllUser,putUpdateUser,
    deleteUserApi,getUserWithPaginate,postLogin,postRegister,
    getQuizByUser,getDataQuiz,postSubmitQuiz};