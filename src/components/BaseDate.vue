<template>
	<time :datetime="props.date">{{ dateFormatted }}</time>
</template>

<script setup lang="ts">
const props = defineProps({
	// Date in ISO format
	date: {
		type: String,
		required: true,
	},
})

const options: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}
const date = new Date(props.date)
const dateFormatted = date.toLocaleString(window.navigator.language, options)
</script>
