<script>
    import { createEventDispatcher } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { notifications } from "../toastr/notifications";
    import { baseURL } from "../store/globalStore.js";

    const dispatch = createEventDispatcher();

    let mail, password, firstName;
    async function register() {
        const response = await fetch($baseURL + "/users/register", {
            method: "POST",
            body: JSON.stringify({ mail, password, firstName }),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                notifications.success("🙋‍♂️ User created", 5000);
                close();
            } else if(response.status === 409) {
                notifications.warning("⚠ Username already in use ⚠", 5000);
            }
            else{
                notifications.warning("🙈🛠 Something went wrong", 5000);
            }
        });
    }

    function close() {
        dispatch("closeRegister");
    }
</script>

<div class="background" on:click={close} transition:fade />
<div class="login-box" transition:fly={{ y: -500 }}>
    <h3>Register</h3>
    <form on:submit|preventDefault={register}>
        
        <label for="firstName"
            >First Name:
            <input
                name="firstName"
                bind:value={firstName}
                required
                type="text"
            />
        </label>

        <label for="mail"
            >Mail:
            <input 
                name="mail" 
                bind:value={mail} 
                required 
                type="text" 
            />
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

        <button type="submit">Register</button>
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
