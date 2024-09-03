# microblog-fe

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

- [x] create react jwt user login context
- [x] header navigation  (user login context)
  - [x] USerNavigationUnit
    - [ ] register (NavigationUnits)
    - [ ] login (NavigationUnits)
      - LoggedIn or NotLoggedIn
  - [x] BlogPostNavigationUnit
    - [ ] show recent posts
- [ ] create home page
- [ ] create user profile page
- [ ] create list posts page
  - [ ] simple table/grid component
- [ ] create post page
  - [ ] https://remarkjs.github.io/react-markdown/
  - [ ] view mode
  - [ ] edit mode
- [ ] Static Build Path

## Getting Started


First, run the development server:

```bash
yarn install

yarn dev:next
yarn storybook
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
