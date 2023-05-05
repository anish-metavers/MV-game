import styled from 'styled-components';

export const div = styled.div`
   .grd_div {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 1rem;
      width: 100%;
   }
`;

export const imageBox = styled.div`
   padding: 0.2rem;
   height: 140px;
   position: relative;

   .cl_div {
      position: absolute;
      right: -2px;
      top: -2px;
      background-color: var(--light-gray-cl);
      cursor: pointer;
      border-radius: 50%;
   }

   .imgBox {
      height: 100%;
      width: 100%;
   }
`;
