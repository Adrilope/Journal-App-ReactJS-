import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth"
import { startGoogleSignIn } from "../../../src/store/auth/thunks"
import { notAuthenticatedState } from "../../fixtures/authFixtures"


const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password})
    }
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
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
    beforeEach(() => jest.clearAllMocks())

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

    test('submit should call startLoginWithEmailPassword', () => { 
        const email = 'adri@google.com'
        const password = '123456'
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )


        const emailField = screen.getByRole('textbox', {name: 'Email'})
        fireEvent.change(emailField, {target: { name: 'email', value: email}})

        const passwordField = screen.getByTestId('password')
        fireEvent.change(passwordField, {target: { name: 'password', value: password}})

        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.submit(loginForm)


        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    })
})