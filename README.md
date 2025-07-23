# tron-service

```bash
bun install
```

```bash
bun run migrate
```

## Running the app

```bash
# production
bun run start

# watch mode
npm run dev
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```


⚙️ Environment Configuration
The project uses environment variables to configure settings for different environments.

✅ .env.example provides all the required keys and values you need to set up your own .env file.

Depending on the environment you're working in, create one of the following files in the root of the project:

🧪 Development
Create a file named: .development.env

🚀 Production
Create a file named: .production.env