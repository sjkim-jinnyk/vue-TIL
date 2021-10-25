<template>
	<form @submit.prevent="LoginSubmit">
		<div>
			<label for="ID">ID : </label>
			<input type="text" id="ID" v-model="userID" />
		</div>
		<div>
			<label for="PWD">PWD : </label>
			<input type="text" id="PWD" v-model="userPWD" />
		</div>
		<button type="submit">로그인</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { LoginSubmit } from '../api/apiIndex';
export default {
	data() {
		return {
			userID: '',
			userPWD: '',
			logMessage: '',
		};
	},
	methods: {
		async LoginSubmit() {
			const UserData = {
				username: this.userID,
				password: this.userPWD,
			};
			const response = await LoginSubmit(UserData);
			this.logMessage = `${response.data.user.username}님 로그인 되었습니다`;
			this.init();
		},
		init() {
			this.userID = '';
			this.userPWD = '';
		},
	},
};
</script>

<style></style>
