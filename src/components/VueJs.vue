<script setup lang="ts">
import { reactive } from 'vue';

import '@jsfe/core';

let dataInVue = reactive({ data: {} });
</script>

<template>
	<article id="vue">
		<json-schema-form
			.schema="{
				type: 'object',
				properties: {
					foo: {
						type: 'string',
					},
					bar: {
						type: 'boolean',
					},
				},
			}"
			.data="{
				foo: 'hello',
			}"
			.onDataChange="
				(data) => {
					console.log(data);

					dataInVue.data = data;
				}
			"
			.onSubmit="
				(data) => {
					console.log(data);
				}
			"
		></json-schema-form>

		<pre>{{ JSON.stringify(dataInVue, null, 2) }}</pre>
	</article>
</template>
