import { useMemo, useState } from 'react'
import { Link as RouterLink} from 'react-router-dom'
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'


const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'Email should include an @'],
    password: [(value) => value.length >= 6, 'Password shoud have at least six characters'],
    displayName: [(value) => value.length >= 1, 'Name is obligatory']
}


export const RegisterPage = () => {

    const dispatch = useDispatch()

    const [ formSumitted, setFormSumitted ] = useState(false)

    const { status, errorMessage } = useSelector(state => state.auth)

    const isCheckingAuth = useMemo(() => status === 'checking', [status])

    const { 
        formState, displayName, email, password, onInputChange, 
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations)

    const onSubmit = (event) => {
        event.preventDefault()
        setFormSumitted(true)

        if(!isFormValid) return

        dispatch(startCreatingUserWithEmailPassword(formState))
    }


    return (
        <AuthLayout title='Register'>
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField 
                            label='Name'
                            type='text'
                            placeholder="John Marston"
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSumitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField 
                            label='Email' 
                            type='email'
                            placeholder="email@gmail.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSumitted}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField 
                            label='Password' 
                            type='password'
                            placeholder="Password"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSumitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid 
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                disabled={isCheckingAuth}
                                type='submit'
                                variant="contained" 
                                fullWidth
                            >
                                Create account
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{mr: 2}}>Already have an account?</Typography>
                        <Link 
                            component={RouterLink}
                            color='inherit' 
                            to='/auth/login'
                        >
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
