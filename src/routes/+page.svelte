<script>
    import { onMount } from 'svelte'
    import { authenticated } from '../stores/auth'

    let users = ''
    let auth = false
    authenticated.subscribe(value => { auth = value })

    onMount(async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            if (res.ok) {
                users = await res.json()
                console.log(users)
                authenticated.set(true)
            }
        } catch (error) {
            console.log(error)
            authenticated.set(false)
        }
    })

    const on_logout = async () => {
        const res = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (res.ok) {
            const data = await res.json()
            console.log(data)
            authenticated.set(false)
            window.location.href = '/logout'
        }
    }
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Home</a>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
            {#if $authenticated}
                <li class="nav-item">
                    <a class="nav-link" href="/about">About</a>
                </li>
                <li class="nav-item">
                    <a on:click={on_logout} class="nav-link" href="/">Logout</a>
                </li>
            {:else}
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>
            {/if}
        </ul>
      </div>
    </div>
  </nav>

  {#if users && Array.isArray(users) && users.length > 0}
    <h1>Users list</h1>
    <ul>
        {#each users as user}
            {#if typeof user === 'object' && 'name' in user && 'email' in user}
                <li>{user.name}: {user.email}</li>
            {/if}
        {/each}
    </ul>
  {/if}