import styled from 'styled-components';

export const div = styled.div`
   .wn_div {
      margin-top: 1rem;
   }

   .gal_div {
      padding: 1.2rem;
      background: rgba(255, 255, 255, 0.37);
      border-radius: 5px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.56);

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
