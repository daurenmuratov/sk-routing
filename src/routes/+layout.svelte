<script>
    import { onMount } from 'svelte';
    import { authenticated, loadAuthStatus, saveAuthStatus } from '../stores/auth';

    let currentUsername = '';

    // Load authentication status from localStorage when component mounts
    onMount(() => {
        loadAuthStatus();
    });

    const on_logout = async () => {
        const res = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            saveAuthStatus(false);
            window.location.href = '/logout';
        }
    };
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Главная</a>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
            {#if $authenticated}
                <li class="nav-item">
                    <a class="nav-link" href="/account">Счета</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/monitoring">Мониторинг</a>
                </li>
            {:else}
                <li class="nav-item">
                    <a class="nav-link" href="/login">Вход</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Регистрация</a>
                </li>
            {/if}
        </ul>
        {#if $authenticated}
            <ul class="navbar-nav pull-right">
                <li class="nav-item">
                    <a class="nav-link" href="/profile">{currentUsername}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" on:click={on_logout}>Выход</a>
                </li>
            </ul>
        {/if}
      </div>
    </div>
  </nav>


<main>
    <!-- Content for each page will be injected here -->
    <slot></slot>
</main>

<style>
    main {
        padding: 20px;
    }
    .navbar-nav .nav-item {
        padding: 0 5px;
    }
    .navbar {
        max-height: 40px; /* Set your desired maximum height here */
        overflow: hidden; /* Ensure content doesn't overflow the navbar */
    }
    .navbar-brand, .navbar-nav .nav-link {
        line-height: 40px; /* Adjust line height to match the navbar height */
        height: 40px; /* Ensure the brand and nav links are the same height */
        padding-top: 0;
        padding-bottom: 0;
    }
    .navbar-nav .nav-item {
        padding-top: 0;
        padding-bottom: 0;
    }
    .navbar-brand {
        font-size: 1.1rem; /* Set your desired font size for the brand */
    }
    .navbar-nav .nav-link {
        font-size: 0.9rem; /* Set your desired font size for the nav links */
    }
</style>