<script>
	export let text = 'Loading';
	export let kind = 'warning';
	export let icon = false;
	export let icon_name = 'fas fa-spinner';
</script>

<style>
</style>


<div class="alert alert-{kind} text-center">
	{#if icon}
		<i class="{icon_name}"></i> {text}
	{:else}
		{text}
	{/if}
</div>
