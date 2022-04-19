<script>
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import { baseURL } from "../store/globalStore.js";
    import { isLoggedIn } from "../store/userStore.js";
    import { notifications } from "../toastr/notifications";

    let isLogin, isRegister = false;
    function loginPopUp() {
        isLogin = true;
    }

    function registerPopUp() {
        isRegister = true;
    }

    function logout(){
        console.log("attempting logout");
        fetch($baseURL + "/users/logout", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                notifications.success("👏 Logout", 5000);
                $isLoggedIn = false;
            } else {
                notifications.warning("⚠ Incorrect credentials ⚠", 5000);
            }
        });
    }

    function close() {
        isLogin = false;
        isRegister = false;
    }
</script>

<h1>HEADER</h1>
<nav>
    NAV BAR
    {#if $isLoggedIn}
        <button on:click={logout}>Logout</button>
    {:else}
        <button on:click={loginPopUp}>login</button>
        <button on:click={registerPopUp}>Register</button>
    {/if}

    {#if isLogin}
        <Login on:closeLogin={close} />
    {/if}

    {#if isRegister}
        <Register on:closeRegister={close} />
    {/if}
</nav>

<style>
</style>
