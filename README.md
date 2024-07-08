# Henframe ([`nhentai`](https://nhentai.net) clone)

Or I would like to called "Chick(en) Frame" KEKW

---

Here's the serious explanation; well let's talk about the things I don't like about [`nhentai`](https://nhentai.net) first.

1. **Interactive page changing**:
    > While this save a lot of bandwidth/data usage. I'm **not** fond of it as a user.
2. **Ads**
    > I know there is a maintenance cost on everything that exists in this world.. or at least for the server that running the web apps.. but come on, you gotta let me scroll reading if you're doing this.

Luckily I found the [API for this](https://api.hifumin.app) [`(source)`](https://github.com/SaltyAom/seele) so I don't have to do it myself!

---

PC

> ![image](https://github.com/Meonako/henframe/assets/76484203/90bac617-7485-4301-ae12-a4f6d521570e)

Mobile

> ![image](https://github.com/Meonako/henframe/assets/76484203/8ca162de-5cf4-42d3-912f-8bb8c3a25d0f)

---

# Why / What's this for?

I know there are A LOT of [`nhentai`](https://nhentai.net) clone out there but man.. there's none to my taste.  
Like for example: [hifumin which use the same API](https://hifumin.app) is... just not to my taste.  
And what's more is that search is **KIND OF** harder to use compare to the [`nhentai`](https://nhentai.net) itself

That's mainly why I have done this

-   English **ONLY** by default; Might implement something to disable this _AS AN OPTION_ in the future.
-   Search by tag(or at least I think so), seperated by comma (`,`); Like how you would prompt SD Anime Model.
    > `milf, full color` will search for `milf`, `full color` and `english`
    >
    > **_TIPS_**: Search for tags with last character remove to get latest data.  
    > For example, instead of `schoolgirl uniform`, you should do `schoolgirl unifor`

# Get it up and running

## Requirement

-   `node` - built with `v20.3.1`
-   `pnpm` - built with `8.6.5`

---

1. Clone this repository. Extract it to somewhere
1. Navigate to root folder (where `package.json` located)
1. Open a terminal and run `pnpm i`
1. Run `pnpm dev` to run in dev mode. Check out [SvelteKit guide to deploy to production](https://kit.svelte.dev/docs/adapters).

# Issues

-   [ ❌ ] Data kinda buggy if page >= 41

    > This is the [API](https://api.hifumin.app) fault and not mine.
