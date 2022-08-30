import { useEffect, useMemo, useState } from 'react';


export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({})

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues = {}

        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage = 'This field is obligatory' ] = formValidations[formField]

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        setFormValidation(formCheckedValues)
    }

    const isFormValid = useMemo(() => {
        for (const fieldValue of Object.keys(formValidation)) {
            if(formValidation[fieldValue] !== null) {
                return false
            }
        }
        return true;
    }, [formValidation])



    useEffect(() => {
        createValidators()
    }, [formState])


    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm])



    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        ...formValidation
    }
}