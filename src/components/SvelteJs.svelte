<script lang="ts">
	// NOTE: We might use a more declarative approach by finding a good and
	// simple way to add type safety to Svelte DOM elements namespace

	import '@jsfe/shoelace';
	import type { FromSchema, JSONSchema7, Jsf } from '@jsfe/shoelace';

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

	let dataInSvelte: MyData = {
		foo: 'hello',
	};

	function formBinding(form: Jsf) {
		form.data = dataInSvelte;
		form.schema = /* Type-casted as JSONSchema7 */ mySchema;
		form.uiSchema = {
			/* Type-casted as UiSchema */
			bar: {
				'ui:widget': 'switch',
			},
		};
		form.dataChangeCallback = (newData) => {
			console.log({ 'Data from Svelte': newData });

			if (assertValidData(newData)) dataInSvelte = newData;
			else console.error('Invalid data!');
		};
		form.submitCallback = (newData, valid) => {
			console.log({ 'Submitted from Svelte!': newData, valid });

			if (assertValidData(newData)) {
				// Do stuff...
			}
		};
	}
</script>

<article id="svelte">
	<jsf-shoelace use:formBinding></jsf-shoelace>

	<pre>{JSON.stringify(dataInSvelte, null, 2)}</pre>
</article>
