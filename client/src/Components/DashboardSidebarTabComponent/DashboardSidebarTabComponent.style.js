import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   border-bottom: 1px solid var(--smooth-gray-sl-cl);

   .content_div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 1rem;
   }
`;

export const innerItems = styled.div`
   padding: 0 1rem;
   margin-bottom: 1rem;
`;
