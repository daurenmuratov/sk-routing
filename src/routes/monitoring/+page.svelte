<script lang="ts">
    import { onMount } from 'svelte';
    import { authenticated, loadAuthStatus } from '../../stores/auth';

    onMount(() => {
        // Load authentication status from localStorage on component mount
        loadAuthStatus();
        console.log('Monitoring page loaded');
    });
</script>

{#if $authenticated}
    <p>Monitoring</p>
{:else}
    <p>Вы не вошли в систему</p>
{/if}