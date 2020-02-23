import { USER_LOGGED_OUT, USER_LOGGED_IN, LOADING_USER, USER_LOADED } from "./actionsTypes";
import axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'APIKEY'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT,
    }
}

export const createUser = (user) => {
	return dispatch => {
		dispatch(loadingUser())
		axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`), {
			emai: user.email,
			password: user.password,
			returnSecureToken: true
		}
		.catch(err => console.log(err))
		.then(res => {
			if(res.data.localId) {
				axios.put(`/users/${res.data.localId}.json`, {
					name: user.name
				})
					.catch(err => console.log(err))
					.then(() => {
						dispatch(login(user))
					})
			}
		})
	}
}

export const loadingUser = () => {
	return {
		type: LOADING_USER
	}
}

export const userLoaded = () => {
	return {
		type: USER_LOADED
	}
}

export const login = user => {
	return dispatch => {
		dispatch(loadingUser())
		axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
			email: user.email,
			password: user.password,
			returnSecureToken: true
		})
			.catch(err => console.log(err))
			.then(res => {
				if(res.data.localId) {
					user.token = res.data.idToken
					axios.get(`/users/${res.data.localId}.json`)
						.catch(err => console.log(err))
						.then(res => {
							delete user.password
							user.name = res.data.name
							dispatch(userLogged(user))
							dispatch(userLoaded())
						})
				}
			})
	}
}
