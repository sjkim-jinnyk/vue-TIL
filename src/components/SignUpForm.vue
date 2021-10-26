<template>
	<form @submit.prevent="SignUp">
		<div class="newId-content">
			<label for="id">
				ID
				<input
					type="text"
					id="id"
					v-model="id"
					placeholder="이메일 형식의 아이디"
					autocomplete="off"
				/>
			</label>
			<p v-if="!isIdValid" class="warning">
				아이디는 이메일 형식으로 입력하세요.
			</p>
		</div>
		<div class="newPwd-content">
			<label for="password">
				Password
				<input
					type="text"
					id="password"
					v-model="pwd"
					placeholder="최소 8자, 최소 하나의 문자 및 숫자"
					autocomplete="off"
				/>
			</label>
			<p v-if="!isPWDValid" class="warning">
				비밀번호는 최소 8자, 최소 하나의 문자 및 숫자로 작성하세요.
			</p>
		</div>
		<div class="newName-content">
			<label for="name">
				Name
				<input
					type="text"
					id="name"
					v-model="name"
					placeholder="이름"
					autocomplete="off"
				/>
			</label>
		</div>
		<p v-if="!isIdValid || !isPWDValid || !name" class="warning">
			모든 필드를 다 채워주세요
		</p>
		<button
			:disabled="!isIdValid || !isPWDValid || !name"
			type="submit"
			class="btn"
		>
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
			if (!this.id) return true;
			return validateEmail(this.id);
		},
		isPWDValid() {
			if (!this.pwd) return true;
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

<style scoped>
.newId-content,
.newPwd-content,
.newName-content {
	margin-bottom: 10px;
}
</style>
