import { Column } from './components/Column'
import { ITEMS, RETURN_DELAY_MS } from './data'
import { useAutoReturnColumns } from './hooks/useAutoReturnColumns'

export default function App() {
  const { columns, moveToColumn, sendBack } = useAutoReturnColumns(
    ITEMS,
    RETURN_DELAY_MS,
  )

  return (
    <main className="app">
      <h1>Sort the basket</h1>
      <p className="app__hint">
        Click an item to sort it. It returns to the list after 5 seconds, or
        click it again to send it back now.
      </p>

      <div className="board">
        <Column
          variant="list"
          title="Basket"
          items={columns.list}
          onItemClick={moveToColumn}
          actionLabel={(item) => `Sort ${item.name} into ${item.type}`}
        />
        <Column
          variant="fruit"
          title="Fruit"
          items={columns.Fruit}
          onItemClick={sendBack}
          actionLabel={(item) => `Return ${item.name} to the basket`}
          countdownMs={RETURN_DELAY_MS}
        />
        <Column
          variant="vegetable"
          title="Vegetable"
          items={columns.Vegetable}
          onItemClick={sendBack}
          actionLabel={(item) => `Return ${item.name} to the basket`}
          countdownMs={RETURN_DELAY_MS}
        />
      </div>
    </main>
  )
}
