import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   .table_cm {
      width: 100%;
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid var(--smooth-gray-lg-cl);

      table {
         width: 100%;

         p {
            cursor: pointer;
         }

         thead {
            border-bottom: 1px solid var(--smooth-gray-lg-cl);
         }

         tbody {
            border-right: 1px solid var(--smooth-gray-lg-cl);
            border-left: 1px solid var(--smooth-gray-lg-cl);

            tr {
               border-bottom: 1px solid var(--smooth-gray-lg-cl);
            }
         }

         tr {
            th {
               font-size: 14px;
               text-align: start;
               font-weight: 500;
               color: var(--smooth-lg-sl-cl);
               padding: 1rem;
               background-color: var(--light-blue-cl);
            }

            td {
               padding: 1rem;
               font-size: 14px;
               font-weight: 400;
               color: var(--light-gray-cl);
            }
         }
      }
   }
`;
