# DevTools

[Zpět na README.md](../README.md)

Práce s **DevTools** (vývojářskými nástroji) je pro vývojáře stejně důležitá jako samotné psaní kódu. Je to "rentgen", kterým vidíte pod kapotu jakékoliv stránky. V Chrome je otevřete klávesou `F12` nebo `Ctrl+Shift+I` (Cmd+Opt+I na Macu).

Zde jsou klíčové kompetence, které by měl žák ovládat:

## 1. Karta Elements (Inspektor)

Zde se ladí struktura a vzhled:

* **Výběr prvku:** Ikona šipky v levém horním rohu nástrojů umožní kliknout na cokoliv na stránce a okamžitě najít příslušný kód.
* **Live editace:** Možnost přepisovat texty v HTML nebo měnit hodnoty v CSS přímo v prohlížeči (změny jsou dočasné, do obnovení stránky).
* **Ladění Box Modelu:** V pravém panelu (Styles) je dole vidět grafický přehled `margin`, `border` a `padding` vybraného prvku.
* **Stavy prvků (Hover):** Možnost vynutit stav `:hover` nebo `:active`, aby bylo možné ladit styly, které se objeví jen při akci myší.


## 2. Karta Console (Logování a chyby)

Mozek interaktivity a hlavní nástroj pro JavaScript:

* **Čtení chyb:** Červené výpisy ukazují, na kterém řádku v JS souboru je chyba a co je její příčinou (např. `Uncaught ReferenceError`).
* **Interaktivní příkazová řádka:** Do konzole můžete přímo psát JS kód a on se nad aktuální stránkou provede.
* **console.log():** Výpis hodnot proměnných během vývoje pro kontrolu, co se v kódu děje.


## 3. Karta Network (Síťová komunikace)

Zde žák vidí teorii HTTP v praxi:

* **Sledování požadavků:** Vidíte každý obrázek, skript nebo dokument, který se stahuje.
* **Status kódy:** Kontrola, zda vše proběhlo v pořádku (`200`) nebo zda něco chybí (`404`).
* **Simulace rychlosti:** Možnost nastavit "Throttling" (např. Slow 3G) pro testování, jak se web chová na pomalém internetu.


## 4. Responsive Mode (Mobilní zobrazení)

* **Ikona zařízení:** Přepne prohlížeč do režimu simulace mobilů a tabletů.
* **Media Queries:** Horní lišta ukazuje body (breakpoints), kde se mění CSS layout.
* **Simulace dotyku:** Kurzor se změní v "kolečko", které simuluje dotyk prstu místo šipky myši.


## 5. Karta Application (Úložiště)

Kde si web pamatuje data:

* **Local Storage / Cookies:** Prohlížení dat, která na počítači uživatele zůstávají i po zavření prohlížeče (např. nastavení tmavého režimu nebo obsah košíku).

<br>
<br>
<br>


# Cvičení: Detektiv v DevTools

1. **Úkol:** Otevři jakýkoliv zpravodajský web. Pomocí karty **Elements** změň hlavní nadpis na: *"Právě jsem hacknul tento web (jen lokálně)!"*.
2. **Úkol:** V kartě **Console** napiš příkaz `alert(document.title)`. Co se stalo?
3. **Úkol:** V režimu **Responsive** najdi, při jaké šířce okna (v pixelech) zmizí horní menu a objeví se "hamburger" ikona.
4. **Úkol:** Otevři kartu **Network** a obnov stránku (`F5`). Najdi největší soubor (podle sloupce Size), který se stahoval.


### Tip pro žáka

> "DevTools ti nelžou. Pokud tvoje CSS nefunguje, podívej se do panelu Styles – tam uvidíš, jestli je tvé pravidlo přeškrtnuté (přebité jiným) nebo jestli máš u vlastnosti žlutý vykřičník (překlep)."
