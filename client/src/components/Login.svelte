<script>
    import { createEventDispatcher } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { notifications } from "../toastr/notifications";
    import { isLoggedIn } from "../store/userStore.js";
    import { baseURL } from "../store/globalStore.js";

    const dispatch = createEventDispatcher();

    let mail, password;
    async function login() {
        const response = await fetch($baseURL + "/users/login", {
            method: "POST",
            body: JSON.stringify({ mail, password }),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                notifications.success("👏 Login", 5000);
                $isLoggedIn = true;
                close();
            } else {
                notifications.warning("⚠ Incorrect credentials ⚠", 5000);
            }
        });
    }

    function close() {
        dispatch("closeLogin");
    }
</script>

<div class="background" on:click={close} transition:fade />
<div class="login-box" transition:fly={{ y: -500 }}>
    <h3>Login</h3>
    <form on:submit|preventDefault={login}>
        <label for="mail"
            >Mail:
            <input name="mail" bind:value={mail} required type="text" />
        </label>
        <label for="password"
            >Password:
            <input
                name="password"
                bind:value={password}
                required
                type="password"
            />
        </label>
        <button type="submit">Login</button>
        <button on:click={close}>Cancel</button>
    </form>
</div>

<style>
    .background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
    }
    .login-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 200px;
        width: 400px;
        color: white;
        background-color: grey;
        z-index: 3;
        padding: auto;
        border: solid 2px black;
        border-radius: 5px;
    }
    .login-box > h3 {
        margin: auto;
    }
</style>
