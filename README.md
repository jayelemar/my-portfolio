This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Contact form verification

The contact form sends a six-digit verification code before forwarding a message to Discord. Challenges expire after 15 minutes and are stored temporarily in Upstash Redis.

1. Create an Upstash Redis database and copy its REST URL and REST token.
2. In Resend, add and verify the sending domain `mail.elemar.site`, then create an API key.
3. Create a Discord webhook for the destination channel.
4. Copy `.env.example` to `.env.local` and fill in all five values. Generate `CONTACT_CODE_SECRET` with `openssl rand -hex 32`.
5. Add the same environment variables to the Vercel project for every deployed environment that uses the form.
6. In the Vercel Firewall dashboard, add an IP-based rate-limit rule for `POST /api/contact/request`: allow at most 3 requests per 10 minutes.

The application also applies Redis-backed limits of 3 verification emails per address per hour, 5 per address per day, and 50 total per day. Each challenge permits five code attempts and three verification emails in total.

Run the verification tests with:

```bash
npm test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
