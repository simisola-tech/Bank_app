import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      name: "colin",
      password: "colin123",
      balance: 50000,
      accNo: "1001",
    },
    {
      id: 2,
      name: "peace",
      password: "peace456",
      balance: 50000,
      accNo: "1002",
    },
    {
      id: 3,
      name: "Pelumi",
      password: "pelumi789",
      balance: 50000,
      accNo: "1003",
    },
    {
      id: 4,
      name: "ebuka",
      password: "ebuka321",
      balance: 50000,
      accNo: "1004",
    },
    { id: 5, name: "Simi", password: "simi654", balance: 50000, accNo: "1005" },
    {
      id: 6,
      name: "Samuel",
      password: "samuel987",
      balance: 50000,
      accNo: "1006",
    },
    {
      id: 7,
      name: "james",
      password: "james111",
      balance: 50000,
      accNo: "1007",
    },
    { id: 8, name: "Joy", password: "joy222", balance: 50000, accNo: "1008" },
    {
      id: 9,
      name: "Christain",
      password: "christain333",
      balance: 50000,
      accNo: "1009",
    },
    {
      id: 10,
      name: "Naanshai",
      password: "naanshai444",
      balance: 50000,
      accNo: "1010",
    },
  ],
  transactions: [],
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    transfer(state, action) {
      const { senderId, toAccNo, recipientName, amount, memo } = action.payload;
      const transferAmount = Number(amount);
      const sender = state.users.find((u) => u.id === senderId);
      const receiver = state.users.find((u) => u.accNo === toAccNo.trim());

      if (!sender || !receiver) {
        state.error = "Account not found.";
        return;
      }

      if (sender.id === receiver.id) {
        state.error = "Cannot transfer to your own account.";
        return;
      }

      if (recipientName.trim().toLowerCase() !== receiver.name.toLowerCase()) {
        state.error = "Recipient name and account number do not match.";
        return;
      }

      if (transferAmount <= 0) {
        state.error = "Enter a valid transfer amount.";
        return;
      }

      if (sender.balance < transferAmount) {
        state.error = "Insufficient balance.";
        return;
      }

      sender.balance -= transferAmount;
      receiver.balance += transferAmount;
      state.transactions.unshift({
        id: Date.now(),
        senderId: sender.id,
        senderName: sender.name,
        receiverId: receiver.id,
        receiverName: receiver.name,
        amount: transferAmount,
        memo: memo?.trim() || "Transfer",
        createdAt: new Date().toISOString(),
      });
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { transfer, clearError } = loginSlice.actions;
export const selectUsers = (state) => state.login.users;
export const selectTransferError = (state) => state.login.error;
export const selectTransactions = (state) => state.login.transactions;

export default loginSlice.reducer;
