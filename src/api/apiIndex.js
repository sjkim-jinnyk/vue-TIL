import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000/',
});
function SignUpSubmit(UserData) {
	return instance.post('signup', UserData);
	//return axios.post(url, UserData);
}

function LoginSubmit(UserData) {
	return instance.post('login', UserData);
}
export { SignUpSubmit, LoginSubmit };
