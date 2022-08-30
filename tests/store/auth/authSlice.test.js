import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"


describe('Tests with authSlice', () => { 
    test('should return the initialState and be called "auth"', () => { 
        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState)
        expect(authSlice.name).toBe('auth')
    })

    test('should do the login action', () => { 
        const state = authSlice.reducer(initialState, login(demoUser))

        expect(state).toEqual(authenticatedState)
    })

    test('should do the logout action without args', () => { 
        const state = authSlice.reducer(authenticatedState, logout())

        expect(state).toEqual({
            status: 'not-authenticated',    
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    })

    test('should do the logout action and show the errorMessage', () => { 
        const error = { errorMessage: 'User not found' }
        const state = authSlice.reducer(authenticatedState, logout(error))

        expect(state).toEqual({
            status: 'not-authenticated',    
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: error.errorMessage
        })
    })

    test('should set the status to checking', () => { 
        const state = authSlice.reducer(authenticatedState, checkingCredentials())

        expect(state.status).toBe('checking')
    })
})