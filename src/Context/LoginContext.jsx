import { createContext, useContext, useState } from "react";

const LoginContext = createContext(null);

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const initialUsers = [
    {
      id: 1,
      name: "colin",
      password: "colin123",
      balance: 50000,
      accNo: "1001",
      transactions: [],
    },
    {
      id: 2,
      name: "peace",
      password: "peace123",
      balance: 50000,
      accNo: "1002",
      transactions: [],
    },
    {
      id: 3,
      name: "Pelumi",
      password: "pelumi123",
      balance: 50000,
      accNo: "1003",
      transactions: [],
    },
    {
      id: 4,
      name: "ebuka",
      password: "ebuka123",
      balance: 50000,
      accNo: "1004",
      transactions: [],
    },
    {
      id: 5,
      name: "Simi",
      password: "simisola123",
      balance: 50000,
      accNo: "1005",
      transactions: [],
    },
    {
      id: 6,
      name: "Samuel",
      password: "samuel123",
      balance: 50000,
      accNo: "1006",
      transactions: [],
    },
    {
      id: 7,
      name: "james",
      password: "james123",
      balance: 50000,
      accNo: "1007",
      transactions: [],
    },
    {
      id: 8,
      name: "Joyce",
      password: "joyce123",
      balance: 50000,
      accNo: "1008",
      transactions: [],
    },
    {
      id: 9,
      name: "Christain",
      password: "christain123",
      balance: 50000,
      accNo: "1009",
      transactions: [],
    },
    {
      id: 10,
      name: "Naanshai",
      password: "naanshai123",
      balance: 50000,
      accNo: "1010",
      transactions: [],
    },
  ];
  const [users, setUsers] = useState(initialUsers);

  const login = (name, password) => {
    if (!name?.trim() || !password?.trim()) {
      return false;
    }

    const foundUser = users.find(
      (u) =>
        u.name.toLowerCase() === name.trim().toLowerCase() &&
        u.password === password,
    );

    if (!foundUser) {
      return false;
    }

    setUser(foundUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const transfer = (fromAccNo, toAccNo, amount, memo) => {
    const sender = users.find((u) => u.accNo === fromAccNo);
    const receiver = users.find((u) => u.accNo === toAccNo);

    if (!sender || !receiver || sender.balance < amount || amount <= 0) {
      return false;
    }

    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === sender.id) {
          return {
            ...u,
            balance: u.balance - amount,
            transactions: [
              ...u.transactions,
              { type: "debit", amount, memo, date: new Date().toISOString() },
            ],
          };
        }
        if (u.id === receiver.id) {
          return {
            ...u,
            balance: u.balance + amount,
            transactions: [
              ...u.transactions,
              { type: "credit", amount, memo, date: new Date().toISOString() },
            ],
          };
        }
        return u;
      }),
    );

    if (user && user.id === sender.id) {
      setUser((prev) => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [
          ...prev.transactions,
          { type: "debit", amount, memo, date: new Date().toISOString() },
        ],
      }));
    }

    return true;
  };

  return (
    <LoginContext.Provider value={{ user, login, logout, transfer }}>
      {children}
    </LoginContext.Provider>
  );
};
