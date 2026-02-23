# Virtualizace a Docker

[Zpět na README.md](../README.md)

Ve vývoji často narazíte na problém: *"Ale u mě to funguje!"*. Docker tento problém řeší. Umožňuje zabalit vaši aplikaci i s celým prostředím (operační systém, knihovny, nastavení) do jedné krabice, která funguje všude stejně.

## 1. Kontejnery vs. Virtuální počítače

- **Virtuální počítač (VM):** Kompletní simulace celého počítače včetně operačního systému (Windows, Linux). Je to těžké, pomalé a zabírá to gigabajty paměti.
- **Kontejner (Docker):** Sdílí jádro systému hostitele, ale izoluje aplikaci. Je to lehké, startuje to okamžitě a zabírá to jen nezbytné minimum.

## 2. Klíčové pojmy Dockeru

Představte si Docker jako lodní přepravu:

- **Dockerfile:** Recept (kuchařka). Textový soubor, kde je napsáno, jak se má kontejner postavit (např. "Vezmi Linux, nainstaluj Node.js, zkopíruj tam můj kód").
- **Image (Obraz):** Upečený koláč podle receptu. Je to soubor na disku, který nelze měnit.
- **Container (Kontejner):** Běžící instance obrazu. Je to ten "živý" proces. Z jednoho Image můžete spustit 10 stejných Kontejnerů.

## 3. Základní příkazy

1.  `docker build -t moje-apka .` – Postaví Image podle Dockerfile v aktuální složce.
2.  `docker run -p 3000:80 moje-apka` – Spustí kontejner.
    - `-p 3000:80`: Kouzlo portů. Říká: "Vezmi port 80 uvnitř kontejneru a připoj ho na port 3000 mého počítače". Aplikaci pak uvidíte na `localhost:3000`.
3.  `docker ps` – Vypíše seznam běžících kontejnerů.
4.  `docker stop [ID]` – Zastaví kontejner.

## 4. Docker Compose

Málokdy spouštíme jen jednu věc. Většinou potřebujeme Aplikaci + Databázi.
- **`docker-compose.yml`**: Soubor, kde definujeme více služeb najednou.
- **`docker-compose up`**: Příkaz, který všechno spustí a propojí.

<br>
<br>
<br>

# Cvičení: Dockerizace

## Část 1: Porozumění pojmům

Přiřaďte pojem k definici:

1.  Běžící proces aplikace. (`__________`)
2.  Recept, jak prostředí vytvořit. (`__________`)
3.  Statická šablona, ze které se spouští instance. (`__________`)

*Možnosti: Image, Dockerfile, Container*

## Část 2: Dockerfile

Máte jednoduchou HTML stránku a chcete ji spustit v kontejneru pomocí serveru Nginx.
Doplňte chybějící příkazy do `Dockerfile`:

```dockerfile
# 1. Použijeme existující image Nginx jako základ
__________ nginx:alpine

# 2. Zkopírujeme náš index.html do složky v kontejneru
__________ index.html /usr/share/nginx/html/index.html
```

## Část 3: Porty

Spustili jste kontejner příkazem:
`docker run -p 8080:80 muj-web`

Webserver uvnitř kontejneru běží na portu **80**.
Na jaké adrese otevřete web ve svém prohlížeči?

A) `http://localhost:80`
B) `http://localhost:8080`
C) `http://localhost:8000`

Odpověď: `__________`

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Pojmy

1.  **Container** (Běžící proces)
2.  **Dockerfile** (Recept)
3.  **Image** (Šablona)

### Část 2: Dockerfile

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
```

### Část 3: Porty

**B** je správně (`http://localhost:8080`).
První číslo (`8080`) je port vašeho počítače (Host), druhé číslo (`80`) je port uvnitř kontejneru.
