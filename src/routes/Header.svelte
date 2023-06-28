<script>
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    let searchTerm = '';
    $: path = $page.url.pathname;

    $: if (/^\/search\/\S+\s*\d+$/.test(path)) {
        searchTerm = path.replace('/search/', '').split('/')[0].replaceAll('%20', ' ');
    }
</script>

<header>
    <nav>
        <ul>
            <li class:active={path === '/'}>
                <a href="/">Home</a>
            </li>
            <li id="search-bar">
                <form method="POST" action="/" class="container" use:enhance>
                    <input
                        type="text"
                        name="term"
                        placeholder="Search or 6-digit code"
                        bind:value={searchTerm}
                        required
                    />
                    <button id="search-button">🔍</button>
                </form>
            </li>
        </ul>
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgba(5, 5, 5, 0.7);
        width: 100%;
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        display: flex;
        list-style: none;
        background: var(--background);
        background-size: contain;
        width: 100%;
    }

    li {
        position: relative;
        height: 100%;
    }

    .active {
        border-top: 1px solid var(--color-theme-1);
        border-bottom: 1px solid var(--color-theme-1);
    }

    .active a {
        color: var(--color-theme-1);
    }

    #search-bar {
        position: absolute;
        right: 0;
        width: 50%;
    }

    #search-bar input {
        width: 100%;
        height: 90%;
        text-align: center;
        background: rgba(5, 5, 5, 0.7);
        color: white;
        border-radius: 0;
        border: 1px solid rgba(255, 0, 0, .6);
        transition: .5s all;
    }

    #search-bar input:focus {
        border: 1px solid rgb(255, 0, 0);
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 1rem;
        color: var(--color-text);
        border: 1px solid transparent;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: 0.2s linear;
    }

    a:hover {
        color: var(--color-theme-1);
        border: 1px solid var(--color-theme-1);
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        flex-direction: row;
    }

    button {
        padding: 0.8rem 1rem;
        background-color: transparent;
        transition: 0.3s;
    }

    #search-button {
        border: 1px solid green;
        color: white;
        padding: 0.65rem;
    }

    @media (min-width: 768px) {
        #search-button:hover {
            background-color: green;
            color: black;
        }
    }

    @media (max-width: 768px) {
        #search-button:active {
            background-color: green;
            color: black;
        }

        #search-bar {
            width: 80%;
        }
    }
</style>
