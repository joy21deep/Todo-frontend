import axios from "axios";
//var axios = require('axios');
var FormData = require("form-data");  
// var api_url = "http://localhost:3008//web/";
// var api_url = "https://app-backend-dscp.onrender.com/api/mobile/";
axios.defaults.baseURL = "http://localhost:3008/web/";
// axios.defaults.baseURL = "https://app-backend-dscp.onrender.com/api/mobile/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export function login(data) {
  return axios.post("user/login", data);
}
export function usercreate(data) {
    axios.defaults.headers.post["Content-Type"] = "application/json"; 
    console.log("hiii kiskijk",data);
    return axios.post("user/create", data);
}
export function addTask(data) { 
  let token = localStorage.getItem("token"); 
  console.log("bhbjhbb",token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token; 
  axios.defaults.headers.post["Content-Type"] = "application/json"; 
  return axios.post("task/create",data); 
}

