import React, { Fragment } from 'react';
import * as styled from './NavbarComponent.style';
import { VscListSelection } from '@react-icons/all-files/vsc/VscListSelection';
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent';
import { AiFillSetting } from '@react-icons/all-files/ai/AiFillSetting';
import { RiNotification4Line } from '@react-icons/all-files/ri/RiNotification4Line';
import Badge from '@mui/material/Badge';
import { useCookies } from 'react-cookie';

function NavbarComponent() {
   const [cookie] = useCookies();

   return (
      <styled.div className="shadow-sm flex items-center justify-between">
         {!!cookie && !!cookie?._mv_games_auth ? (
            <Fragment>
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
                        <img src={cookie?._mv_games_auth?.avatar} alt="" />
                     </div>
                  </div>
               </div>
            </Fragment>
         ) : null}
      </styled.div>
   );
}

export default React.memo(NavbarComponent);
