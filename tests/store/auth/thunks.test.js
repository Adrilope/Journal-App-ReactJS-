import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../fixtures/authFixtures"


jest.mock('../../../src/firebase/providers')

describe('Tests with auth thunks', () => { 

    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())


    test('should call checkingCredentials', async() => { 
        await checkingAuthentication()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })

    test('startGoogleSignIn should call checkingCredentials and login', async() => { 
        const loginData = {ok: true, ...demoUser}

        await signInWithGoogle.mockResolvedValue(loginData)

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startGoogleSignIn should call checkingCredentials and logout - Error', async() => { 
        const loginData = { ok: false, errorMessage: 'Google error' }

        await signInWithGoogle.mockResolvedValue(loginData)

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    })

    test('startCreatingUserWithEmailPassword should call checkingCredentials and login', async() => { 
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }
        
        await registerUserWithEmailPassword.mockResolvedValue(loginData)

        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startCreatingUserWithEmailPassword should call checkingCredentials and logout - Error', async() => { 
        const loginData = { ok: false, errorMessage: 'Error creating user' }
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }

        await registerUserWithEmailPassword.mockResolvedValue(loginData)

        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData))
    })

    test('startLoginWithEmailPassword should call checkingCredentials and login', async() => { 
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startLogout should call logoutFirebase, clearNotesLogout and logout', async() => { 
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())
    })
})