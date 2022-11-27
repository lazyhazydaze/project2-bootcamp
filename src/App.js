import React, { useState } from "react";
import { ref as databaseRef, push, set } from "firebase/database";
import { database } from "./firebase";

export default function App() {
  const [invoice, setInvoice] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  const [newSpender, setNewSpender] = useState("");
  const [allSpenders, setAllSpenders] = useState([]);

  const [newExpense, setNewExpense] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);

  const handleChangeExpenses = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitSpenders = (e) => {
    e.preventDefault();
    setAllSpenders((prevRecords) => [newSpender, ...prevRecords]);
    setNewSpender("");
  };

  const handleSubmitExpenses = (e) => {
    e.preventDefault();
    setAllExpenses((prevRecords) => [newExpense, ...prevRecords]);
    setNewExpense({});
  };

  const handleSubmitAll = (e) => {
    e.preventDefault();
    const dbRef = push(databaseRef(database, "INVOICE"));
    console.log("handleSubmitAll dbRef.key", dbRef.key);
    set(dbRef, {
      invoice,
      author,
      date,
      allExpenses,
      allSpenders,
    });
    setInvoice("");
    setAuthor("");
    setDate("");
    setAllExpenses({});
    setAllSpenders([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmitAll}>
        <input
          type="text"
          name="invoice"
          value={invoice}
          placeholder="Enter Invoice Name"
          onChange={({ target }) => setInvoice(target.value)}
        />
        <input
          type="text"
          name="author"
          value={author}
          placeholder="Enter Author Name"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <input
          type="text"
          name="date"
          value={date}
          placeholder="Enter Date"
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <input
          type="text"
          name="spender"
          value={newSpender}
          placeholder="Enter Friend in group"
          onChange={({ target }) => setNewSpender(target.value)}
        />
        <button onClick={handleSubmitSpenders}>Add spender to group</button>
        <br />
        <input
          type="text"
          name="item"
          value={newExpense.item ? newExpense.item : ""}
          placeholder="Enter Item Name"
          onChange={handleChangeExpenses}
        />
        <input
          type="text"
          name="amount"
          value={newExpense.amount ? newExpense.amount : ""}
          placeholder="Enter Item Amount"
          onChange={handleChangeExpenses}
        />
        <input
          type="text"
          name="paidby"
          value={newExpense.paidby ? newExpense.paidby : ""}
          placeholder="Paid by who"
          onChange={handleChangeExpenses}
        />
        <input
          type="text"
          name="splitby"
          value={newExpense.splitby ? newExpense.splitby : ""}
          placeholder="Split amongst who"
          onChange={handleChangeExpenses}
        />
        <button onClick={handleSubmitExpenses}>Add expenses to list</button>
        <br />
        <input type="submit" value="Save Record" />
      </form>
      <h2>
        Display Invoice, Author, Date: {invoice},{date},{author}{" "}
      </h2>
      <h2>Display all Spenders: {JSON.stringify(allSpenders, "", 2)}</h2>
      <h2>Display all Expenses: {JSON.stringify(allExpenses, "", 2)}</h2>
    </div>
  );
}
