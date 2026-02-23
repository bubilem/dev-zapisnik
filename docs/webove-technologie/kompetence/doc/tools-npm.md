# Nástroje a ekosystém (Node.js & NPM)

[Zpět na README.md](../README.md)

Programování už dávno není o ručním stahování `script.js` z cizích webů. Moderní vývoj stojí na balíčcích a nástrojích, které automatizují nudnou práci. Vítejte ve světě Node.js.

## 1. Node.js a terminál

- **Node.js:** Umožňuje spouštět JavaScript mimo prohlížeč (na serveru nebo ve vašem počítači).
- **Terminál (Příkazová řádka):** Váš nejlepší kamarád. Místo klikání myší píšete příkazy.
    - `ls` (nebo `dir` na Windows): Vypíše soubory.
    - `cd nazev-slozky`: Otevře složku.
    - `cd ..`: Vrátí se o složku výš.

## 2. NPM (Node Package Manager)

Představte si to jako "App Store" pro programátory. Potřebujete knihovnu na grafy? Na animace? Na práci s časem? Vše je na NPM.

- **`packge.json`**: "Občanka" vašeho projektu. Soubor, kde je napsáno, jak se projekt jmenuje a jaké knihovny (závislosti) potřebuje.
- **`node_modules`**: Obří složka, kam NPM fyzicky stahuje stovky knihoven. **Nikdy** ji neupravujeme ručně a **nikdy** ji neposíláme na Git!

## 3. Základní workflow

Jak to vypadá v praxi, když si chcete do projektu přidat třeba knihovnu pro ohňostroje (`canvas-confetti`):

1. **Inicializace:** `npm init -y` (vytvoří `package.json`).
2. **Instalace:** `npm install canvas-confetti`.
3. **Použití:** V JavaScriptu pak knihovnu importujete (např. přes bundler jako Vite).

## 4. Lokální server (Vite)

Otevírat `index.html` v prohlížeči přes souborový systém (`file://`) je špatný zvyk (nefungují tam moduly ani API).
Používáme nástroje jako **Vite**:
1. Spustí lokální server (např. na `localhost:5173`).
2. Jakmile uložíte soubor, prohlížeč se **sám** bleskově obnoví (HMR - Hot Module Replacement).

<br>
<br>
<br>

# Cvičení: Svět příkazů

## Část 1: Terminál

Jsem ve složce `C:/Users/Ja/Dokumenty`. Chci jít do podsložky `Weby`.
Jaký příkaz napíšu do terminálu?

Odpověď: `__________`

## Část 2: NPM Matematika

Máte projekt, kde v `package.json` je napsáno:
```json
"dependencies": {
  "react": "^18.0.0"
}
```
Složka `node_modules` ale váží 150 MB. Jak je to možné, když React má jen pár kilobajtů?

A) Je to chyba v počítači.
B) Node modules obsahují i "závislosti závislostí" (strom závislostí). React potřebuje jiné knihovny, ty potřebují další a další...
C) NPM stahuje i videa z YouTube.

Odpověď: `__________`

## Část 3: Git a Node

Právě jste si stáhli cizí projekt z GitHubu. Složka `node_modules` tam ale chybí (protože je v `.gitignore`). Kód nefunguje.
Jaký příkaz musíte zadat, aby se podle `package.json` vše stáhlo a nainstalovalo?

Odpověď: `npm __________`

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Terminál

`cd Weby`

### Část 2: NPM Matematika

**B** je správně. Tomu se říká "Dependency Hell" nebo strom závislostí. Moderní webový vývoj je jako skládání lega z tisíců kostiček.

### Část 3: Git a Node

`npm install` (nebo zkráceně `npm i`)
*Tento příkaz přečte `package.json` a stáhne vše potřebné zpět.*
