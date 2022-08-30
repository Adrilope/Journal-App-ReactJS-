import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth"
import { startGoogleSignIn } from "../../../src/store/auth/thunks"
import { notAuthenticatedState } from "../../fixtures/authFixtures"


const mockStartGoogleSignIn = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn
}))


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    // set the initial state to not athenticated
    preloadedState: {
        auth: notAuthenticatedState
    }
})


describe('Tests with <LoginPage />', () => { 
    test('should render the component correctly', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        // screen.debug()
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
    })

    test('google button should call startGoogleSignIn', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn')
        fireEvent.click(googleBtn)

        expect(mockStartGoogleSignIn).toHaveBeenCalled()
    })
})