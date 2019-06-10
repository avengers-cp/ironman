# Project Ironman - Gym Buddy

## Setup instructions

Run `npm run setup`.

Run `firebase login`. The login with your firebase app account.

Create a `firebase-production.ts` and `firebase-staging.ts` inside the `src/config` folder. These files will hold your firebase
credentials. See `src/config/firebase-example.ts` for an example firebase config file.

## Running dev server during development

Run `npm run dev`. This will start the development server. Your web browser should automatically open up to `http://localhost:8100`.

## Code scaffolding

Run `ionic generate page page-name` to generate a new component. You can also use `ionic generate component|directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ionic build` to build the project. The build artifacts will be stored in the `www/` directory. Use the `--prod` flag for a production build.

## Deploying

Run `npm run deploy:staging` to deploy staging app to staging server.

Run `npm run deploy:prod` to deploy prod app to prod server.

Run `npm run deploy:all` to deploy both above configurations.

## Other

See `package.json` for more scripts.
