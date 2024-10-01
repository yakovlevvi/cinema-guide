import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUser, User } from '../api/User'

interface AuthState {
	isAuthenticated: boolean
	user: User | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	status: 'idle',
}

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
	const user = await fetchUser()
	return user
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess(state, action) {
			state.user = action.payload // Прямое обновление состояния
			state.isAuthenticated = true
		},
		logout(state) {
			state.isAuthenticated = false
			state.user = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.user = action.payload
				state.isAuthenticated = true
			})
			.addCase(checkAuth.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(checkAuth.rejected, (state) => {
				state.status = 'failed'
			})
	},
})

// Экспорт действий (actions)
export const { logout, loginSuccess } = authSlice.actions

// Экспорт редьюсера для добавления в store
export default authSlice.reducer
