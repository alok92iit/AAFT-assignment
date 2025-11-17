import axios from 'axios';

import { toast } from 'react-toastify';
import store from '@/store';
import { SET_LOADER, SET_MODAL } from '@/store/reducers/notify';
// import { refreshAccessToken } from './utils';
import Swal from 'sweetalert2';
import { baseURL } from './urls';


const instance = axios.create({
    baseURL:baseURL,
    withCredentials: true

  });

const  url =window.location.href
console.log("celmnfvjkc erdlfrvonberojbv==",url)
instance.interceptors.request.use(
    (config) => {
        // Example: Set Authorization header with a token
        const token =  store.getState().auth.token
        console.log("cm ecknejrnfcvkjnevfr===",token)
        if(token) {
          // Add token to headers if available
          config.headers['Authorization'] = token

        }
    
        return config;
      },
      (error) => {
        // Handle request errors (optional)
        // console.log("clekmkvopekfoper====",error.response)
        // if (error.response && error.response.status === 401) {
        //     // Handle 401 error here
        //     console.log('Unauthorized! Redirecting to login or refreshing token...');
        //     // Optionally redirect or trigger token refresh logic
        //   }
      
        return Promise.reject(error);
      }
)
instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
     
      console.log(";elmrfioefcmklnionfw====",originalRequest)
      if (
        error.response && originalRequest.url=="/auth/refresh" &&  error.response.status === 401 
      ){
        if( url.includes("/portal")){

        
        Swal.fire({
                        title: "Session Expired!",
                        text: "Please relogin the portal.",
                        icon: "info"
                      });
                      return
                    }
                    else{
                        return null
                    }
      }
      else if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // ✅ Custom flag to avoid infinite loops
  
        //try {
          const newToken = await refreshAccessToken(); // 👈 assume this returns a token
  
          if (newToken) {
            // Set the new token to the header
            console.log("celmfkemrkfop klm pck c ===",newToken)
            originalRequest.headers['Authorization'] = newToken;
  
            // Retry the original request with the new token
            return instance(originalRequest);
          }
        // } catch (err) {
        //   console.error('Token refresh failed', err);
        // }
      }
  
      return Promise.reject(error);
    }
  );
const Api = {
    get: ({ url, contentType = "application/json", show = 1 }:any) => {
        console.log(show)
    
        return instance({
            method: "GET",
            url,
            withCredentials: true,
            headers: {
                'Content-Type': contentType
            }
        });
    },
    post: ({ data={}, url='', shouldModalClose=true,contentType = "application/json", show = 1, upload = false, cb = () => { } ,msg=null}:any) => {
        if (upload){
            store.dispatch(SET_LOADER(true))
        }
        return instance({
            method: "POST",
            data,
            url,
            headers: {
                'Content-Type': contentType
            },
            withCredentials:true
            // ...(upload && {
            //     onUploadProgress: e => {
            //         store.dispatch(NotifyActions.progress((parseInt((e.loaded * 100) / e.total))));
            //     }
            // })
        }).then(res => {
             
            if (show){

                toast.success(msg?msg:'Data added successfully', {
                    position: 'top-center',
                    theme: "colored"
                });
                if(shouldModalClose){

                    store.dispatch(SET_MODAL(false))
                }
            }
            // store.dispatch(NotifyActions.progress(null));
            cb();
            return res;
        }).catch(err => {
            console.log("ther me, dcekjesbfc k",err)
            toast.info(err?.response?.data?.msg, {
                position: 'top-center',
                theme: "colored"
            });
            // store.dispatch(NotifyActions.progress(null));
            // return Promise.reject(err);
            return err;
        })
        .finally(() => {
            // console.log('Experiment completed');
            store.dispatch(SET_LOADER(false))
          });
    },
    delete: ({ data, url, contentType = "application/json", show = 1 }:any) => {
        console.log(show)
        return instance({
            method: "DELETE",
            data,
            url,
            headers: {
                'Content-Type': contentType
            }
        });
    },
    patch: ({ data={}, url="", contentType = "application/json", show = 1, upload = false, cb = () => { } }) => {
        console.log(show)
        console.log(upload)
        return instance({
            method: "PATCH",
            data,
            url,
            headers: {
                'Content-Type': contentType
            },
            // ...(upload && {
            //     onUploadProgress: e => {
            //         store.dispatch(NotifyActions.progress((parseInt((e.loaded * 100) / e.total))));
            //     }
            // })
        }).then(res => {
             
            if (show){

                toast.success('Data updated successfully', {
                    position: 'top-center',
                    theme: "colored"
                });
            }
            // store.dispatch(NotifyActions.progress(null));
            cb();
            return res;
        }).catch(err => {
            console.log("ther me, dcekjesbfc k",err)
            toast.info(err?.response?.data?.msg, {
                position: 'top-center',
                theme: "colored"
            });
            // store.dispatch(NotifyActions.progress(null));
            // return Promise.reject(err);
            return err;
        })
    },
    put: ({ data={}, url="", contentType = "application/json", show = 1 }) => {
        console.log(show)
        return instance({
            method: "PUT",
            data,
            url,
            headers: {
                'Content-Type': contentType
            }
        });
    }
};

export default Api;