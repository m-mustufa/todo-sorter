export type ItemType = 'Fruit' | 'Vegetable'

export interface Item {
  type: ItemType
  name: string
}

export type ColumnKey = 'list' | ItemType

export type Columns = Record<ColumnKey, Item[]>
