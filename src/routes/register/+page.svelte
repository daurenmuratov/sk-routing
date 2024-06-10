<script lang="ts">
    import { authenticated } from "../../stores/auth";

    let username: string = '';
    let email: string = '';
    let password: string = '';

    let auth: boolean = false;
    authenticated.subscribe((value: boolean) => { auth = value });

    const submit = async (): Promise<void> => {
        const res: Response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (res.ok) {
            const data: any = await res.json();
            console.log(data);
            window.location.href = '/login';
        }
    }
</script>

{#if $authenticated }
  <p>Вы уже зарегистрированы</p>
{:else}
<main class="form-signin w-100 m-auto">
    <form on:submit|preventDefault={submit}>
      <h1 class="h3 mb-3 fw-normal">Регистрация</h1>

      <div class="form-floating">
        <input bind:value={username} class="form-control" placeholder="Имя пользователя" required>
        <label for="floatingInput">Имя пользователя</label>
      </div>
      <div class="form-floating">
        <input bind:value={email} type="email" class="form-control" placeholder="name@example.com" required>
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating">
        <input bind:value={password} type="password" class="form-control" placeholder="Пароль" required>
        <label for="floatingPassword">Пароль</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Регистрация</button>
    </form>
  </main>
{/if}