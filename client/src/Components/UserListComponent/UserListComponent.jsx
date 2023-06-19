import React from 'react';
import * as styled from './UserListComponent.style';
import UserProfileListComponent from '../UserProfileListComponent/UserProfileListComponent';
import { useNavigate } from 'react-router';

function UserListComponent() {
   const navigation = useNavigate();

   const chatHandler = function (userId) {
      navigation(`?chat=${userId}`);
   };

   return (
      <styled.div>
         <UserProfileListComponent
            user={{
               avatar:
                  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
               name: 'Dheeraj singh rawat',
               email: 'dheerajsingh1429@gmail.com',
            }}
            onClick={() => chatHandler(10)}
         />
      </styled.div>
   );
}

export default UserListComponent;
