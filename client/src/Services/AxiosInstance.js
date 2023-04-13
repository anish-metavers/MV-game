import axios from 'axios';
import jwtDecode from 'jwt-decode';
const USER_API_ROUTE_URL = process.env.REACT_APP_CLIENT_BACKEND_URL;
const ADMIN_DASHBOARD_URL = process.env.REACT_APP_BACKEND_BASE_ADMIN_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_SECRET_KEY;

const getCookieValues = function () {
   const cookieObj = new URLSearchParams(
      document.cookie.replaceAll('&', '%26').replaceAll('; ', '&')
   );

   return cookieObj;
};

const axiosInstance = axios.create({
   baseURL: ADMIN_DASHBOARD_URL,
});

axiosInstance.interceptors.request.use(async (req) => {
   try {
      const cookieObj = getCookieValues();
      const refreshToken = cookieObj.get('_mv_games_refresh_token');
      const accessToken = cookieObj.get('_mv_games_access_token');

      if (!refreshToken) {
         console.log('login again');
      }

      req.headers['x-admin-api-key'] = ADMIN_KEY;

      /**
       * get user refresh token.
       * check user has refresh token or not.
       * check the user access token is exipre or not.
       * if the user token is expire then request for the new access token.
       * @return request.
       */

      const decodeAccessToken = jwtDecode(accessToken);

      // if the user token is not expire then send back the request.
      if (!(Date.now() >= decodeAccessToken.exp * 1000)) {
         req.headers.Authorization = `Bearer ${accessToken}`;
         return req;
      } else {
         // request for the new token when the user token is expire.
         axios.defaults.headers.common[
            'Authorization'
         ] = `Bearer ${refreshToken}`;

         const accessTokenResponse = await axios.post(
            `${USER_API_ROUTE_URL}/auth/refresh-token?userId=${decodeAccessToken._id}`,
            {
               withCredentials: true,
            }
         );

         if (accessTokenResponse?.data && accessTokenResponse?.data?.success) {
            document.cookie = `_mv_games_access_token=${accessTokenResponse?.data?.accessToken}`;

            // set new access token in headers.
            req.headers[
               'Authorization'
            ] = `Bearer ${accessTokenResponse?.data?.accessToken}`;

            return req;
         }
      }
   } catch (err) {
      return Promise.reject(err);
   }
});

export default axiosInstance;
