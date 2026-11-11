# Auto Delete Todo List

React + TypeScript (Vite). Click an item to sort it into Fruit or Vegetable.
After 5 seconds it goes back to the bottom of the basket. Click it in its
column to send it back right away.

```
npm install
npm run dev     # local
npm test        # timer + move/return behaviour
npm run build   # production build in dist/
```

## How it works
- `hooks/columnsReducer.ts`: pure state transitions (`move`, `return`). `return` is idempotent, so a timer firing and a click can't double-move an item.
- `hooks/useAutoReturnColumns.ts`: one timeout per item (so every item gets its own 5s), cleared on manual return and on unmount.
- `components/Column.tsx`: one presentational component for all three columns.
