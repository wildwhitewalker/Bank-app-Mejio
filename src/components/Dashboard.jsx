import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setAccountNumber(currentUser.accountNumber);
      setAccountBalance(currentUser.accountBalance);
      setAccountName(currentUser.firstName);
    }
  }, []);

  const navigate = useNavigate();

  const onTransfer = () => {
    navigate("/transfer");
  };

  const onDeposit = () => {
    navigate("/deposit");
  };

  const onWithdraw = () => {
    navigate("/withdraw");
  };

  return (
    <>
      <div className="dashboard bg-gradient-to-r from-yellow-300 via-red-500 to-purple-500 min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Welcome {accountName}!</h2>
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg mb-4">Account Number: {accountNumber}</p>
          <p className="text-lg mb-4">Account Balance: ${accountBalance}</p>
          <div className="space-x-4">
            <button
              onClick={onTransfer}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Transfer
            </button>
            <button
              onClick={onDeposit}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Deposit
            </button>
            <button
              onClick={onWithdraw}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;