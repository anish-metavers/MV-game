import styled from 'styled-components';

export const div = styled.div`
   .lottery_Card_div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
   }

   @media (max-width: 1400px) {
      .lottery_Card_div {
         grid-template-columns: repeat(2, 1fr);
      }
   }

   @media (max-width: 950px) {
      .lottery_Card_div {
         grid-template-columns: repeat(1, 1fr);
      }
   }
`;
