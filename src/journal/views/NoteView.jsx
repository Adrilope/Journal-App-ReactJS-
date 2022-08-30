import { DeleteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"


export const NoteView = () => {

    const dispatch = useDispatch()

    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note)


    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return  // if user exit the input withouth chooising one

        dispatch(startUploadingFiles(target.files))
    }   

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    const fileInputRef = useRef()

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }, [date])


    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])


    useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire('Updated Note', messageSaved, 'success')
        }
    }, [messageSaved])


    return (
        <Grid 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{mb: 1}}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
            </Grid> 
            <Grid item>
                <input 
                    type='file'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary" 
                    sx={{padding: 2}}
                >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Save
                </Button>
            </Grid> 

            <Grid container>
                <TextField 
                    type='text'
                    variant="filled"
                    fullWidth
                    placeholder="Type a title"
                    label='Title'
                    sx={{border: 'none', mb: 1}}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField 
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid> 

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color='error'
                >
                    <DeleteOutlined />
                    Delete
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls} />
        </Grid>
    )
}
