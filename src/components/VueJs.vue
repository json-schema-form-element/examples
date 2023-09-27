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
type myData = FromSchema<typeof mySchema>;

const myData = {
	foo: 'hello',
} satisfies myData;

const uiSchema: UiSchema = {
	bar: {
		'ui:widget': 'switch',
	},
};

// -----------------------------------------------------------------------------

const handleDataChange: Jsf['onDataChange'] = (newData: myData) => {
	console.log({ 'Data from Vue': newData });

	dataInVue.data = newData;
};

const handleFormSubmit: Jsf['onFormSubmit'] = (newData: myData, valid) => {
	console.log({ 'Submitted!': newData, valid });
};

let dataInVue = reactive({ data: {} });
</script>

<template>
	<article id="vue">
		<json-schema-form
			.schema="mySchema"
			.data="myData"
			.onDataChange="handleDataChange"
			.onFormSubmit="handleFormSubmit"
			.uiSchema="uiSchema"
		></json-schema-form>

		<pre>{{ JSON.stringify(dataInVue, null, 2) }}</pre>
	</article>
</template>
