import React from 'react';
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

function SidebarComponent() {
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
            <DashboardSidebarTabComponent heading={'Tools'}>
               <IconListComponent
                  icon={<AiOutlineFileProtect />}
                  heading={'Export Game Data'}
                  link={'/export/game/data'}
               />
            </DashboardSidebarTabComponent>
            <DashboardSidebarTabComponent heading={'Payment'}>
               <IconListComponent
                  icon={<VscSymbolMethod />}
                  heading={'Game Currency Payment'}
                  link={'/game-currency-payment'}
               />
            </DashboardSidebarTabComponent>
         </styled.sclDiv>
      </styled.div>
   );
}

export default SidebarComponent;
