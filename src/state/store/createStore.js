import { createStore as reduxCreateStore } from "redux"
import { basicReducer as rootReducer } from '../reducers/basicReducer'

const initialState = { message: 'Hello ThisIsCode!' }


const createStore = () => reduxCreateStore(rootReducer, initialState)

export default createStore