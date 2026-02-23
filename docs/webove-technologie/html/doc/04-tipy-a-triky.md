# Tipy, triky a chybějící střípky z HTML

Aby byl náš zápisník opravdu užitečným průvodcem pro tvorbu webu, je potřeba pokrýt i některá drobnější – ale o to záludnější – specifika jazyka HTML. Pokud se potýkáte se zlomeným parsováním speciálních znaků, nebo si nejste jisti, kam poslat formulářová data, najdete zde většinu odpovědí.

## 1. Znakové entity a záludné formátování textu

Jak do odstavce v HTML zapsat text: *„Použijte kód `<br>` pro odřádkování.“*?
Pokud jej do kódu vložíte jen tak, prohlížeč si při parsování bude opravdu myslet, že v textu otevíráte novou značku `br` a ve finále ji skryje.

Řešením jsou tzv. **znakově entity (HTML entities)**. Zapisují se složené z ampersandu (`&`), jména kódu a středníku (`;`).

*   `&lt;` (less than): Odpovídá znaku `<`
*   `&gt;` (greater than): Odpovídá znaku `>`
*   `&amp;`: Odpovídá samotnému ampersandu `&`
*   `&nbsp;` (non-breaking space): Nedělitelná mezera. Užitečná pro spojení jednoslabičných předložek na konci řádků k dalšímu slovu (např. v české typografii "v lese").
*   `&copy;` nebo `&reg;`: Symboly pro autorská práva `©` a registrované značky `®`.

*Náš ukázkový text z úvodu pak tedy napíšeme jako:* `Použijte kód &lt;br&gt; pro odřádkování.`

## 2. Zpracování a validace HTML formulářů

U elementu `<form>` jsme si ukázali inputy, ale je důležité znát logiku, která se stará o samotné odeslání.

*   `action="..."`: Kam se data odešlou po stisknutí submit tlačítka. Obvykle sem doplňujeme URI na skript (např. `/api/zpracuj-kontakt.php`).
*   `method="..."`: Jakým HTTP protokolem se tak stane. Možnosti jsou (ve světě obyčejného HTML) primárně `GET` a `POST`.
    *   **GET**: Posílá data zakomponovaná přímo do URL (viditelná pro všechny návštěvníky; vhodné pro vyhledávání, filtrování na e-shopu).
    *   **POST**: Vkládá odeslaný obnos neviditelně do těla (body) požadavku. Ideální pro registrační formuláře, komentáře a vše s osobními nebo měnícími se daty.

V HTML5 umí samotné prohlížeče základní validaci vstupu už před odesláním serveru:
*   `required`: Pole nesmí být při odeslání prázdné.
*   `min`, `max`, `step`: Pro číselné inputy určuje minimální/maximální hodnotu a povolené kroky.
*   `pattern`: Lze sem vložit regulární výraz, který hodnota musí splnit (např. validace formátu rodného čísla).

```html
<form action="/login" method="POST">
    <label for="username">Uživatelské jméno:</label>
    <!-- Pokud nevyplníme, prohlížeč nás s červenou hláškou zastaví dřív, než dojde k odeslání požadavku -->
    <input type="text" id="username" name="username" required minlength="3" maxlength="20">
    <button type="submit">Přihlásit</button>
</form>
```

## 3. Cesty: Absolutní, Relativní, Kotvy

Ať už odkazujete přes `<a>` značku, tvoříte `<img>`, nebo přikládáte styly tagem `<link>`, používáte systém cesty. Zmatek v logice se při nasazení aplikace nemile projevuje.

*   **Absolutní cesty** (`https://mujweb.cz/obrazky/logo.png`):
    Berdou rovnou celou vnější DNS adresu. Používají se především když opouštíte doménu webu (tj. venkovní odkazy, stahování vizuálu třetích stran). Extrémně nevýhodné při testování webu na lokále počítači.
*   **Root-relativní cesty** (`/obrazky/logo.png`):
    Začínají vždy dopředným lomítkem `/`. Ať se právě nacházíte na vnořené páté úrovni adresářu webu, toto lomítko řekne "Vrať se domů na kořen disku a odtud otevři složku obrazky". Ideální volba ve chvíli, kdy známe architekturu veřejného serveru.
*   **Relativní cesty** (`obrazky/logo.png` nebo `../css/style.css`):
    Cesta bere jako počáteční bod složku aktuálního HTMl souboru, ve kterém se nachází. Dvě tečky `../` slouží k vynoření se ven ze stávajícího adresáře, od kterého kaskádovitě klesáme tam, kam potřebujeme.

*(V záhlaví prohlížečům sdělujeme Kotvy)*. Použijeme symbol křížku/hashtagu `#`. Můžeme posunout odkaz rovnou na vybranou sekci na stránce. K posunutí dojde pokud cílovému elementu přiřadíme stejné takové `<div id="kotva">`.

Příklad kotvy: `<a href="#kotva">Skočit na zajímavou část</a>`

## 4. Moderní multimédia (`iframe`, `svg`, `picture`)

*   `<iframe>`: Je to v podstatě vnořený prohlížeč uvnitř vašeho prohlížeče. Slouží k vyvolání kompletně cizího dokumentu uprostřed naší HTMl obrazovky bez znalosti jeho zdrojových kódů (Google mapy, Youtube embed linky). 
*   `<svg>`: Kreslení vektorů pro rozlišující plátno pomocí číselné matematiky. Od moderních ikon, složitých grafických pláten až log s neuvěřitelnou datovou úsporou (kódem).
*   `<picture>`: Řeší obrovský problém responzivních webů s obrázky. Namísto jednoho `<img />` poskytneme prohlížeči paletu alternativ jako `source`. Pokud načte `<picture>` mobil, vezme si datově lehký obrázek (`media="(max-width: 600px)"`). Na velkém 4K monitoru naopak rovnou sáhne po zdroji obrázku se stejným vizuálem nakódovaném v ostřejší šířce, abychom předcházeli zrnění fotek u okrajů stránky. Zvyšuje tím razantně rychlost webů u mobilních telefonů tím, že šetří zbytečná načitaná megabajty původní max velikosti fotek.
