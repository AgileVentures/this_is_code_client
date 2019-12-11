import { createStore as reduxCreateStore } from "redux"
import { fakeAuthReducer as rootReducer } from '../reducers/basicReducer'
import initialState from './initialState'


const createStore = () => reduxCreateStore(rootReducer, initialState)

export default createStore