<template>
	<div>
		<tr>
			<td>{{ setting }}</td>
			<td>
				<input type="range" min="0" :max="max" step="0.02" :data-bind="dataBind" >
			</td>
		</tr>
	</div>
</template>

<script setup>
	import {defineEmits, defineProps} from "vue";
	defineProps(['setting','max','dataBind'])
</script>

<style scoped>

</style>