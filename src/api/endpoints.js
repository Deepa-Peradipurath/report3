import axios from 'axios';

//const api_url = process.env.API_URL;
const api_url = 'https://portalfast.ite.mypepsico.com/rest/notificationadmin/api/v1'; //for netflify deployment only

export const getAllApplication = () => {
    const fetchDataURL = `${api_url}/getAllApplication`;
    return axios.get(fetchDataURL);
}

export const fetchData = data => { 
    const fetchDataURL =
      data.payload.tab === "notification"
        ? `${api_url}/fetchNotification`
        : `${api_url}/fetchTemplate`;
    const headers = {
      "content-type": "application/json"
    };
    const body = data.payload.info;
    return axios.post(fetchDataURL, body, headers);
  };

export const getAllReportsData = data => {
    const headers = {
      "content-type": "application/json"
    };
    const body = data.payload;
    const fetchDataURL =
      `${api_url}/report`
    return axios.post(fetchDataURL, body, headers);
  };

export const updateStatusData = data => {
    let statusUpdateURL;
    if (data.payload.tab === "notification") {
      statusUpdateURL =
        (data.payload.status === "Inactive"
          ? `${api_url}/activeNotificationType?`
          : `${api_url}/deactiveNotificationType?`) +
        "typeId=" +
        data.payload.typeId +
        "&appId=" +
        data.payload.appId;
    } else {
      statusUpdateURL =
        (data.payload.status === "Inactive"
          ? `${api_url}/activateTemplate?`
          : `${api_url}/deactivateTemplate?`) +
        "templateId=" +
        data.payload.typeId +
        "&appID=" +
        data.payload.appId;
    }
    return axios.get(statusUpdateURL);
  };

export const samplePayloadData = data => {
    const getPayloadURL = `${api_url}/generateTemplatePayload?templateId=` + data.payload;
    return axios.get(getPayloadURL);
  };

  export const addNotificationAPI = data => {
    
    const postURL = `${api_url}${data.type === "ADD_NOTIFICATION" ?  '/addNotificationType' : '/editNotificationType'}`
    const headers = {
      "content-type": "application/json"
    };
    const body = data.payload;
    return axios.post(postURL, body, headers);
  };
  export const channelListAPI = data => {
    
    const postURL = `${api_url}/getAllNotificationChannels`
    const headers = {
      "content-type": "application/json"
    };
    return axios.get(postURL, headers);
  };
  export const categoryListAPI = data => {
    
    const postURL = `${api_url}/getAllCategories`
    const headers = {
      "content-type": "application/json"
    };
    return axios.get(postURL, headers);
  };
  export const notificationListAPI = data => {
    
    const postURL = `${api_url}/getAllNotificationType?appId=${data.payload}`
    const headers = {
      "content-type": "application/json"
    };
    return axios.get(postURL, headers);
  };
  export const getTemplateDetailAPI = data => {
    const postURL = `${api_url}/getNotificationTemplate?templateId=${data.payload.tempID}&appId=${data.payload.appId}`
    const headers = {
      "content-type": "application/json"
    };
    return axios.get(postURL, headers);
  };
  
  export const updateTemplateAPI = data => {
  
    const postURL = `${api_url}${data.payload.tag === "edit" ?  '/editTemplates' : '/addTemplates'}`
    const headers = {
      "content-type": "application/json"
    };
    const body = data.payload.info;
    return axios.post(postURL, body, headers);
  };