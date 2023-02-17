import styled from 'styled-components';

export const div = styled.div`
   cursor: pointer;

   .active_tab {
      color: var(--primary-color);
      font-weight: 500;

      svg {
         color: var(--primary-color);
      }
   }

   svg {
      font-size: 20px;
   }

   .icon_div {
      height: 40px;
      width: 30px;
   }
`;
