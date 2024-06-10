<script lang="ts">
    import { saveAuthStatus } from '../../stores/auth';

    let username: string = '';
    let password: string = '';

    const login = async (): Promise<void> => {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (res.ok) {
            const data = await res.json()
            console.log(data)
            saveAuthStatus(true)
            window.location.href = '/'
        } else {
          alert('Неверный логин или пароль')
          saveAuthStatus(false)
        }
    }
</script>

<main class="form-signin w-100 m-auto">
    <form on:submit|preventDefault={login}>
      <h1 class="h3 mb-3 fw-normal">Войдите</h1>

      <div class="form-floating">
        <input bind:value={username} type="text" class="form-control" placeholder="Логин" required>
        <label for="floatingInput">Логин</label>
      </div>
      <div class="form-floating">
        <input bind:value={password} type="password" class="form-control" placeholder="Пароль" required>
        <label for="floatingPassword">Пароль</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Вход</button>
    </form>
  </main>