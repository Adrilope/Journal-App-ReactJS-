import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { fileUpload, loadNotes } from '../../helpers'
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'


export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote())

        const { uid } = getState().auth
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        // indicate the DB to use and the path to store the note 
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        // save the note
        await setDoc(newDoc, newNote)
        
        newNote.id = newDoc.id

        // call the actions to activate and add the note
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}


export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        if(!uid) throw new Error('The uid does not exist')

        const notes = await loadNotes(uid)
        
        dispatch(setNotes(notes))
    }
}


export const startSavingNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving())

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const noteToFireStore = {...note}
        // delete idNote to avoid creating two with same id
        delete noteToFireStore.id 
        
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        // 3 arg is to merge the new note with the existing one
        await setDoc(docRef, noteToFireStore, {merge: true})

        dispatch(updateNote(note))
    }
}


export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving())


        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        // uploading multiple photos at the same time
        const photosUrls = await Promise.all(fileUploadPromises)
        
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}


export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth
        const { active:note } = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        
        dispatch(deleteNoteById(note.id))
    }
}