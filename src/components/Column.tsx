import type { Item } from '../types'

interface ColumnProps {
  title: string
  items: Item[]
  onItemClick: (item: Item) => void
  actionLabel: (item: Item) => string
  /** When set, items show a countdown bar lasting this many ms. */
  countdownMs?: number
  variant: 'list' | 'fruit' | 'vegetable'
}

export function Column({
  title,
  items,
  onItemClick,
  actionLabel,
  countdownMs,
  variant,
}: ColumnProps) {
  const headingId = `column-${variant}`

  return (
    <section className={`column column--${variant}`} aria-labelledby={headingId}>
      <header className="column__header">
        <h2 id={headingId}>{title}</h2>
        <span className="column__count">{items.length}</span>
      </header>

      <ul className="column__items">
        {items.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              className="chip"
              aria-label={actionLabel(item)}
              onClick={() => onItemClick(item)}
            >
              {item.name}
              {countdownMs !== undefined && (
                <span
                  className="chip__countdown"
                  style={{ animationDuration: `${countdownMs}ms` }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && <p className="column__empty">Nothing here</p>}
    </section>
  )
}
