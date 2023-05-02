import React, { useEffect, useContext } from 'react';
import * as styled from './SidebarComponent.style';
import DashboardSidebarTabComponent from '../DashboardSidebarTabComponent/DashboardSidebarTabComponent';
import IconListComponent from '../IconListComponent/IconListComponent';
import { FiGitlab } from '@react-icons/all-files/fi/FiGitlab';
import { FiLink } from '@react-icons/all-files/fi/FiLink';
import { HiOutlineCurrencyRupee } from '@react-icons/all-files/hi/HiOutlineCurrencyRupee';
import { RiGameFill } from '@react-icons/all-files/ri/RiGameFill';
import { VscExtensions } from '@react-icons/all-files/vsc/VscExtensions';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { AiOutlineFileProtect } from '@react-icons/all-files/ai/AiOutlineFileProtect';
import { SiNintendogamecube } from '@react-icons/all-files/si/SiNintendogamecube';
import { MdDashboard } from '@react-icons/all-files/md/MdDashboard';
import { VscSymbolMethod } from '@react-icons/all-files/vsc/VscSymbolMethod';
import { RiNotificationBadgeFill } from '@react-icons/all-files/ri/RiNotificationBadgeFill';
import { authSelector } from './Sidebar.Selector';
import { useSelector } from 'react-redux';
import useAdmin from '../../Hooks/useAdmin';
import { useCookies } from 'react-cookie';
import { SocketContext } from '../../Context/SocketContext';
import { MdPayment } from '@react-icons/all-files/md/MdPayment';
import { VscSymbolArray } from '@react-icons/all-files/vsc/VscSymbolArray';
import { AiOutlineTransaction } from '@react-icons/all-files/ai/AiOutlineTransaction';

function SidebarComponent() {
   const auth = useSelector(authSelector);
   const [cookie] = useCookies();
   const [isAdmin] = useAdmin(cookie);
   const socket = useContext(SocketContext);

   useEffect(() => {
      if (!!auth && isAdmin && auth?.user && auth?.user?._id) {
         socket.emit('_online_user', {
            userId: auth?.user?._id,
            userCrId: auth?.user?.userId,
         });

         socket.emit('_join_group_room', { groupId: 'admin_dashboard_room' });
      }
   }, [auth, isAdmin]);

   return (
      <styled.div>
         <div className="nav_logo_div">
            <img src="/images/logo_blc.png" alt="logo png" />
         </div>
         <styled.sclDiv className="shadow">
            <DashboardSidebarTabComponent heading={'Dashboard'}>
               <IconListComponent
                  icon={<MdDashboard />}
                  heading={'Dashboard'}
                  link={'/'}
               />
               <IconListComponent
                  icon={<FiLink />}
                  heading={'Users Role'}
                  link={'/user-roles?page=0'}
               />
               <IconListComponent
                  icon={<HiOutlineCurrencyRupee />}
                  heading={'Game Currency'}
                  link={'/game-currency?page=0'}
               />
               <IconListComponent
                  icon={<VscExtensions />}
                  heading={'Game Category'}
                  link={'/game-category?page=0'}
               />
               <IconListComponent
                  icon={<RiGameFill />}
                  heading={'Games'}
                  link={'/games?page=0'}
               />
               <IconListComponent
                  icon={<FiGitlab />}
                  heading={'Avatar'}
                  link={'/avatars'}
               />
               <IconListComponent
                  icon={<FiUsers />}
                  heading={'Users'}
                  link={'/users?page=0'}
               />
               <IconListComponent
                  icon={<SiNintendogamecube />}
                  heading={'Games providers'}
                  link={'/games/providers?page=0'}
               />
            </DashboardSidebarTabComponent>
            <DashboardSidebarTabComponent heading={'Push Notification'}>
               <IconListComponent
                  icon={<RiNotificationBadgeFill />}
                  heading={'Notification'}
                  link={'notification'}
               />
            </DashboardSidebarTabComponent>
            <DashboardSidebarTabComponent heading={'Tools'}>
               <IconListComponent
                  icon={<AiOutlineFileProtect />}
                  heading={'Export Game Data'}
                  link={'/export/game/data'}
               />
            </DashboardSidebarTabComponent>
            <DashboardSidebarTabComponent heading={'Payment'}>
               <IconListComponent
                  icon={<VscSymbolArray />}
                  heading={'Payment fields'}
                  link={'/payment-fields'}
               />
               <IconListComponent
                  icon={<VscSymbolMethod />}
                  heading={'Game Currency Payment'}
                  link={'/game-currency-payment'}
               />
               <IconListComponent
                  icon={<MdPayment />}
                  heading={'Fiat deposit payments'}
                  link={'/fiat-deposit-payments'}
               />
               <IconListComponent
                  icon={<AiOutlineTransaction />}
                  heading={'Fiat withdraw transaction'}
                  link={'/fiat/withdraw/transaction'}
               />
            </DashboardSidebarTabComponent>
         </styled.sclDiv>
      </styled.div>
   );
}

export default SidebarComponent;
