import React from 'react';
import * as styled from './SearchBarComponent.style';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';

function SearchBarComponent() {
   return (
      <styled.div className=" bg-gray-100">
         <input type="search" placeholder="Search" />
         <div className="icon_div">
            <BsSearch className="text-gray-500" />
         </div>
      </styled.div>
   );
}

export default SearchBarComponent;
