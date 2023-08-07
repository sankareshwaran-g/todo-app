import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    tasksList: [],
    selectedTask: {},
    isLoading:false,
    error:''  
}

const BASE_URL = 'http://localhost:9000/tasks'

//GET
export const getTaskFromServer = createAsyncThunk(
    "task/getTaskFromServer" ,
    async(_,{rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        if (response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'No task found'})
        }
    }
)
//POST
export const addTaskToServer = createAsyncThunk(
    "task/addTaskToServer" ,
    async(task,{rejectWithValue}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL,options)
        if (response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Task Not Added'})
        }
    }
)

//PATCH
export const updateTaskToServer = createAsyncThunk(
    "task/updateTaskToServer" ,
    async(task,{rejectWithValue}) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL + '/' + task.id,options)
        if (response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Task Not updated'})
        }
    }
)

//DELETE
export const deleteTaskToServer = createAsyncThunk(
    "task/deleteTaskToServer" ,
    async(task,{rejectWithValue}) => {
        const options = {
            method: 'DELETE',
            
        }
        const response = await fetch(BASE_URL + '/' + task.id,options)
        if (response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'Task Not deleted'})
        }
    }
)

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        removeTaskFromList: (state, action) => {
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)
        },        
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTaskFromServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getTaskFromServer.fulfilled,(state,action)=>{
                state.isLoading = false
                state.error = ''
                state.tasksList= action.payload
            })
            .addCase(getTaskFromServer.rejected,(state,action)=>{
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList= []
            })
            .addCase(addTaskToServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(addTaskToServer.fulfilled,(state,action)=>{
                state.isLoading = false
                state.error = ''
                state.tasksList.push(action.payload)
            })
            .addCase(addTaskToServer.rejected,(state,action)=>{
                state.error = action.payload.error
                state.isLoading = false                
            })
            .addCase(updateTaskToServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(updateTaskToServer.fulfilled,(state,action)=>{
                state.isLoading = false
                state.error = ''
                state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateTaskToServer.rejected,(state,action)=>{
                state.error = action.payload.error
                state.isLoading = false                
            })
            .addCase(deleteTaskToServer.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(deleteTaskToServer.fulfilled,(state,action)=>{
                state.isLoading = false
                state.error = ''
           })
            .addCase(deleteTaskToServer.rejected,(state,action)=>{
                state.error = action.payload.error
                state.isLoading = false                
            })
    }
})

export const { addTaskToList, removeTaskFromList, updateTaskInList, setSelectedTask } = taskSlice.actions

export default taskSlice.reducer
