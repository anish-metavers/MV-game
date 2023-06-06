import React, { useEffect } from 'react';
import * as styled from './UserStatusPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import useAdmin from '../../Hooks/useAdmin';
import { useDispatch } from 'react-redux';
import { getUserSingleAccountInformation } from '../../App/Features/userManagement/userManagementActions';
import UserProfileCardComponent from '../../Components/UserProfileCardComponent/UserProfileCardComponent';

function UserStatusPage() {
   const dispatch = useDispatch();
   const params = useParams();
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);

   useEffect(() => {
      if (!!isAdmin && !!params && params?.id) {
         dispatch(getUserSingleAccountInformation({ userId: params?.id }));
      }
   }, [isAdmin, params]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <UserProfileCardComponent />
         </div>
      </styled.div>
   );
}

export default UserStatusPage;
