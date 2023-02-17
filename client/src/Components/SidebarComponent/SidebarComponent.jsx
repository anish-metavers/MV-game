import React from 'react';
import * as styled from './SidebarComponent.style';
import DashboardSidebarTabComponent from '../DashboardSidebarTabComponent/DashboardSidebarTabComponent';
import IconListComponent from '../IconListComponent/IconListComponent';
import { VscRepoForked } from '@react-icons/all-files/vsc/VscRepoForked';

function SidebarComponent() {
   return (
      <styled.div>
         <div className="nav_logo_div border">
            <img src="/images/logo_blc.png" alt="logo png" />
         </div>
         <styled.sclDiv className="shadow">
            <DashboardSidebarTabComponent heading={'Dashboard'}>
               <IconListComponent
                  icon={<VscRepoForked />}
                  heading={'Users Role'}
                  link={'/user-roles'}
               />
            </DashboardSidebarTabComponent>
         </styled.sclDiv>
      </styled.div>
   );
}

export default SidebarComponent;
