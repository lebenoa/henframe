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
> ![image](https://user-images.githubusercontent.com/76484203/228002396-e06f3a84-dce4-40ec-b4b9-fdf458e133bd.png)

Mobile
> ![localhost_5173_view_433390 (2)](https://user-images.githubusercontent.com/76484203/228002564-97a6a83b-a13c-4a0c-ba7b-a196be9bb49b.png)

---

# Why / What's this for?

I know there are A LOT of [`nhentai`](https://nhentai.net) clone out there but man.. there's none to my taste.  
Like for example: [hifumin which use the same API](https://hifumin.app) is... just not to my taste.  
And what's more is that search is **KIND OF** harder to use compare to the [`nhentai`](https://nhentai.net) itself

That's mainly why I have done this
- English **ONLY** by default; Might implement something to disable this AS AN OPTION in the future.
- Search by tag(or at least I think so), seperated by comma (`,`); Like how you would prompt SD Anime Model.
    > `milf, full color` will search for `milf`, `full color` and `english`

# Get it up and running

## Requirement

- `node` - built with `v19.7.0`
- `npm` - built with `9.6.2`

---

1. Clone this repository. Extract it to somewhere
1. Navigate to root folder (where `package.json` located)
1. run `npm i`
1. run `npm run dev` to run in dev mode. Check out [SvelteKit guide to deploy to production](https://kit.svelte.dev/docs/adapters).

# Issues

- image does not load correctly on subsequent browsing on iOS device (test on [BrowserStack](https://www.browserstack.com) iPhone 13 & my iPhone 11)  
    meaning even if you change the browser it's still not work and  
    **IT DOES WORK IF RELOAD THE PAGE** which confused me the most
