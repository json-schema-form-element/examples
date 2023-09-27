<script setup lang="ts">
import { reactive } from 'vue';

// -----------------------------------------------------------------------------

import '@jsfe/core';
import type { FromSchema, JSONSchema7, Jsf, UiSchema } from '@jsfe/core';

const mySchema = {
	type: 'object',
	properties: {
		foo: {
			type: 'string',
		},
		bar: {
			type: 'boolean',
		},
	},
} as const satisfies JSONSchema7;
type MyData = FromSchema<typeof mySchema>;

const uiSchema: UiSchema = {
	bar: {
		'ui:widget': 'switch',
	},
};

// -----------------------------------------------------------------------------

const handleDataChange: Jsf['onDataChange'] = (newData: MyData) => {
	console.log({ 'Data from Vue': newData });

	dataInVue.value = newData;
};

const handleFormSubmit: Jsf['onFormSubmit'] = (newData: MyData, valid) => {
	console.log({ 'Submitted!': newData, valid });
};

let dataInVue = reactive<MyData>({
	value: {
		foo: 'hello',
	},
});
</script>

<template>
	<article id="vue">
		<json-schema-form
			.schema="mySchema"
			.data="dataInVue.value"
			.onDataChange="handleDataChange"
			.onFormSubmit="handleFormSubmit"
			.uiSchema="uiSchema"
		></json-schema-form>

		<pre>{{ JSON.stringify(dataInVue, null, 2) }}</pre>
	</article>
</template>
