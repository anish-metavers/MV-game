import styled from 'styled-components';

export const div = styled.div`
   cursor: pointer;
   padding: 0.1rem 0.5rem;
   transition: all 0.2s ease;
   border-radius: 5px;

   &:hover {
      background-color: var(--smooth-gray-sl-cl);
   }

   .active_tab {
      color: var(--primary-color);
      font-weight: 500;
   }

   svg {
      font-size: 17px;
   }

   .icon_div {
      height: 40px;
      width: 30px;
   }
`;
