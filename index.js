document.addEventListener("DOMContentLoaded", function() {
    // ----- Navigation Smooth Scrolling -----
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
    
    // ----- Transaction Form & List Management -----
    const transactionForm = document.querySelector(".transaction-form form");
    const transactionList = document.querySelector(".transaction-list ul");
    const incomeSummary = document.querySelector(".income-summary p");
    const expenseSummary = document.querySelector(".expense-summary p");
    const netBalance = document.querySelector(".net-balance p");
  
    let totalIncome = 0;
    let totalExpense = 0;
  
    function updateBalance() {
      totalIncome = 0;
      totalExpense = 0;
      const transactionItems = transactionList.querySelectorAll("li");
      transactionItems.forEach(item => {
        const amountText = item.querySelector(".amount").innerText;
        const amount = parseFloat(amountText.replace('$',''));
        if (amountText.startsWith('+')) {
          totalIncome += amount;
        } else {
          totalExpense += amount;
        }
      });
      const net = totalIncome - totalExpense;
      incomeSummary.textContent = `$${totalIncome.toFixed(2)}`;
      expenseSummary.textContent = `$${totalExpense.toFixed(2)}`;
      netBalance.textContent = `$${net.toFixed(2)}`;
    }
  
    transactionForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const tName = document.getElementById("transaction-name").value.trim();
      const tAmount = parseFloat(document.getElementById("transaction-amount").value);
      const tType = document.getElementById("transaction-type").value;
      if (!tName || isNaN(tAmount) || tAmount <= 0) {
        alert("Please provide valid transaction name and amount.");
        return;
      }
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${tName}</span>
        <span class="amount">${tType === "income" ? "+" : "-"}$${tAmount.toFixed(2)}</span>
        <button class="delete-btn">Delete</button>
      `;
      transactionList.appendChild(li);
      transactionForm.reset();
      li.querySelector(".delete-btn").addEventListener("click", function() {
        li.remove();
        updateBalance();
      });
      updateBalance();
    });
  
    // ----- Budget Goals -----
    const saveGoalsButton = document.querySelector(".save-goals");
    const incomeGoalInput = document.getElementById("income-goal");
    const expenseGoalInput = document.getElementById("expense-goal");
  
    saveGoalsButton.addEventListener("click", function() {
      const incomeGoal = incomeGoalInput.value.trim();
      const expenseGoal = expenseGoalInput.value.trim();
      if (!incomeGoal || !expenseGoal) {
        alert("Please set both income and expense goals.");
        return;
      }
      alert(`Goals saved!\nIncome Goal: $${incomeGoal}\nExpense Goal: $${expenseGoal}`);
    });
  });
  