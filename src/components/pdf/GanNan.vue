<template>
	<div style="height:100%">
<!--		<embed src="/src/assets/year.pdf" width="100%" height="100%"/>-->
		<embed :src="diBiaoShuiYuanUrl" width="100%" height="100%"/>
	</div>
</template>

<script>
import diBiaoShuiYuanUrl from '../../assets/year.pdf'
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
export default defineComponent({
	setup() {
		return {
			diBiaoShuiYuanUrl
		};
	},
});
</script>

<style scoped>

</style>
