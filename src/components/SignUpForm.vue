<template>
	<form @submit.prevent="SignUp">
		<div>
			<label for="id">id : </label>
			<input type="text" id="id" v-model="id" />
		</div>
		<div>
			<label for="password">password : </label>
			<input type="text" id="password" v-model="pwd" />
		</div>
		<div>
			<label for="name">name : </label>
			<input type="text" id="name" v-model="name" />
		</div>
		<button type="submit">회원가입</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { SignUpSubmit } from '../api/apiIndex';
export default {
	data() {
		return {
			id: '',
			pwd: '',
			name: '',
			logMessage: '',
		};
	},
	methods: {
		async SignUp() {
			try {
				const UserData = {
					username: this.id,
					password: this.pwd,
					nickname: this.name,
				};
				const response = await SignUpSubmit(UserData);
				this.logMessage = `${response.data.username}님 가입되었습니다.`;
			} catch (error) {
				this.logMessage = error.response.data;
			} finally {
				this.initForm();
			}
		},
		initForm() {
			this.id = '';
			this.pwd = '';
			this.name = '';
		},
	},
};
</script>

<style></style>
