# 01. Koncepce a Základy Syntaxí

Aby se web netvářil jen jako čistý, nezformátovaný textový dokument, vznikly v roce 1996 Kaskádové styly (CSS). Zatímco HTML udává strukturu stromu (DOM), CSS obaluje tyto větve do barev, rámečků a dává jim tvar.

## Jak styl k HTML stránce připojit?

Existují tři způsoby formátování HTML, přičemž v praxi vás bude zajímat primárně jen ten poslední.

### 1. Inline styl
Styl se připisuje přímo na samotnému elementu formou atributu.
```html
<h1 style="color: blue; font-size: 24px;">Zabarvený nadpis</h1>
```
> [!WARNING]
> Od Inline stylů se absolutně opouští. Znemožňují chytrou kaskádu vizuálu (pokud máme na stránce 100 nadpisů s atributem blue, chceme-li je obarvit na červenou musíme smazat a upravit kód fyzicky u každého zvlášť). Jsou tolerovány jen pro dočasné dynamické stavy tvořené JavaScriptem (zobrazení/skrytí okna).

### 2. Styl před hlavičkou dokumentu (`<style>`)
Dovnitř tagu `<head>` umístíme obal s přípravou stylizace. Tím si alespoň sdružíme kódy do jedné čitelné vrstvy bez plstění stromu HTML stránek od `style=` prvků v samotném `body`.
```html
<head>
  <style>
    h1 { color: blue; }
  </style>
</head>
```
Nevýhoda zůstává stejná – pravidlo o obarvení nadpisů v hlavičce existuje a ovlivňuje jen tu **jedinou HTML stránku**, v jejíž hlavičce se nachází. Pokud máte e-shop o dvaceti jiných url, všechny ostatní zůstanou defaultní.

### 3. Externí CSS (Nejpoužívanější a správně)
Napíšeme nezávislý dlouhý skript v souboru s koncovkou úplně jinde (třeba `css/style.css`), do kterého vypíšeme obrovskou kaskádu chování celého webu i s proměnnými a responzivitou pro mobily.
Pro zaktivnění této definice na jakémkoli HTML dokumentu stačí odkázat tento css list atributem _"link referující o stylesheetu"_. Pokud chceme obarvit oněch 100 nadpisů napříč všemi 20 HTML stránkami e-shopu, stačí upravit pravidlo jen jedinkrát v tomto odděleném CSS dokumentu!

```html
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
```


---


## Kaskádové chování

Název **Cascading Style Sheets** neobsahuje slovo *Kaskáda* náhodou. Webové prohlížeče vyhodnocují konflikty podle „nejtěžší kaskády/specifity“.

Příklad kaskády:
Máme tag `<p>`. V našem připojeném CSS je obecné pravidlo, že `Všechna péčka P mají být červeně`. Naše péčko ale současně v sobě nese i třídu `.maly-dousek` a pro takovou třídu je v CSS naklikáno `Zbarvi do modra a prď na pravidlo obecných červených odstavců, poněvadž jsem selektor menšinové úzké třídy`. Přirozeně tedy vyhrává specifičtější definice – **Odněkud zdědil pravidlo obarvit P celoplošně na červeno, ale přeteklo i specifickým pravidlem z modré barvy v malém selektoru třídy.** 

## Jaká je zapsána Syntax a tvoříme Selektory?

Vždy potřebujeme systému v první chvíli říci `Koho na webu hledám / koho tím ovlivním`= tzv. Selektor. Teprve pak po něm uvnitř složených `{ }` závorek odeslat definici _(klíč a stěžejní hodnota k přiřazení)_. Pozor na syntaktické prohřešky s chybějícími středníky `;`. Zastavují čtení prohlížeče dál v souboru.

### 1. Typografický / Tagový selektor 
Vybírá z DOMu prvky podle názvu HTML elementu. Vybírá tak na stránce pochopitelně naprosto všechny.
```css
/* Tímto oslovíme všechny hlavní nadpisy H1 a dáme je odrazem zelené barvy. */
h1 {
    color: green; 
    text-align: center;
}
```

### 2. Selektor třídy (Class Selektor – ten hlavní pro všechno)
Třída je pojmenovaný identifikátor přiřazený elementu přes HTML. Pokud vytvoříme v HTML `<div class="poznamka-zluta">`, třídu začínáme v CSS v podstatě jako variabilní pojem, tedy vždy **Začíná tečkou**. Můžeme ho vložit komukoliv v HTML klidně víckrát sobě naráz (takže i jinému odstavci `<p class="poznamka-zluta"></p>`.
```css
.poznamka-zluta {
    background-color: #FFFFCC;
    font-size: 14px;
}
```

### 3. ID Selektor (Stavební prvek)
Začíná znakem Hashtagu (`#`). V HTML můžeme přiřadit `id="hledani-header-top"`. Prohlížeče ID chápou jako primární stavebník prvek struktury a na stránce tak nesmí tento identifikátor už po druhé existovat u jiného prvku. Proto jím šetříme jen pro unikátní místa.

```css
#hledani-header-top {
    height: 100px;
}
```

### Ostatní specializované selektory (Stavové, Vnořovací)

Když chytře prolínáme tyto 3 prvky, dokážeme najít v divoké stromové struktuře HTML skoro bezprostředně jakéhokoli vnořeného potomka po celém webu. Větší divočina se nazývá _Kombinátor_ nebo _Pseydo-třídy_.

```css
/* Mezera = Vybíráme pouze ty elementy a odkazy, které leží někde hluboko utopené pod rodičem třídy .sekce-vyhody. Všechny ostatní a/odkazy v jiných sekcích nepoškodí obarvení na červeno */
.sekce-vyhody a {
     color: red;
}

/* Pseudo třída v daný moment: Tuto barvu použij až když uživatel s myší "zavěsí / najede/ vyhoveruje" nad zmíněný odkaz */
a:hover {
     text-decoration: none;
}
```

---

> [!TIP]
> **Cvičení - Osvěžení**
> Jaký CSS zápis byste zvolili, abyste přiřadili modrou barvu úplně všem libovolným odstavcům  v textu, které mají i svoji konkrétnější zástupnou třídu `error`? 
> _Při znalosti kaskády je to selektor tagem křížený o zástupnost - takže nebereme jen péčka ani nebereme všechny errory z h1 nadpisů: Píšeme dohromady bez mezer jako `p.error`_.
