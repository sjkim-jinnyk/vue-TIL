<template>
	<header class="header">
		<p>MEMO</p>
		<div>
			<router-link to="/login">로그인</router-link> |
			<router-link to="/signup">회원가입</router-link>
		</div>
	</header>
</template>

<script>
export default {};
</script>

<style scoped>
@import '../css/common.css';
.header {
	display: flex;
	justify-content: space-between;
	margin: 10px 10px 20px;
}
</style>
