import styled from 'styled-components';

export const div = styled.div`
   .wn_div {
      margin-top: 1rem;
   }

   .timer_div {
      padding: 1rem;
      border-radius: 5px;
      width: max-content;
      background-color: var(--smooth-gray-md-cl);
      border: 1px solid var(--smooth-gray-cl);
   }

   .gal_div {
      padding: 1.2rem;
      border-radius: 5px;
      background-color: var(--smooth-gray-md-cl);

      .box_div {
         display: flex;
         align-items: center;
         padding: 0.8rem 0;
      }

      .hd {
         width: 240px;
      }
   }
`;
