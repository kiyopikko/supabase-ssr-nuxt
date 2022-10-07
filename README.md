# Nuxt + Supabase + Cloudflare Workers Demo

Demo SSR: https://urin.kiyopikko.workers.dev/kiyopikko

- Nuxt3 SSR
- Supabase
- Cloudflare Workers

## Setup

Make sure to install the dependencies

```bash
yarn install
```

## Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Needs to create `wrangler.toml` from `wrangler.example.toml` before deploying.

```bash
wrangler publish
```
