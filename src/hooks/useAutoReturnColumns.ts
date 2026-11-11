import { useCallback, useEffect, useReducer, useRef } from 'react'
import type { Item } from '../types'
import { columnsReducer, createColumns } from './columnsReducer'

/**
 * Moves items from the main list into a column by type.
 * Each moved item goes back to the bottom of the list after `delayMs`,
 * or immediately when it is sent back by hand.
 */
export function useAutoReturnColumns(items: Item[], delayMs: number) {
  const [columns, dispatch] = useReducer(columnsReducer, items, createColumns)
  const timers = useRef(new Map<string, number>())

  const sendBack = useCallback((item: Item) => {
    window.clearTimeout(timers.current.get(item.name))
    timers.current.delete(item.name)
    dispatch({ type: 'return', item })
  }, [])

  const moveToColumn = useCallback(
    (item: Item) => {
      if (timers.current.has(item.name)) return
      dispatch({ type: 'move', item })
      timers.current.set(
        item.name,
        window.setTimeout(() => sendBack(item), delayMs),
      )
    },
    [delayMs, sendBack],
  )

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((id) => window.clearTimeout(id))
  }, [])

  return { columns, moveToColumn, sendBack }
}
