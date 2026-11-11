import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const basket = () => screen.getByRole('region', { name: 'Basket' })
const fruit = () => screen.getByRole('region', { name: 'Fruit' })
const vegetable = () => screen.getByRole('region', { name: 'Vegetable' })
const names = (el: HTMLElement) =>
  within(el).queryAllByRole('button').map((b) => b.textContent)

describe('Auto delete todo list', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    render(<App />)
  })
  afterEach(() => vi.useRealTimers())

  const click = (name: string) =>
    fireEvent.click(screen.getByRole('button', { name }))
  const wait = (ms: number) => act(() => { vi.advanceTimersByTime(ms) })

  it('moves an item to the column matching its type', () => {
    click('Sort Apple into Fruit')
    click('Sort Broccoli into Vegetable')

    expect(names(fruit())).toEqual(['Apple'])
    expect(names(vegetable())).toEqual(['Broccoli'])
    expect(names(basket())).not.toContain('Apple')
  })

  it('sends the item to the bottom of the list after 5 seconds', () => {
    click('Sort Apple into Fruit')

    wait(4999)
    expect(names(fruit())).toEqual(['Apple'])

    wait(1)
    expect(names(fruit())).toEqual([])
    expect(names(basket()).at(-1)).toBe('Apple')
  })

  it('gives every item its own 5 second timer', () => {
    click('Sort Apple into Fruit')
    wait(3000)
    click('Sort Banana into Fruit')

    wait(2000)
    expect(names(fruit())).toEqual(['Banana'])

    wait(3000)
    expect(names(fruit())).toEqual([])
    expect(names(basket()).slice(-2)).toEqual(['Apple', 'Banana'])
  })

  it('returns an item immediately when clicked in its column', () => {
    click('Sort Mango into Fruit')
    click('Return Mango to the basket')

    expect(names(fruit())).toEqual([])
    expect(names(basket()).at(-1)).toBe('Mango')
  })

  it('cancels the old timer so a re-sorted item gets a full 5 seconds', () => {
    click('Sort Mango into Fruit')
    wait(4000)
    click('Return Mango to the basket')
    click('Sort Mango into Fruit')

    wait(1500)
    expect(names(fruit())).toEqual(['Mango'])

    wait(3500)
    expect(names(fruit())).toEqual([])
  })
})
