import type { Columns, Item } from '../types'

export type Action =
  | { type: 'move'; item: Item }
  | { type: 'return'; item: Item }

export const createColumns = (items: Item[]): Columns => ({
  list: items,
  Fruit: [],
  Vegetable: [],
})

const without = (items: Item[], target: Item) =>
  items.filter((item) => item.name !== target.name)

export function columnsReducer(state: Columns, action: Action): Columns {
  const { item } = action

  switch (action.type) {
    case 'move': {
      // Ignore stale clicks: the item must still be in the main list.
      if (!state.list.some((i) => i.name === item.name)) return state
      return {
        ...state,
        list: without(state.list, item),
        [item.type]: [...state[item.type], item],
      }
    }
    case 'return': {
      // Idempotent: the timer and a manual click can race, only one wins.
      if (!state[item.type].some((i) => i.name === item.name)) return state
      return {
        ...state,
        [item.type]: without(state[item.type], item),
        list: [...state.list, item],
      }
    }
  }
}
