<template>
	<form @submit.prevent="LoginSubmit">
		<div class="id-content">
			<label for="ID">
				ID
				<input
					type="text"
					placeholder="아이디"
					id="ID"
					v-model="userID"
					autocomplete="off"
				/>
			</label>
			<p v-if="!isUserValid" class="warning">
				Please enter a valid email address
			</p>
		</div>

		<div class="pwd-content">
			<label for="PWD">
				Password
				<input
					type="text"
					placeholder="비밀번호"
					id="PWD"
					v-model="userPWD"
					autocomplete="off"
				/>
			</label>
		</div>
		<!-- <div class="rememberId">
			<label for="rememberId">
				<input type="checkbox" name="id" id="rememberId" />
				아이디 저장
			</label>
		</div> -->
		<button :disabled="!isUserValid || !userPWD" type="submit" class="btn">
			로그인
		</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { LoginSubmit } from '../api/apiIndex';
import { validateEmail } from '../utils/validation';

export default {
	data() {
		return {
			userID: '',
			userPWD: '',
			logMessage: '',
		};
	},
	computed: {
		isUserValid() {
			if (!this.userID) return true;
			return validateEmail(this.userID);
		},
	},
	methods: {
		async LoginSubmit() {
			try {
				const UserData = {
					username: this.userID,
					password: this.userPWD,
				};
				const response = await LoginSubmit(UserData);
				this.logMessage = `${response.data.user.username}님 로그인 되었습니다`;
			} catch (error) {
				this.logMessage = error.response.data;
			} finally {
				this.init();
			}
		},
		init() {
			this.userID = '';
			this.userPWD = '';
		},
	},
};
</script>

<style scoped>
.id-content,
.pwd-content {
	margin-bottom: 10px;
}
</style>
