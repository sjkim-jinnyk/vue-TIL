<template>
	<form @submit.prevent="SignUp">
		<div>
			<label for="id">id : </label>
			<input type="text" id="id" v-model="id" />
			<p v-if="!isIdValid">아이디는 이메일 형식으로 입력하세요.</p>
		</div>
		<div>
			<label for="password">password : </label>
			<input type="text" id="password" v-model="pwd" />
			<p v-if="!isPWDValid">
				비밀번호는 최소 8자, 최소 하나의 문자 및 숫자로 작성하세요.
			</p>
		</div>
		<div>
			<label for="name">name : </label>
			<input type="text" id="name" v-model="name" />
		</div>
		<button :disabled="!isIdValid || !isPWDValid || !name" type="submit">
			회원가입
		</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { SignUpSubmit } from '../api/apiIndex';
import { validateEmail, validatePWD } from '../utils/validation';
export default {
	data() {
		return {
			id: '',
			pwd: '',
			name: '',
			logMessage: '',
			idValid: '',
		};
	},
	computed: {
		isIdValid() {
			return validateEmail(this.id);
		},
		isPWDValid() {
			return validatePWD(this.pwd);
		},
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
