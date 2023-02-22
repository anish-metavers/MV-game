import React from 'react';
import * as styled from './NavbarComponent.style';
import { VscListSelection } from '@react-icons/all-files/vsc/VscListSelection';
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent';
import { AiFillSetting } from '@react-icons/all-files/ai/AiFillSetting';
import { RiNotification4Line } from '@react-icons/all-files/ri/RiNotification4Line';
import Badge from '@mui/material/Badge';

function NavbarComponent() {
   return (
      <styled.div className="shadow-sm flex items-center justify-between">
         <div className="flex items-center">
            <div className="icon_box_div">
               <VscListSelection />
            </div>
            <SearchBarComponent />
         </div>
         <div className="flex items-center">
            <div className="icon_box_div">
               <Badge badgeContent={0} color="primary">
                  <AiFillSetting />
               </Badge>
            </div>
            <div className="icon_box_div">
               <Badge badgeContent={0} color="primary">
                  <RiNotification4Line />
               </Badge>
            </div>
            <div className="icon_box_div">
               <div className="user_profile_div shadow">
                  <img
                     src="https://images.unsplash.com/photo-1676369134323-d19cf8bb3a25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80"
                     alt=""
                  />
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default React.memo(NavbarComponent);
