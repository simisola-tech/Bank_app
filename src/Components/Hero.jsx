import React, { useState } from "react";
import { useLogin } from "../Context/LoginContext";
import "../Styles/Hero.css";

const Hero = () => {
  const { user, transfer } = useLogin();
  const [formData, setFormData] = useState({
    fromAccount: "",
    recipientName: "",
    recipientAccount: "",
    amount: "",
    memo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in first.");
      return;
    }
    const success = transfer(
      user.accNo,
      formData.recipientAccount,
      parseFloat(formData.amount),
      formData.memo,
    );
    if (success) {
      alert("Transfer successful!");
      setFormData({
        fromAccount: "",
        recipientName: "",
        recipientAccount: "",
        amount: "",
        memo: "",
      });
    } else {
      alert("Transfer failed. Check details.");
    }
  };

  const totalDebit = user
    ? user.transactions
        .filter((t) => t.type === "debit")
        .reduce((sum, t) => sum + t.amount, 0)
    : 0;
  const totalCredit = user
    ? user.transactions
        .filter((t) => t.type === "credit")
        .reduce((sum, t) => sum + t.amount, 0)
    : 0;

  return (
    <section className="HeroContainer">
      <section className="HeroHolder">
        <aside className="Hero_left">
          <article className="hero_left_Holder">
            <h3>Transfer Funds</h3>
            <form onSubmit={handleSubmit}>
              <div className="from">
                <label htmlFor="fromAccount">From Account</label>
                <select
                  name="fromAccount"
                  id="fromAccount"
                  className="editOption"
                  value={formData.fromAccount}
                  onChange={handleChange}
                >
                  <option value="">Select Account</option>
                  <option value="checking">Checking Account</option>
                  <option value="savings">Savings Account</option>
                </select>
              </div>
              <div className="from">
                <label htmlFor="recipientName">Recipient Name</label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  placeholder="E.g Jane Smith"
                  value={formData.recipientName}
                  onChange={handleChange}
                />
              </div>
              <div className="from">
                <label htmlFor="recipientAccount">
                  Recipient Account Number
                </label>
                <input
                  type="text"
                  id="recipientAccount"
                  name="recipientAccount"
                  placeholder="E.g 4321"
                  value={formData.recipientAccount}
                  onChange={handleChange}
                />
              </div>
              <div className="from">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="memo">
                <label htmlFor="memo">Memo (Optional)</label>
                <textarea
                  id="memo"
                  name="memo"
                  placeholder="Rent, Dinner etc."
                  value={formData.memo}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="send-btn">
                Send Transfer
              </button>
            </form>
          </article>
        </aside>
        <aside className="Hero_right">
          <div className="hero_right_upper">
            <div className="total">
              <p>Total Available Balance</p>
              <h1>₦{user ? user.balance.toLocaleString() : "0.00"}</h1>
              <p>Account: {user ? user.accNo : "N/A"}</p>
            </div>
          </div>
          <div className="hero_right_lower">
            <div className="transaction">
              <h4>Transaction History</h4>
              <div className="debit">
                <p>Debit</p>
                <p>- ₦{totalDebit.toLocaleString()}</p>
              </div>
              <div className="credit">
                <p>Credit</p>
                <p>+ ₦{totalCredit.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
};

export default Hero;
