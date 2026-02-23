# Úvod do Teorie grafů

## Co je to graf?
V informatice a matematice není *graf* jen obrázek funkce (jako v analýze), ale abstraktní struktura, která modeluje vztahy mezi objekty.
Graf **G** je definován jako uspořádaná dvojice **(V, E)**, kde:
- **V** (Vertices) je neprázdná množina **vrcholů** (uzlů, bodů).
- **E** (Edges) je množina **hran**, které spojují dvojice vrcholů.

Pokud hrana spojuje vrcholy *u* a *v*, říkáme, že tyto vrcholy jsou **sousední**.

---

## Historie
Za počátek teorie grafů se považuje rok **1736**, kdy švýcarský matematik **Leonhard Euler** vyřešil slavný problém **Sedmi mostů města Královce** (dnešní Kaliningrad).
Otázka zněla: *Je možné projít všech sedm mostů přes řeku Pregel tak, abychom každý most přešli právě jednou a vrátili se na začátek?*

Euler si situaci zjednodušil na graf:
- Části pevniny reprezentoval jako **vrcholy**.
- Mosty reprezentoval jako **hrany**.

Dokázal, že to **není možné**, protože graf obsahoval více než dva vrcholy s lichým počtem hran (stupněm). Tím položil základy teorie grafů (Eulerovský tah).

---

## Využití v praxi
Teorie grafů je klíčová pro řešení mnoha reálných problémů:

1.  **Dopravní sítě a logistika**
    *   Hledání nejkratší trasy v navigacích (GPS).
    *   Optimalizace rozvozových tras (Problém obchodního cestujícího).
    *   Letové řády a spojení.

2.  **Počítačové sítě a internet**
    *   Modelování internetu (vrcholy jsou servery, hrany jsou kabely/spojení).
    *   Směrování paketů (hledání cesty v síti).

3.  **Sociální sítě**
    *   Facebook/LinkedIn: Vrcholy jsou lidé, hrany jsou přátelství/propojení.
    *   Analýza komunit a vlivu uživatelů.

4.  **Chemie a biologie**
    *   Struktura molekul (atomy a vazby).
    *   Šíření nemocí v populaci.

5.  **Plánování a rozvrhování**
    *   Závislosti úkolů v projektu (PERT diagramy).
    *   Rozvrhování procesů v operačním systému.

---

## Základní pojmy

- **Vrchol (Vertex/Node):** Základní bod v grafu.
- **Hrana (Edge):** Spojnice mezi dvěma vrcholy.
- **Smyčka:** Hrana, která začíná a končí ve stejném vrcholu.
- **Stupeň vrcholu:** Počet hran, které do vrcholu zasahují (v neorientovaném grafu).
- **Cesta:** Posloupnost vrcholů spojených hranami.
- **Kružnice (Cyklus):** Cesta, která začíná a končí ve stejném vrcholu.
