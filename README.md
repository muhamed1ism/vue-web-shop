# 🛠️ Stolarija Barbarić - Web Shop za Drvni Namještaj

Stolarija Barbarić je web aplikacija za prodaju drvnog namještaja, izrađena koristeći moderne tehnologije poput MySQL-a, Express.js-a, Prisma ORM-a te Vue.js-a s Vuetifyjem za frontend. Aplikacija nudi kontrolu pristupa temeljenu na ulogama (korisnik, admin) i podržava upravljanje narudžbama za korisnike i administratore.

## 🚀 Pokretanje aplikacije

### 🔐 .env Datoteka

Primjer `.env` datoteke koju trebate postaviti u backend direktorij:

```
PORT=4000
DATABASE_URL="mysql://root:lozinka@localhost:3306/mydb"
JWT_SECRET="tajni_kljuc"
IMGBB_KEY="imgbb_api_kljuc"
```

### 📜 Pokretanje

1. **Popunite `.env` datoteku** s potrebnim varijablama okruženja.
2. **Instalirajte potrebne module** za backend i frontend pomoću `npm install`.
3. **Pokrenite MySQL bazu podataka** s Docker-om.
4. **Migrirajte baze podataka** (samo prvi put) koristeći Prisma.
5. **Pokrenite backend i frontend servere** koristeći `npm run dev`.

### ⚙️ Backend server:

1. U backend direktoriju instalirajte potrebne module:
   ```bash
   cd backend
   npm install
   ```

2. Pokrenite MySQL bazu podataka putem Docker-a:
   ```bash
   docker-compose up --build
   ```
   
   Za svako sljedeće pokretanje koristite:
   ```bash
   docker-compose up
   ```

3. **Migriranje Prisma modela** (izvršava se samo prvi put kada je baza podataka prazna):
   ```bash
   npx prisma migrate dev
   ```

4. Pokrenite backend server:
   ```bash
   npm run dev
   ```

### 🎨 Frontend server:

1. Uđite u frontend direktorij i instalirajte module:
   ```bash
   cd frontend
   npm install
   ```

2. Pokrenite frontend server:
   ```bash
   npm run dev
   ```

## ✨ Značajke

- **Gost korisnici**: Mogu pregledavati proizvode i dodavati ih u košaricu. Međutim, za dovršetak kupnje potrebno je prijaviti se.
- **Autentificirani korisnici**: Mogu upravljati košaricom, izvršiti narudžbu i pregledati povijest narudžbi.
- **Administratori**: Mogu upravljati proizvodima (dodavati, uređivati, brisati) te pregledavati i obrađivati sve narudžbe. Narudžbe mogu biti prihvaćene ili odbijene.
- **Autentifikacija temeljena na ulogama**: Podrška za različite uloge korisnika (korisnik, admin) korištenjem JWT tokena.

## 🧰 Tehnologije

### Backend:
- **Node.js** i **Express.js**: Backend okvir za razvoj REST API-ja.
- **MySQL**: Relacijska baza podataka, pokrenuta putem **Docker-compose**.
- **Prisma ORM**: Upravljanje bazom podataka i migracijama.
- **JWT (jsonwebtoken)**: Za autentifikaciju i autorizaciju temeljenu na tokenima.
- **Bcrypt**: Hashiranje lozinki korisnika.
- **Multer i Axios**: Za upload slika na **ImgBB**.
- **Cors**: Rješavanje problema s CORS-om u frontend-backend komunikaciji.
- **Dotenv**: Učitavanje varijabli okruženja iz `.env` datoteke.
- **Nodemon**: Automatsko pokretanje servera tijekom razvoja.

### Frontend:
- **Vue 3** i **Vuetify 3**: Napredni UI framework za izradu responzivnog korisničkog sučelja.
- **Vite**: Build alat za brže kompajliranje Vue aplikacija.
- **Pinia**: Upravljanje stanjem aplikacije.
- **VueUse**: Korištenje `useLocalStorage` za spremanje tokena, uloge korisnika i autentifikacijskih podataka.

## 🗂️ Modeli

Aplikacija koristi sljedeće modele:

- **User**: Korisnički podaci (ime, email, uloga, lozinka).
- **Product**: Informacije o proizvodima (naziv, opis, cijena, zaliha, URL slike).
- **Order**: Narudžbe korisnika, povezane s korisnikom i statusom narudžbe.
- **OrderItem**: Stavke narudžbi, sadrže informacije o proizvodima unutar pojedine narudžbe.
- **RevokedToken**: Evidencija poništenih JWT tokena.
- **Role (enum)**: Uloge korisnika (USER, ADMIN).
- **OrderStatus (enum)**: Statusi narudžbi (PENDING, COMPLETED, CANCELLED).

## 🛒 Funkcionalnosti aplikacije

- Korisnici mogu pregledavati proizvode, dodavati ih u košaricu te naručivati.
- Admin korisnici mogu upravljati zalihama proizvoda, dodavati nove artikle te upravljati narudžbama.
- Aplikacija je responzivna i prilagođena svim veličinama ekrana.
- Omogućena je promjena teme između svijetle i tamne.
