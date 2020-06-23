# zdbwc

``` bash
pnpm install
docker-compose up -d
pnpm run migrate
pnpm run seed
```

- [localhost:3000](http://localhost:3000)
- [localhost:8080/console](http://localhost:8080/console), default password: `0`

Default seed user: `test:test`

ESlint fix: `pnpm run test:eslint -- --fix`