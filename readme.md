# Inlämningsuppgift – Backend med MongoDB

## Motivering av val av databas

Jag har valt **MongoDB** som databas eftersom den är dokumentorienterad och passar bra för applikationer där datamodellen kan förändras över tid. MongoDB är enkel att komma igång med, har bra stöd för Node.js via Mongoose och gör det lätt att lagra och hämta data. Detta passar min applikation där användare och uppgifter (tasks) kan ha olika fält och relationer.

## Redogörelse för tekniker och NPM-paket

- **Node.js**: Kör själva servern och möjliggör JavaScript/TypeScript på serversidan.
- **Express**: Webbramverk för att skapa API:er och hantera HTTP-förfrågningar.
- **TypeScript**: Ger typkontroll och bättre struktur i koden.
- **Mongoose**: ODM (Object Data Modeling) för att kommunicera med MongoDB på ett enkelt och typat sätt.
- **dotenv**: Laddar miljövariabler från `.env`-filen, t.ex. databas-URL.
- **nodemon**: Utvecklingsverktyg som automatiskt startar om servern vid kodändringar.
- **bcrypt**: Används för att hasha lösenord innan de sparas i databasen.

## Översiktlig beskrivning av applikationen

Applikationen är ett backend-API där användare kan registrera sig och skapa, läsa, uppdatera samt ta bort uppgifter (tasks). All data lagras i en MongoDB-databas och API:et är byggt med Express och TypeScript för tydlig struktur och säkerhet.