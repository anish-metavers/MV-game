import { useState, useEffect } from 'react';

const useAdmin = (cookie) => {
   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
      if (!!cookie && cookie?._mv_games_auth && cookie?._mv_games_auth?.roles) {
         cookie._mv_games_auth.roles.find((el) => (el.roleId.roleName === 'admin' ? setIsAdmin(true) : null));
      }
   }, []);

   return [isAdmin];
};

export default useAdmin;
