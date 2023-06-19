import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem;
   border: 1px solid var(--light-gray-cl);
   display: flex;
   align-items: center;
   cursor: pointer;
   transition: all 0.2s ease;

   &:hover {
      background-color: var(--smooth-gray-cl);
   }
`;

export const profileDiv = styled.div`
   width: 60px;
   height: 60px;
   overflow: hidden;
   border-radius: 50%;

   img {
      width: 100%;
      object-fit: cover;
   }
`;
