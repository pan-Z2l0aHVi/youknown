import { configureStore } from '@reduxjs/toolkit'
import ui_slice from './ui'
import user_slice from './user'

const store = configureStore({
	reducer: {
		ui: ui_slice.reducer,
		user: user_slice.reducer
	}
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
