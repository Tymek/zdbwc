# zdbwc

``` bash
pnpm install
docker-compose up -d
pnpm run seed
```

- Frontend: [localhost:3000](http://localhost:3000)
- Backend: [localhost:8080/console](http://localhost:8080/console), default password: `0`
- Default user: `test:test`
- ESlint fix: `pnpm run test:eslint -- --fix`
- Hasura migration-enabled console: `./node_modules/.bin/hasura console
