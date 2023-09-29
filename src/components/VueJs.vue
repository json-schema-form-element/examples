<script setup lang="ts">
// NOTE: Type checking / inference is not working declaratively,
// there might be a way though,
// like extending Vue Components namespace with HTMLTagNameMap.

import { reactive } from 'vue';

import '@jsfe/core';
import type { FromSchema, JSONSchema7, Jsf, UiSchema } from '@jsfe/core';

// -----------------------------------------------------------------------------

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

function assertValidData(data: unknown): data is MyData {
	// Use your AJV or other schema checker here, if you need thorough validation
	// ...
	return true;
}

const uiSchema: UiSchema = {
	bar: {
		'ui:widget': 'switch',
	},
};

let dataInVue = reactive<MyData>({
	value: {
		foo: 'hello',
	},
});

const handleDataChange: Jsf['onDataChange'] = (newData) => {
	console.log({ 'Data from Vue': newData });

	if (assertValidData(newData)) dataInVue.value = newData;
	else console.error('Invalid data!');
};

const handleFormSubmit: Jsf['onFormSubmit'] = (newData, valid) => {
	console.log({ 'Submitted from Vue!': newData, valid });

	if (assertValidData(newData)) {
		// Do stuff...
	}
};
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
