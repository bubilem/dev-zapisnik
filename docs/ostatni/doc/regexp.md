# Regulární výrazy (RegEx)

Regulární výrazy (zkráceně **RegEx** nebo **RegExp**) jsou extrémně silným nástrojem pro vyhledávání, validaci a úpravu textových řetězců pomocí speciálních formálních pravidel (vzorů). Místo složitě provázaných textových funkcí dokáže jediný, byť někdy hrozivě vypadající, řádek plně popsat pravidla, co přesně v textu musí a nesmí být. 

Tento dokument slouží jako tahák základních i pokročilých "kouzel" při psaní regulárních výrazů s ukázkami zaměřenými na naše reálné nasazení.

---

## 1. Základní stavební bloky a speciální znaky

Zápis RegEx výrazů připomíná šifru. Běžná písmena a čísla hledají samy sebe (např. výraz `abc` najde text "abc"). Skutečná síla ale pochází z takzvaných "metaznaků" (speciálních znaků).

### Ukotvení pozice
*   `^` (Stříška) – Označuje absolutní **začátek** řetězce. Výraz `^Pes` ověří heslo, pouze pokud jím text přímo začíná.
*   `$` (Dolar) – Označuje absolutní **konec** řetězce. Výraz `konec$` projde, pouze pokud text končí slovem "konec".
> [!TIP]
> Spojením `^vzor$` v podstatě říkáme: *„Celý řetězec, od prvního až do posledního znaku, musí naprosto přesně odpovídat tomuto vzoru (nic předtím, nic za ním).“*

### Nástroje pro znaky a třídy
*   `.` (Tečka) – Zastupuje **jakýkoliv jeden znak** (písmeno, číslo, symbol, mezeru...) kromě odřádkování.
*   `[ ]` (Hranaté závorky) – Určují **třídu (množinu) znaků**. Shodují se právě s jedním znakem, který seznam obsahuje. 
    * `[abc]` najde "a", "b" nebo "c". 
    * `[0-9]` najde jakékoliv číslo od 0 do 9 (rozsah). 
    * `[a-zA-Z]` najde libovolné písmeno anglické abecedy nehledě na velikost.
*   `[^ ]` (Stříška v závorce) – Slouží jako **negace**.
    * `[^0-9]` najde jakýkoliv znak, který **není** číslo.
