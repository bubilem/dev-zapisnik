# Git a správa verzí

[Zpět na README.md](../README.md)

Verzovací systém je záchranná síť každého programátora. Umožňuje vracet se v čase, zálohovat práci a spolupracovat v týmu. Bez Gitu se v moderní praxi neobejdete.

## 1. Koncept repozitáře a commitů

Než začnete psát příkazy, musíte pochopit filozofii:

- **Repozitář (Repo):** Složka s vaším projektem, kterou Git sleduje.
- **Snapshot (Snímek):** Git neukládá jen rozdíly, ale fotí si stav celého projektu v určitém čase.
- **Commit:** Uložení snapshotu. Je to "checkpoint" ve hře. Když něco pokazíte, můžete se vrátit k poslednímu commitu.
- **Vzdálený repozitář (Remote):** Vaše záloha na serveru (nejčastěji GitHub nebo GitLab).

## 2. Základní příkazy (Daily Routine)

Tyto příkazy budete používat několikrát denně:

1.  `git init` – Změní obyčejnou složku na Git repozitář (děláte jen jednou na začátku).
2.  `git status` – **Nejdůležitější příkaz.** Řekne vám, co se změnilo, co je připraveno k uložení a kde jste.
3.  `git add .` – Řekne Gitu: "Tyto změny chci zahrnout do příštího uložení" (Stage).
4.  `git commit -m "Popis změny"` – Vytvoří checkpoint. Popis musí být smysluplný!
5.  `git push` – Odešle vaše lokální commity na vzdálený server (GitHub).

## 3. Ignorování souborů (.gitignore)

Ne všechno do repozitáře patří:

- **Co tam patří:** Zdrojový kód (HTML, CSS, JS), obrázky, konfigurace.
- **Co tam NEPATŘÍ:** Dočasné soubory, hesla (!), obrovské video soubory, složka `node_modules` (knihovny).
- **Řešení:** Vytvořte soubor `.gitignore` a napište do něj názvy souborů/složek, které má Git ignorovat.

## 4. Větvení (Branching) – Teorie

Zatímco pracujete na *Main* (hlavní verzi), můžete si vytvořit *Branch* (větev) pro experimenty. Pokud experiment vyjde, větev sloučíte (*Merge*) zpět. Pokud ne, větev zahodíte a hlavní verze zůstane čistá.

<br>
<br>
<br>

# Cvičení: Git v praxi

## Část 1: Teoretické porozumění

Doplňte správný příkaz k akci:

1.  Chci zjistit, které soubory jsem změnil: `__________`
2.  Chci připravit všechny změněné soubory k uložení: `__________`
3.  Chci vytvořit trvalý záznam změn s popisem "Oprava menu": `__________`
4.  Chci odeslat změny na GitHub: `__________`

## Část 2: Simulace katastrofy

Představte si situaci:
Pracujete na souboru `index.html`. Udělali jste funkční verzi a "commitnuli" ji.
Pak jste začali dělat velké úpravy, ale celé se to pokazilo. Kód je rozbitý. Ještě jste neudělali nový commit.

**Otázka:** Jaký příkaz použijete, abyste zahodili aktuální (neuložené) změny a vrátili soubor do stavu posledního commitu?
*(Tip: Hledejte příkaz `checkout` nebo `restore`)*

Odpověď: `__________`

## Část 3: .gitignore

Máte projekt, který obsahuje soubor `hesla.txt` a složku `temp`. Tyto věci nesmí být na GitHubu.
Napište obsah souboru `.gitignore`:

```text

```

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Příkazy

1.  `git status`
2.  `git add .` (nebo `git add -A`)
3.  `git commit -m "Oprava menu"`
4.  `git push`

### Část 2: Katastrofa

Příkaz: `git checkout .` (nebo v novějším Gitu `git restore .`)
*Tím se všechny neuložené změny smažou a soubory se vrátí do stavu posledního commitu.*

### Část 3: .gitignore

```text
hesla.txt
temp/
```
