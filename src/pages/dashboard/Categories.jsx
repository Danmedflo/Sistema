import { mockCategories } from "../../data/mockCategories";

function Categories() {
  const incomeCategories = mockCategories.filter(
    (item) => item.type === "Ingreso"
  );

  const expenseCategories = mockCategories.filter(
    (item) => item.type === "Gasto"
  );

  return (
    <div className="categories-page">
      <div className="page-header">
        <div>
          <h2>Categorías</h2>
          <p>Organiza tus ingresos y gastos por tipo de categoría.</p>
        </div>
      </div>

      <div className="categories-grid">
        <section className="panel-card">
          <div className="panel-card-header">
            <h3>Categorías de ingresos</h3>
            <span className="table-count">{incomeCategories.length} items</span>
          </div>

          <div className="category-list">
            {incomeCategories.map((item) => (
              <div key={item.id} className="category-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.type}</p>
                </div>
                <span className="badge badge-income">Activo</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-card-header">
            <h3>Categorías de gastos</h3>
            <span className="table-count">{expenseCategories.length} items</span>
          </div>

          <div className="category-list">
            {expenseCategories.map((item) => (
              <div key={item.id} className="category-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.type}</p>
                </div>
                <span className="badge badge-expense">Activo</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Categories;