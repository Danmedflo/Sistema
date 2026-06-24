export function groupTransactionsByMonth(transactions) {
  const monthMap = new Map();

  transactions.forEach((item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;

    if (!monthMap.has(key)) {
      monthMap.set(key, {
        key,
        dateOrder: new Date(year, month, 1).getTime(),
        month: date.toLocaleString("es-PE", {
          month: "short",
          year: "numeric",
        }),
        income: 0,
        expense: 0,
      });
    }

    const current = monthMap.get(key);

    if (item.type === "Ingreso") {
      current.income += Number(item.amount);
    } else {
      current.expense += Number(item.amount);
    }
  });

  return Array.from(monthMap.values())
    .sort((a, b) => a.dateOrder - b.dateOrder)
    .map((item) => ({
      month: item.month,
      income: item.income,
      expense: item.expense,
    }));
}

export function groupExpensesByCategory(transactions) {
  const categoryMap = new Map();

  transactions
    .filter((item) => item.type === "Gasto")
    .forEach((item) => {
      const currentValue = categoryMap.get(item.category) || 0;
      categoryMap.set(item.category, currentValue + Number(item.amount));
    });

  return Array.from(categoryMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));
}