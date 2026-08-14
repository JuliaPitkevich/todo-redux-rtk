# Frontend — Todo Redux RTK

## Stack
- React 19 + Vite 8
- Redux Toolkit (RTK) — slices + createAsyncThunk
- React Router (react-router v8 + react-router-dom v7)
- SASS for styling
- Native `fetch` (no axios)

## Commands
- `npm run dev` — dev server (port 5173)
- `npm run build` — production build
- `npm run lint` — ESLint

## Environment
`.env` file with:
- `VITE_API_URL` — backend URL (e.g. `http://localhost:5000`)

Production fallback: `https://todo-redev.onrender.com` (no `/api` prefix)

## Architecture
```
src/
  api/
    api.js          — fetch wrapper (get/post/patch/delete), auto-attaches Bearer token, 401 auto-logout
    authApi.js      — login, register, getUser
    todosApi.js     — CRUD + toggle
  rtk/
    store.js        — configureStore
    slices/
      authSlice.js  — authUser thunk, token in localStorage
      todosSlice.js — getTodos, createTodo, updateTodo, deleteTodo, toggleTodo, deleteAllTodos
  helpers/
    token.js        — localStorage get/set/remove/isAuthorized
    validator.js    — form validation
    authForm.js     — form field config
  components/       — UI components
  pages/            — route pages (auth, todos, notFound)
  shared/           — reusable UI (Button, Input, ConfirmModal, ErrorMessage, Loading)
```

## API contract (backend must match)
- Auth: `POST /auth/register`, `POST /auth/login` → `{ access_token }`
- User: `GET /auth/me` → `{ name, email }`
- Todos: `GET /todos` → `{ data: [...] }`
- Create: `POST /todos` body `{ title, description }` → task object
- Update: `PATCH /todos/:id` body `{ title?, description?, completed? }` → task object
- Toggle: `PATCH /todos/:id/toggle` → task object
- Delete: `DELETE /todos/:id` → response ignored, thunk returns `id`
- Task object shape: `{ id, title, description, completed, userId }`

## Key conventions
- Token stored in localStorage under key `"token"`
- `apiClient` auto-attaches `Authorization: Bearer <token>` header
- On 401 response: token is removed and user is redirected to `/auth`
- `todosSlice` expects `action.payload.data` for `getTodos` (wrapped in `{ data }`)
- `createTodo` expects raw task object (no wrapper) and unshifts into list
- `deleteAllTodos` deletes tasks individually via `Promise.all`
- Task IDs are strings (MongoDB ObjectId converted to string on backend via `formatTask`)
- `pagehide` event removes token from localStorage (forces re-auth on return)
- Error messages from backend are read via `data.message` key
