import { createSlice } from '@reduxjs/toolkit';
import {
   createPlayerAccount,
   getUserSingleAccount,
   setPlayerAccountPassword,
   updatePlayerAccount,
   getUserSingleAccountInformation,
   getUserAllFiatCurrency,
   getUserFiatWithdrawTransactions,
   getUserSelectedCurrency,
   getUserFiatTransaction,
   getUserCryptoWithdrawTransactions,
   getUserCryptoDepositTransactions,
   getUserAllCryptoCurrency,
   getPrivacyFieldStatus,
} from './userManagementActions';

const INITAL_STATE = {
   createPlayerAccountInfo: null,
   createPlayerAccountLoading: false,
   createPlayerAccountError: null,
   createPlayerAccountInvalidErrors: null,
   singleUserAccountInfo: null,
   singleUserAccountLoading: false,
   singleUserAccountError: null,
   accountPasswordChangeLoading: false,
   accountPasswordChangeError: null,
   userAccountInformation: null,
   userAccountInformationLoading: false,
   userAccountInformationError: null,
   walletFiatCurrencyData: null,
   walletFiatCurrencyDataLoading: false,
   walletFiatCurrencyDataError: null,
   withdrawTransactionInfo: null,
   withdrawTransactionLoading: false,
   withdrawTransactionError: null,
   selectedCurrency: null,
   selectedCurrencyLoading: false,
   selectedCurrencyError: null,
   depositTransactions: null,
   depositTransactionsLoading: false,
   depositTransactionsError: null,
   userCryptoCurrencyList: null,
   userCryptoCurrencyListLoading: false,
   userCryptoCurrencyListError: null,
   userProfilePrivacyInfo: null,
   userProfilePrivacyInfoLoading: false,
   userProfilePrivacyInfoFetchError: null,
};

