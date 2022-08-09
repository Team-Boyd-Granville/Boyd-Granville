# Boyd-Granville

The development branch

## API

make sure java version matches with the one in api/pom.xml then:

```
cd api/
mvn clean install
```

And finally run it locally with:

```
mvn spring-boot:run
```

## Next.js App

In order to enable allow OAuth, you will need to create a .env.local
file in the root directory (Next/github-social-media).
Add the following fields:

```

GITHUB_ID=
GITHUB_SECRET=

NEXTAUTH_URL=http://localhost:3000

JWT_SECRET=

```

The first two values must be obtained by copying the clientID
and generating a new Client Secret in the OAuth settings of
the 'Social Media app' OAuth app in the Boyd Granville organisation's
settings on GitHub.com.

The JWT_SECRET field can be populated with a value generated
by the following website:
https://generate-secret.vercel.app/32
