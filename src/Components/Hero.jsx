import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/Hero.css";

const Hero = () => {
  const dispatch = useDispatch();
  const { users, transactions, error } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.login);

  const currentUser = users[0]; 
  const [formData, setFormData] = useState({
    fromAccount: currentUser?.accNo || "",
    recipientName: "",
    recipientAccNo: "",
    amount: "",
    memo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransfer = () => {
    dispatch({
      type: "login/transfer",
      payload: {
        senderId: currentUser?.id,
        toAccNo: formData.recipientAccNo,
        recipientName: formData.recipientName,
        amount: formData.amount,
        memo: formData.memo,
      },
    });

    if (!error) {
      setFormData({
        fromAccount: currentUser?.accNo || "",
        recipientName: "",
        recipientAccNo: "",
        amount: "",
        memo: "",
      });
    }
  };

  const userTransactions = transactions.filter(
    (t) => t.senderId === currentUser?.id || t.receiverId === currentUser?.id,
  );

  return (
    <section className="HeroContainer">
      <section className="HeroHolder">
        <aside className="Hero_left">
          <article className="hero_left_Holder">
            <h3>Transfer Funds</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="from">
              <h4>From Account</h4>
              <select
                name="fromAccount"
                className="editOption"
                value={formData.fromAccount}
                onChange={handleChange}
              >
                <option value="">
                  {currentUser?.accNo} - {currentUser?.name}
                </option>
              </select>
            </div>
            <div className="from">
              <h4>Recipent Name</h4>
              <input
                type="text"
                name="recipientName"
                placeholder="E.g Jane Smith"
                value={formData.recipientName}
                onChange={handleChange}
              />
            </div>
            <div className="from">
              <h4>Recipient Account Number</h4>
              <input
                type="text"
                name="recipientAccNo"
                placeholder="E.g 987654321"
                value={formData.recipientAccNo}
                onChange={handleChange}
              />
            </div>
            <div className="from">
              <h4>Amount</h4>
              <input
                type="number"
                name="amount"
                placeholder="₦ 0.00"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="memo">
              <h4>Memo (Optional)</h4>
              <textarea
                name="memo"
                placeholder="Rent, Dinner etc."
                value={formData.memo}
                onChange={handleChange}
              ></textarea>
            </div>
            <button className="send-btn" onClick={handleTransfer}>
              Send Transfer
            </button>
          </article>
        </aside>
        <aside className="Hero_right">
          <div className="hero_right_upper">
            <div className="total">
              <p>Total Available Balance</p>
              <h1>₦{currentUser?.balance?.toLocaleString()}</h1>
              <p>Account: {currentUser?.accNo}</p>
            </div>
          </div>
          <div className="hero_right_lower">
            <div className="transaction">
              <h4>Transaction History</h4>
              {userTransactions.length > 0 ? (
                userTransactions.slice(-5).map((t, idx) => (
                  <div
                    key={idx}
                    className={
                      t.senderId === currentUser?.id ? "debit" : "credit"
                    }
                  >
                    <p>{t.senderId === currentUser?.id ? "Debit" : "Credit"}</p>
                    <p>
                      {t.senderId === currentUser?.id ? "- " : "+ "}₦
                      {t.amount?.toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>No transactions yet</p>
              )}
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
};

export default Hero;
