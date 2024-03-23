<script>

    let email = '', password = ''

    const submit = async () => {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })

        if (res.ok) {
            const data = await res.json()
            console.log(data)

            window.location.href = '/'
        }
    }
</script>

<main class="form-signin w-100 m-auto">
    <form on:submit|preventDefault={submit}>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input bind:value={email} type="email" class="form-control" placeholder="name@example.com" required>
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input bind:value={password} type="password" class="form-control" placeholder="Password" required>
        <label for="floatingPassword">Password</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </form>
  </main>