*   `|` (Svislítko / Pipe) – Slouží jako logické **NEBO (OR)**. Výraz `kočka|pes` najde buď obsažené slovo "kočka", nebo slovo "pes".
*   `\` (Zpětné lomítko) – Používá se pro tzv. **escapování**. Pokud chcete reálně vyhledat například tečku, musíte napsat `\.`, protože samotná tečka by fungovala jako metaznak (jakkýkoliv znak).

### Kvantifikátory (Opakování)
Určují, kolikrát přesně se smí bezprostředně předcházející pravidlo nebo znak opakovat.
*   `*` (Hvězdička) – Znak před ní se může opakovat **0x a vícekrát**. (Nemusí tam být vůbec).
*   `+` (Plus) – Znak před ním se musí opakovat **1x a vícekrát**. (Musí tam být aspoň jednou).
*   `?` (Otazník) – Znak je volitelný, může tam být **0x nebo 1x** (ano/ne).
*   `{n}` – Přesný zadaný počet ořezaných opakování (např. `[0-9]{3}` vyžaduje přesně *tři čísla*).
*   `{min,max}` – Omezující rozsah opakování (např. `.{2,5}` je *dva až pět znaků* libovolného typu).

### Skupiny
*   `( )` (Kulaté závorky) – **Sdružují** více prvků do jednoho bloku, na který lze napasovat kvantifikátor, a navíc si do paměti chytnou/zapamatují přesný "využitý" výsledek operace rozebrání.
    * Třeba `(ab)+` říká, že celá dvojička písmen `ab` se musí aspoň jednou zopakovat ("ab", "abab", "ababab").

---

## 2. Zkratky a definované typy

Pro oblíbené konstrukce se dají využívat vestavěné zkratky nahrazující zdlouhavé psaní v hranatých závorkách:
*   `\d` – Skok na libovolnoučíslici (`digit`). Ekvivalentem je `[0-9]`. (Velké `\D` znamená logický opak, tudíž cokoliv, co není číslo).
*   `\w` – Anglický alfanumerický znak včetně podtržítka (`word character`). Zastupuje `[a-zA-Z0-9_]`.
*   `\s` – Zastupuje bílý (neviditelný) znak (`whitespace`) jako je obyčejná mezera, neviditelné posunutí přes formátový tabulátor apod.

---

## 3. Praktické ukázky využití

### Příklad 1: MAC adresa (`^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$`)
Z analyzátoru ze simulačního síťového nástroje z našeho projektu znáte přesné testování standardu. Následující RegEx parádně zařizuje, že string `"FA:31:45:65:C6:A9"` projde validátorem v tichosti, avšak `"nejaky-blabol"` už ihned vyhodí výjimku.
Pojďme si ho logicky rozebrat:
*   `^` : Text **musí** začít přesně tímto následujícím vzorem.
*   `[0-9a-fA-F]` : Povol cokoliv z čísel `0-9` a navrch hexa písmena od malého `a-f` i obřího `A-F`.
*   `{2}` : Znak z oné množiny z předcházejících závorek se tu musí vyskytnout **přesně dvakrát za sebou** (takže např. `FA`).
*   `:` : Po oněch dvou hexa znacích musí tvrdě následovat reálná dvojtečka.
*   `( ... ){5}` : Celý tento proces a skupina (dvaznaky+dvojtečka) se zopakuje do řady za sebe natvrdo právě a přesně **5x**.
*   `[0-9a-fA-F]{2}` : Po pětinásobném bloku s dvojtečkou dolepíme **poslední šestou** čtveřici hexa znaků. Tyto znaky pochopitelně nesmí končit dvojtečkou, proto je to izolované na konec samostatně.
*   `$` : A hned poté **musí** být tvrdý konec stringu, nic dalšího za "devítkou" už netrpíme.

### Příklad 2: Kontrola jednoduchého e-mailu (`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
Tato monstrózní, ale zcela nutná klasika v aplikacích si hlídá:
* Levá strana (`^[a-zA-Z0-9._%+-]+`): Cokoliv běžného (číslice, písmena a technické spojky) oddělené aspoň 1 znakem!
* Uprostřed Zavináč (`@`): Povinná spojka pro mailserver.
* Pravá strana adresa (`[a-zA-Z0-9.-]+`): Doména (např. `gmail`, `seznam`).
* Konec domény (`\.[a-zA-Z]{2,}$`): Tvrdá tečka `\.` (ochrana lomítkem) následovaná aspoň dvěma a více znaky čistých písmen (např. `.cz`, `.com`), na které už musí řetězec ihned striktně dopadnout.

### Příklad 3: Telefonní čísla v ČR (`^(\+420)? ?\d{3} ?\d{3} ?\d{3}$`)
Úžasná šablona pro telefonní seznam se svobodným formátem psaní od uživatelů:
* `(\+420)?` : Lidé *mohou* (ale *nemusí*, poznáme díky otazníku) začít předvolbou v bloku `+420` (znak plus je escapovaný).
* ` ?` : Mezera tam *může* a *nemusí* být následně pošoupnuta.
* `\d{3}`: Trio číslic. Pak eventuelní prokladová mezera (` ?`) a zase trio číslic a do třetice opět končí tvarem posledního tria absolutně uzavírající string! Podporovali bychom tu tudíž krásně formát `+420777666555` i `777 666 555`.

> [!WARNING]
> Při navrhování pokročilých "regexů" doporučujeme využívat vizualizační pomocné a testovací portály obřích formátů online (např. `regex101.com` či `regexr.com`), ušetří se tím hodiny hledání zapomenutého "mázlého" znaku.
