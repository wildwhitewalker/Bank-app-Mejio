import React, { useState } from "react";

function TransferFunds({ currentUser, onUpdateCurrentUser }) {
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [recipientDetails, setRecipientDetails] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipientDetails({
      ...recipientDetails,
      [name]: value,
    });
  };

  const handleTransaction = () => {
    if (!transactionAmount || isNaN(transactionAmount)) {
      alert("Please enter a valid amount to transfer.");
      return;
    }

    const senderBalance = parseFloat(currentUser.accountBalance);

    if (parseFloat(transactionAmount) > senderBalance) {
      alert("Insufficient balance to transfer that amount.");
      return;
    }

    if (!recipientDetails.accountNumber) {
      alert("Please enter the recipient's account number.");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const recipient = accounts.find(
      (account) => account.accountNumber === recipientDetails.accountNumber
    );

    if (!recipient) {
      alert("Recipient account not found.");
      return;
    }

    // Calculate updated balances
    const updatedSenderBalance = senderBalance - parseFloat(transactionAmount);
    const updatedRecipientBalance =
      parseFloat(recipient.accountBalance) + parseFloat(transactionAmount);

    // Update the balances in the accounts array
    const updatedAccounts = accounts.map((account) => {
      if (account.accountNumber === recipient.accountNumber) {
        account.accountBalance = updatedRecipientBalance.toFixed(2);
      }
      return account;
    });

    // Update local storage with the updated account balances
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    // Update currentUser with the new balance
    const updatedCurrentUser = { ...currentUser, accountBalance: updatedSenderBalance.toFixed(2) };
    onUpdateCurrentUser(updatedCurrentUser);

    // Reset form fields
    setTransactionAmount(0);
    setRecipientDetails({
      firstName: "",
      lastName: "",
      accountNumber: "",
    });

    // Provide a success message or redirect to a success page
    alert("Funds transferred successfully!");
  };

  return (
    <div className="bg-gradient-to-r from-yellow-300 via-red-500 to-purple-500 min-h-screen flex items-center justify-center text-white">
      <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Transfer Funds</h2>
        <form
          onSubmit={handleTransaction}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={recipientDetails.firstName}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 rounded bg-gray-100 focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={recipientDetails.lastName}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 rounded bg-gray-100 focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block">Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={recipientDetails.accountNumber}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 rounded bg-gray-100 focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block">Enter Amount:</label>
            <input
              type="number"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="block w-full px-4 py-2 rounded bg-gray-100 focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransferFunds;