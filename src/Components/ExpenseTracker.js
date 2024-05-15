import React, { useState, useEffect } from 'react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [inputExpense, setInputExpense] = useState('');
  const [inputAmount, setInputAmount] = useState('');

  const addExpense = () => {
    if (inputExpense !== '' && inputAmount !== '') {
      setExpenses([...expenses, { id: Date.now(), expense: inputExpense, amount: parseFloat(inputAmount), marked: false }]);
      setInputExpense('');
      setInputAmount('');
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const markExpense = (id) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, marked: !expense.marked } : expense
      )
    );
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <div className="expense-form">
        <input
          type="text"
          placeholder="Expense"
          value={inputExpense}
          onChange={(e) => setInputExpense(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div className="expense-list">
        <h2>Expenses:</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className={expense.marked ? 'marked' : ''}>
              <span>{expense.expense}</span>
              <span>₹{expense.amount.toFixed(2)}</span>
              <div>
                <button className="delete" onClick={() => deleteExpense(expense.id)}>Delete</button>
                <button className="mark" onClick={() => markExpense(expense.id)}>
                  {expense.marked ? 'Unmark' : 'Mark'}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total Expenses: ₹{calculateTotalExpenses().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ExpenseTracker;