const userManagementSlice = createSlice({
   name: 'userManagement',
   initialState: INITAL_STATE,
   reducers: {
      removeAccountErrors: (state) => {
         state.createPlayerAccountError = null;
         state.createPlayerAccountInvalidErrors = null;
         state.createPlayerAccountInfo = null;
         state.singleUserAccountInfo = null;
         state.singleUserAccountLoading = false;
         state.singleUserAccountError = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(createPlayerAccount.pending, (state) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = true;
            state.createPlayerAccountError = null;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(createPlayerAccount.rejected, (state, action) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = false;
            state.createPlayerAccountError = action.error.message;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(createPlayerAccount.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.createPlayerAccountInfo = null;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = action.payload?.data;
            } else {
               state.createPlayerAccountInfo = action.payload?.data;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = null;
            }
         });

      bulder
         .addCase(updatePlayerAccount.pending, (state) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = true;
            state.createPlayerAccountError = null;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(updatePlayerAccount.rejected, (state, action) => {
            state.createPlayerAccountInfo = null;
            state.createPlayerAccountLoading = false;
            state.createPlayerAccountError = action.error.message;
            state.createPlayerAccountInvalidErrors = null;
         })
         .addCase(updatePlayerAccount.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.createPlayerAccountInfo = null;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = action.payload?.data;
            } else {
               state.createPlayerAccountInfo = action.payload?.data;
               state.createPlayerAccountLoading = false;
               state.createPlayerAccountError = null;
               state.createPlayerAccountInvalidErrors = null;
            }
         });

      bulder
         .addCase(getUserSingleAccount.pending, (state) => {
            state.singleUserAccountInfo = null;
            state.singleUserAccountLoading = true;
            state.singleUserAccountError = null;
         })
         .addCase(getUserSingleAccount.rejected, (state, action) => {
            state.singleUserAccountInfo = null;
            state.singleUserAccountLoading = false;
            state.singleUserAccountError = action.error?.message;
         })
         .addCase(getUserSingleAccount.fulfilled, (state, action) => {
            state.singleUserAccountInfo = action.payload?.data;
            state.singleUserAccountLoading = false;
            state.singleUserAccountError = null;
         });

      bulder
         .addCase(getUserSingleAccountInformation.pending, (state) => {
            state.userAccountInformation = null;
            state.userAccountInformationLoading = true;
            state.userAccountInformationError = null;
         })
         .addCase(getUserSingleAccountInformation.rejected, (state, action) => {
            state.userAccountInformation = null;
            state.userAccountInformationLoading = false;
            state.userAccountInformationError = action.error?.message;
         })
         .addCase(getUserSingleAccountInformation.fulfilled, (state, action) => {
            state.userAccountInformation = action.payload?.data;
            state.userAccountInformationLoading = false;
            state.userAccountInformationError = null;
         });

      bulder
         .addCase(setPlayerAccountPassword.pending, (state) => {
            state.accountPasswordChangeLoading = true;
            state.accountPasswordChangeError = null;
         })
         .addCase(setPlayerAccountPassword.rejected, (state, action) => {
            state.accountPasswordChangeLoading = false;
            state.accountPasswordChangeError = action.error?.message;
         })
         .addCase(setPlayerAccountPassword.fulfilled, (state, action) => {
            state.accountPasswordChangeLoading = false;
            state.accountPasswordChangeError = null;
         });

      bulder
         .addCase(getUserAllFiatCurrency.pending, (state) => {
            state.walletFiatCurrencyData = null;
            state.walletFiatCurrencyDataLoading = true;
            state.walletFiatCurrencyDataError = null;
         })
         .addCase(getUserAllFiatCurrency.rejected, (state, action) => {
            state.walletFiatCurrencyData = null;
            state.walletFiatCurrencyDataLoading = false;
            state.walletFiatCurrencyDataError = action?.error?.message;
         })
         .addCase(getUserAllFiatCurrency.fulfilled, (state, action) => {
            state.walletFiatCurrencyData = action.payload?.data;
            state.walletFiatCurrencyDataLoading = false;
            state.walletFiatCurrencyDataError = null;
         });

      bulder
         .addCase(getUserFiatWithdrawTransactions.pending, (state) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = true;
            state.withdrawTransactionError = null;
         })
         .addCase(getUserFiatWithdrawTransactions.rejected, (state, action) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = action.error?.message;
         })
         .addCase(getUserFiatWithdrawTransactions.fulfilled, (state, action) => {
            state.withdrawTransactionInfo = action.payload?.data;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = null;
         });

      bulder
         .addCase(getUserSelectedCurrency.pending, (state) => {
            state.selectedCurrency = null;
            state.selectedCurrencyLoading = true;
            state.selectedCurrencyError = null;
         })
         .addCase(getUserSelectedCurrency.rejected, (state, action) => {
            state.selectedCurrency = null;
            state.selectedCurrencyLoading = false;
            state.selectedCurrencyError = action.error.message;
         })
         .addCase(getUserSelectedCurrency.fulfilled, (state, action) => {
            state.selectedCurrency = action.payload.data;
            state.selectedCurrencyLoading = false;
            state.selectedCurrencyError = null;
         });

      bulder
         .addCase(getUserFiatTransaction.pending, (state) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = true;
            state.depositTransactionsError = null;
         })
         .addCase(getUserFiatTransaction.rejected, (state, action) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = action.error?.message;
         })
         .addCase(getUserFiatTransaction.fulfilled, (state, action) => {
            state.depositTransactions = action.payload?.data;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = null;
         });

      bulder
         .addCase(getUserCryptoWithdrawTransactions.pending, (state) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = true;
            state.withdrawTransactionError = null;
         })
         .addCase(getUserCryptoWithdrawTransactions.rejected, (state, action) => {
            state.withdrawTransactionInfo = null;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = action.error?.message;
         })
         .addCase(getUserCryptoWithdrawTransactions.fulfilled, (state, action) => {
            state.withdrawTransactionInfo = action.payload?.data;
            state.withdrawTransactionLoading = false;
            state.withdrawTransactionError = null;
         });

      bulder
         .addCase(getUserCryptoDepositTransactions.pending, (state) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = true;
            state.depositTransactionsError = null;
         })
         .addCase(getUserCryptoDepositTransactions.rejected, (state, action) => {
            state.depositTransactions = null;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = action.error?.message;
         })
         .addCase(getUserCryptoDepositTransactions.fulfilled, (state, action) => {
            state.depositTransactions = action.payload?.data;
            state.depositTransactionsLoading = false;
            state.depositTransactionsError = null;
         });

      bulder
         .addCase(getUserAllCryptoCurrency.pending, (state) => {
            state.userCryptoCurrencyList = null;
            state.userCryptoCurrencyListLoading = true;
            state.userCryptoCurrencyListError = null;
         })
         .addCase(getUserAllCryptoCurrency.rejected, (state, action) => {
            state.userCryptoCurrencyList = null;
            state.userCryptoCurrencyListLoading = false;
            state.userCryptoCurrencyListError = action?.error?.message;
         })
         .addCase(getUserAllCryptoCurrency.fulfilled, (state, action) => {
            state.userCryptoCurrencyList = action.payload?.data;
            state.userCryptoCurrencyListLoading = false;
            state.userCryptoCurrencyListError = null;
         });

      bulder
         .addCase(getPrivacyFieldStatus.pending, (state) => {
            state.userProfilePrivacyInfo = null;
            state.userProfilePrivacyInfoLoading = true;
            state.userProfilePrivacyInfoFetchError = null;
         })
         .addCase(getPrivacyFieldStatus.rejected, (state, action) => {
            state.userProfilePrivacyInfo = null;
            state.userProfilePrivacyInfoLoading = false;
            state.userProfilePrivacyInfoFetchError = action.error.message;
         })
         .addCase(getPrivacyFieldStatus.fulfilled, (state, action) => {
            state.userProfilePrivacyInfo = action.payload.data;
            state.userProfilePrivacyInfoLoading = false;
            state.userProfilePrivacyInfoFetchError = null;
         });
   },
});

export const { removeAccountErrors } = userManagementSlice.actions;

export default userManagementSlice.reducer;
