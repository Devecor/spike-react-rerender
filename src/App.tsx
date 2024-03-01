import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux"
const slice = createSlice({
    initialState: {
        data: {}
    },
    name: 'rerender',
    reducers: {
        update: (state, action) => {
            state.data = action.payload
        }
    }
})
const store = configureStore({
    reducer: {
        [slice.name]: slice.reducer
    }
})

const useOneTimeHook = () => {
    console.log('one time')
}

const useTwoTimeHook = () => {
    const data = useSelector((state: any) => state.rerender.data)
    console.log('two time', data)
}

function Updater() {
    const dispatch = useDispatch()
    setTimeout(() => {
        dispatch(slice.actions.update({a: 'a'}))
    }, 500)
    return <></>
}

function CompOne() {
    console.log('CompOne')
    useOneTimeHook()
    return <div>comp one</div>
}

function CompTwo() {
    console.log('CompTwo')
    useOneTimeHook()
    useTwoTimeHook()
    return <div>comp two</div>
}

function App() {

  return <Provider store={store}>
      <Updater />
      <CompOne />
      <CompTwo />
  </Provider>
}

export default App
