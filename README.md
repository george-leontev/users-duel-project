## Duels project ⚔️


#### Instuctions for start:
- Install dependencies(both for ui and api folders): `npm install`

- Start docker compose: `docker compose -f 'docker-compose.yaml' up -d --build` in web-api directory

- Apply migrations: `npx prisma migrate dev`

- Make a initial data seed: `npm run prisma-init-seed`

- Start web-api: `npm run start:dev`

- Start web-ui: `npm run dev`

Default login data:
- Email: batman@gmail.com
- Password: 0987654321

Then you can enjoy the game on http://localhost:5173 :)

