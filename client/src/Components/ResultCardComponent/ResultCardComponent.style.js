import styled from 'styled-components';

export const div = styled.div`
   padding: 0 0.3rem;

   .glass {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px);
      border: 1px solid rgba(255, 255, 255, 0.3);
   }

   .card_div {
      padding: 1.5rem 2rem;
      width: 100%;
      border-radius: 10px;

      .icon_menu {
         width: 40px;
         height: 40px;
         display: flex;
         align-items: center;
         justify-content: center;
         border-radius: 8px;
      }
   }
`;
