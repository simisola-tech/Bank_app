import React from "react";
import "../Styles/Hero.css";

const Hero = () => {
  return (
    <section className="HeroContainer">
      <section className="HeroHolder">
        <aside className="Hero_left">
          <article className="hero_left_Holder">
            <h3>Transfer Funds</h3>
            <div className="from">
              <h4>From Account</h4>
              <select name="acct" className="editOption">
                <option value=""></option>
              </select>
            </div>
            <div className="from">
              <h4>Recipent Account</h4>
              <input type="text" placeholder="E.g Jane Smith" />
            </div>
            <div className="from">
              <h4>Recipient Account Number</h4>
              <input type="text" placeholder="E.g 987654321" />
            </div>
            <div className="from">
              <h4>Amount</h4>
              <input type="text" placeholder="₦ 0:00" />
            </div>
            <div className="memo">
              <h4>Memo (Optional)</h4>
              <textarea placeholder="Rent, Dinner etc."></textarea>
            </div>
            <button className="send-btn">Send Transfer</button>
          </article>
        </aside>
        <aside className="Hero_right">
          <div className="hero_right_upper">
            <div className="total">
              <p>Total Available Balance</p>
              <h1>₦12,450.80</h1>
              <p>Across 2 accounts</p>
            </div>
          </div>
          <div className="hero_right_lower">
            <div className="transaction">
              <h4>Transaction History</h4>
              <div className="debit">
                <p>Debit</p>
                <p>- ₦3,200.00</p>
              </div>
              <div className="credit">
                <p>Credit</p>
                <p>+ ₦9,250.80</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
};

export default Hero;
