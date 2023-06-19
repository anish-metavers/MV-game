import styled from 'styled-components';

export const chatDiv = styled.div`
   float: left;
   padding: 1rem;

   .mg_div {
      .date_time {
         font-size: 12px;
         display: flex;
         justify-content: start;
         margin: 0.2rem 0;
      }

      .message_div {
         width: 500px;
         padding: 1rem;
         border-radius: 0 20px 20px 20px;
         background-color: var(--light-green-cl);
      }
   }
`;
