//configurar redux
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import  thunk from 'redux-thunk'
import userReducer from './reducers/user' //o que é importado como default pode mudar o nome
import postsReducer from './reducers/posts'
import messageReducer from './reducers/message'
const reducers = combineReducers({
    user: userReducer,
	posts: postsReducer,
	message: messageReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
