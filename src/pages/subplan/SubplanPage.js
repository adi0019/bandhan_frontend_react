
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SubplanPage.css"; // Ensure styles are applied if needed

const SubplanPage = () => {
    
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#fff8e1"; // Light yellow-orange tone

    return () => {
      document.body.style.backgroundColor = ""; // Reset to default
    };
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_live_KmV3z7hQuIkyoZ", 
      amount: 100, // Amount in paise (₹100.00 = 10000 paise)
      currency: "INR", 
      name: "Bandhan", 
      description: "Premium Subscription", 
      image: "https://example.com/logo.png", 
      handler: function (response) {
        // Handle the payment 
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        setPaymentSuccessful(true);
        
        
      },
      prefill: {
        name: "Customer Name", 
        email: "customer@example.com", 
        contact: "8669190728", 
      },
      notes: {
        address: "Your Address", 
      },
      theme: {
        color: "#F37254", 
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="subplan-container">
      <h1>Choose Your Subscription Plan</h1>
      <div className="subscription-options">
        {/* Free Plan */}
        <div className="subscription-card">
          <h2>Free Plan</h2>
          <p> Matchmaking </p>
          <ul>
            <li> Matchmaking Tools</li>
          </ul>
          <Link to="/createprofile">
          <button>Select</button>
          </Link>
        </div>

        {/* Premium Plan */}
        <div className="subscription-card">
          <h2>Premium Plan</h2>
          <p>Advance Features </p>
          <ul>
            <li>Video Calling</li>
            <li>Messaging</li>
            <li>Enhanced Privacy Controls</li>
          </ul>
          <p style={{ fontWeight: "bold", margin: "10px 0" }}>Price:- ₹100.0</p>
          <button onClick={handlePayment}>Select</button>
        </div>
      </div>
      {paymentSuccessful && (
      <div>
          <p>Your payment was successful! Click below to proceed:</p>
          <Link to="/createprofile">
            <button>OK</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubplanPage;
