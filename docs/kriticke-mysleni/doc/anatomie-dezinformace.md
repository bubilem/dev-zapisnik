# Anatomie dezinformace: Rozpoznání toxického obsahu

[Zpět na rozcestník](../README.md)

Při ověřování informací na internetu nestačí řešit jen to, jestli jsou pravdivé. Stejně důležitý je **úmysl**, se kterým je někdo zveřejnil. Ne každá nepravdivá zpráva je totiž cílená manipulace.

## Různé druhy informačních poruch

| Pojem | Je to pravda? | Je tam úmysl uškodit? | Příklad ze života |
|---|---|---|---|
| **Misinformace** | Ne | Ne | Příbuzný ti nasdílí varování o extrémní bouřce, ale nevšimne si, že článek je 10 let starý. Bojí se o rodinu a myslí to dobře. Netuší, že šíří lež. |
| **Disinformace** | Ne | Ano | Organizovaná skupina vědomě vytvoří podvodný web, který vypadá jako státní úřad, a vyhlásí, že zítra zdraží benzín na trojnásobek. Cílem je vyvolat paniku a chaos. |
| **Malinformace** | Ano | Ano | Někdo zveřejní pravdivé kompromitující materiály (např. ukradené soukromé fotky nebo zprávy) těsně před důležitými volbami s jediným cílem – zničit člověku život a pověst. |

## Nejčastější zbraně dezinformátorů

### **Hoax**
- **Definice:** Cíleně šířená lživá a poplašná zpráva. Poznáš ji tak, že hraje na silné emoce (strach, vztek, nadšení) a téměř vždy **vyzývá k okamžitému sdílení**.
- **Příklad z praxe:** Zpráva na WhatsAppu: *"Varování! Smažte si tuhle apku! Včera přes ni hackeři smazali lidem všechny fotky na dálku! Nic neřešte a okamžitě to pošlete všem kontaktům!"*

### **Deepfake**
- **Definice:** Dokonale zfalšované video, fotka nebo hlas nikoho známého, vytvořené pomocí umělé inteligence. Ukazuje osobu v situaci, která se nikdy nestala (např. slavný herec prodává podvodné prášky nebo veřejně známá osobnost vyhlašuje katastrofu).
- **Příklad z praxe:** Na Instagramu měsíc odebíráš účet herce Keanu Reevese. Lajkuješ, jak blbne se psem a vaří oběd. Až jednou v komentářích zjistíš, že celou dobu nesleduješ živého člověka, ale jen počítačový 3D model (Deepfake) vygenerovaný umělou inteligencí. Neomylný falešný profil.
- **Technické pozadí (Generativní sítě - GANs):** Za tímto podvodem stojí "souboj" dvou umělých inteligencí. První algoritmus (Generátor) se učí kreslit lidskou tvář. Druhý algoritmus (Diskriminátor) zná miliony skutečných fotek obličejů a zkoumá, jestli ho ten první nezkouší podvést a neudělal v obraze chybu. Oba systémy spolu takto bojují mockrát za vteřinu tak dlouho, dokud není fotka naprosto bezchybná a vygenerovaný člověk k nerozeznání od reálného.

### **Astroturfing (Falešný dav)**
- **Definice:** Snaha vytvořit iluzi, že "běžní občané" a obrovský počet lidí něco velmi silně podporují, přičemž ve skutečnosti to celé někdo zaplatil a uměle vyrobil. (Název pochází od značky umělých trávníků Astroturf – vytváří se "umělé hnutí zdola").
- **Příklad z praxe:** Značka vydá naprosto předražený a kazový telefon. Pod každou recenzí na webech se ale okamžitě objeví 400 dlouhých komentářů od "běžných uživatelů" (s kradenými profilovkami z fotobanek), kteří mobil vynáší do nebes. Ostatním to vnukne pocit, že *takový krásný telefon přece nejde nekoupit, když ho všichni milují.*
- **Technické pozadí (Botnety a Vytlačování lidí):** Tyto komentáře nepíšou lidé, ale stovky robotů naráz naprogramované přes skripty, takzvané sítě botnetů maskované za Proxy IP adresami po celém světě. A k čemu je útočníci využívají v diskusích na YouTube? Nejde jen o prosazení názoru. Když vypustí pod politické video 500 sprostých, útočných a vulgárních robotických komentářů, **obyčejní slušní lidé i odborníci, kteří by chtěli slušně diskutovat, debatu zhnuseně zanechají (Spirála mlčení)**. Botnet vlastně křikem vytlačí skutečné lidi a vyrobí iluzorní monstrózní většinu lži. Televizní stanice a platformy navíc nad touto vyhrocenou toxicitou mnohdy zavírají oči, protože jim hádky robotů generují "kliknutí a zhlédnutí" (tedy peníze z reklamy).

## Checklist pro studenta (Jak odhalit manipulaci)

- [ ] Vyvolala ve mně tahle zpráva **okamžitý výbuch emocí** (vztek, obrovský strach, paniku)? Pokud ano, má mě v hrsti a jsem ideální oběť pro sdílení Hoaxu.
- [ ] Vypadá osoba obhajující nesmysly pod videem divně? Má ukradenou nebo podivně rozmazanou profilovou fotku? Není to spíš falešný bot?

## Související pojmy
- [Kognitivní zkreslení (Iluze pravdy, proč rádi věříme hoaxům)](kognitivni-zkresleni.md)
- [Argumentační fauly (Zde se nachází Cherry-picking)](argumentacni-fauly.md)
- [Strategie ověřování (Jak se bránit botům pomocí nástrojů)](strategie-overovani.md)
