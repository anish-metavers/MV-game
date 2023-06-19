import styled from 'styled-components';

export const div = styled.div`
   button {
      padding: 0.8rem 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
   }

   .Wallet_button {
      background-color: #5617cb;
      background-image: conic-gradient(from 1turn, #8447f6, #5617cb);

      svg {
         color: var(--main-cl);
         font-size: 20px;
      }

      p {
         margin-left: 0.5rem;
         color: var(--main-cl);
         font-weight: 500;
      }
   }

   .singIn_button {
      padding: 0.6rem 1.6rem;
      background: linear-gradient(101.06deg, #3a7ef8 5.34%, #0c409d 93.53%);
      border-radius: 4px;

      p {
         font-weight: 500;
      }
   }

   .send_button {
      padding: 1rem 1.4rem;
      color: #fff;
      background-color: var(--primary-color);
      background-image: conic-gradient(from 1turn, #6acf15, #209b44);
      cursor: pointer;
      border-radius: 5px;
   }

   .SignUp_large_button {
      border-radius: 0.2em;
      color: rgb(255, 255, 255);
      padding: 0.9rem 3rem;
      background: linear-gradient(-230deg, rgba(57, 125, 246, 1), rgba(19, 69, 157, 1));
   }

   .bg_none {
      width: 100%;
      border-radius: 0.2em;
      color: rgb(255, 255, 255);
      padding: 0.9rem 3rem;
      border: 1px solid #727272;
      background-color: transparent;
      cursor: not-allowed;
   }

   .large_btn {
      width: 100%;
      padding: 1rem;
      color: var(--main-cl);
      background-color: var(--primary-color);
      background-image: conic-gradient(from 1turn, #6acf15, #209b44);
   }

   .large_sn_btn {
      background: linear-gradient(97.86deg, #387cf5 -11.31%, #12439b 108.5%);
      border-radius: 4px;
   }

   .DepositBtn {
      color: #fff;
      padding: 0.8rem 1.3rem;
      font-size: 15px;
      background-color: var(--main-cl);
      color: var(--dark-cl);
      font-weight: 600;
      border-radius: 5px;
   }

   .Crypto_btn {
      color: #fff;
      padding: 0.8rem 2.3rem;
      background-color: #5617cb;
      background-image: conic-gradient(from 1turn, #8447f6, #5617cb);
      font-size: 15px;
   }

   .cancelBtn {
      padding: 0.74rem 3.1rem;
      background-color: var(--smooth-gray-cl);
   }

   .btn {
      position: absolute;
      width: 15rem;
      left: 3.75rem;
      bottom: 0;
      background-color: rgb(255, 158, 106);
      background-image: conic-gradient(from 1turn, rgb(172, 76, 25), rgb(255, 158, 106));
      font-weight: 700;
      font-size: 17px;
      transition: all 0.2s ease;

      .button-inner {
         display: flex;
         align-items: center;
         justify-content: center;
         width: 100%;
         height: 100%;
      }
   }

   .ui-button.s-conic4 {
      color: #fff;
      background-color: #de8f16;
      background-image: conic-gradient(from 1turn, #f6cd47, #de8f16);
   }

   .lucky_spin_btn {
      background-color: rgb(255, 158, 106);
      background-image: conic-gradient(from 1turn, rgb(172, 76, 25), rgb(255, 158, 106)) !important;
   }

   .lucky2_spin_btn {
      background-color: rgb(224, 194, 17);
      background-image: conic-gradient(from 1turn, rgb(213, 114, 16), rgb(224, 194, 17)) !important;
   }

   .lucky3_spin_btn {
      background-color: rgb(180, 113, 255);
      background-image: conic-gradient(from 1turn, rgb(148, 13, 255), rgb(180, 113, 255)) !important;
   }

   .no_allow {
      opacity: 0.5;
      cursor: not-allowed;
   }

   .login_btn {
      background-color: var(--primary-color);
      width: 100%;
      border-radius: 5px;
   }

   .Publish {
      background-color: var(--primary-color);
      border-radius: 8px;
      padding: 0.5rem 2rem;

      img {
         margin-right: 0.5rem;
      }
   }

   .next_btn {
      border: 1px solid var(--smooth-gray-lg-cl);
      padding: 0.3rem 1rem;
      border-radius: 5px;
      cursor: pointer;

      p {
         /* color: var(--dark-cl); */
         font-size: 14px;
         margin-right: 0.2rem;
      }
   }

   .prevbtn {
      p {
         margin-left: 0.2rem;
      }
   }

   .disable_btn {
      opacity: 0.5;
      cursor: not-allowed;
   }

   .rejected {
      background: var(--dark-red-cl);
   }

   .load_mode {
      border-radius: 5px;
      font-size: 10px;
      padding: 0.5rem 1rem;
      background-color: var(--primary-color);
   }

   .tab_button {
      background-color: var(--dark-blue-cl);
      opacity: 0.6;
   }

   .tab_button_active {
      background-color: var(--smooth-lg-sl-cl);
      opacity: 1;
   }

   .pagination_bt {
      background-color: var(--model-bg-cl);
      opacity: 1;
   }

   .not_allow {
      cursor: no-drop;
      opacity: 0.5;
   }

   .send_button {
      padding: 1rem 1.4rem;
      color: #fff;
      background-color: var(--primary-color);
      background-image: conic-gradient(from 1turn, #6acf15, #209b44);
      cursor: pointer;
      border-radius: 5px;

      svg {
         color: var(--main-cl);
      }
   }
`;
