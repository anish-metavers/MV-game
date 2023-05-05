import React from 'react';
import * as styled from './CreateSpinItemPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';

function CreateSpinItemPage() {
   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Create new spin item'}
               showSubHeadingCM={true}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
               menu={false}
            />
         </div>
      </styled.div>
   );
}

export default CreateSpinItemPage;
