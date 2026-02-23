# Technologie manipulace: Jak se programuje lež

[Zpět na rozcestník](../README.md)

Lži a podvody na internetu nejsou žádná záhada. Nevznikají "náhodou" a často je nešíří jen parta zmatených lidí nad klávesnicí. V dnešní době je šíření dezinformací tvrdý, plně automatizovaný byznys. K tomu, aby nás dezinformátoři nachytali (nebo z nás dostali peníze a data), používají běžné IT technologie a skripty úplně stejným způsobem, jakým fungují tvoje oblíbené e-shopy či streamovací služby. 

Když ale pochopíš, *jak to dělají technicky*, mnohem hůře tě zmanipulují. Uvidíš za tím zkrátka jen laciný kód.

## 1. Počítačové sítě a přesměrování (Skrývání identity)
Zločincům i profesionálním lhářům záleží na tom, aby nikdo nezjistil, odkud na internet připojený počítač vysílá a řídí sítě lží.

* **Sítě proxy serverů a VPN:** Dezinformátor si pronajme vzdálené přístupové body různě po světě. Jeho reálný příkaz z notebooku na jednom konci planety tak "skáče" přes pronajatý bezvýznamný server na úplně cizím kontinentu a na sociální síť nakonec doputuje z falešné IP adresy (značky počítače na síti) v Paříži nebo v Brně. Vypadá to pak, že pod příspěvkem diskutují stovky různých "místních občanů".
* **Krádeže domén (Typo-squatting):** Zaregistrují si webovou adresu, která vypadá skoro stejně jako oficiální velký úřad nebo zpravodajství, ale zamění v ní jedno písmenko (např. *www.sеznam.cz* namísto *www.seznam.cz*, kde místo "e" použili znak z azbuky, který vypadá stejně). Uživatel si chyby nevšimne a předá jim do podvrženého formuláře svoje osobní údaje nebo peníze.

## 2. Programování webů a algoritmy (Kupování reality a zisku)
Vyrobit falešnou webovku trvá programátorovi jedno odpoledne. Problém ale je, jak ten článek dostat na první stránku Googlu, protože nikdo nečte až desátou stránku výsledků vyhledávání. Zde přichází na řadu "Black Hat SEO" (zakázané metody optimalizace).

* **Zrcadlové domény (PBN - Private Blog Networks):** Vývojář nekoupí jeden web, ale koupí jich hned sto (nazve je různě, např. *ZdraviProVsechny*, *PravdivaFakta*, *OdhalTajemstvi*). Na všechny weby jen mírně pozmění ten obrovský lživý článek pomocí automatického přepisovače slovíček. Nejdůležitější ale je, že **všechny tyto weby si v kódu začnou posílat internetové odkazy navzájem**. Algoritmus vyhledávačů (např. Google) tuhle spleť referencí vidí, řekne si "Páni, na tenhle zdroj odkazují stovky jiných silných webů!" a okamžitě vystřelí tu falešnou stránku dopředu všem normálním lidem. Tohle s nezávislou žurnalistikou nemá mic společného, to je jen hrubá síla softwarového inženýrství.
* **Těžba dat (Data scraping a trackery):** Když navštívíš nehlídaný dezinformační web, na pozadí stránky běží skryté Javascriptové kódy. Ty o tobě tajně analyzují všechno – jakou máš velikost displeje, odkud ses na mapě zhruba připojil, na co jsi u nich klikal a dokonce i jakou máš rychlost myši. Na základě toho síť odhadne tvoji náladu a tvoje slabiny a do minuty ti začne po celém internetu pouštět reklamy šité přesně na tvůj typ strachu.
* **Algoritmická tolerance toxicity (Engagement driven profit):** Možná se ptáš, proč televizní stanice na svém YouTube kanále toleruje stokrát ten samý agresivní, lživý komentář podřízený jedné nenávistné straně a nesmaže ho. Odpověď je byznys. Algoritmus sítě totiž nerozlišuje mezi rozumnou diskusí a vulgární lživou hádkou. Obojí obrovsky **vytváří pohyb na stránce (engagement)**. Čím delší flame-war pod videem zuří, tím déle u něj uživatelé pobudou, o to víc reklam se jim protočí a tím větší zisk vlastník kanálu a platformy vykáže. Mazání lží by je zkrátka stálo miliony dolarů na zisku, a tak nad agresivitou raději zavírají oči.

## 3. Umělá inteligence a Generování obsahu (Strojová výroba)
Bavíme-li se o textu a videu, ještě nedávno musel články vymýšlet člověk, což trvalo hodiny. Umělá inteligence tuto výrobu extrémně zrychlila a zlevnila.

* **Jazykové modely (LLMs) k masové produkci:** Podvodník získá cizí API klíč (přístup pro propojení programů) k výkonným jazykovým modelům (jako je ChatGPT aj., nebo si nainstaluje vlastní levnější modely lokálně na výkonnější grafickou kartu). Napíše základní promtní instrukci do cyklu (loopu): *"Projeď aktuálně nejčtenější článek u nás o X a vymysli k němu 500 agresivních proti-článků a naštvaných komentářů, každý jiným stylem, v každé páté větě udělej schválně hrubku pro reálnost."* Během sekundy skript chrlí hotové bláboly, které se automaticky publikují.
* **Cílené obrazové Deepfakes (Soutěž algoritmů):** Běžné fake účty si dnes nekradou reálné profily fotobanek. Mají zapojený generátor náhodných lidských obličejů přes algoritmus [GAN (Generative Adversarial Network)](anatomie-dezinformace.md), který stvoří virtuálního "Pepu", který v reálném světě sice neexistuje, ale na síti se tváří přesvědčivě jako padesátiletý muž z venkova.
* **Klonování hlasu:** Pomocí tří vteřin záznamu tvojí řeči (klidně z tvého videa někde na síti) dokáže AI software vytvořit plnohodnotný klon tvého hlasu. Tvoje rodina si pak pustí nahrávku s prosbou o zaslání kódů k bance na WhatsApp, která sice mluví tvou dikcí s tvým zabarvením hlasu, ale vše je jen matematicky vygenerovaná akustická vlna.

## 4. Farmy botů (Mechanická armáda na klikání)
Na sociálních sítích rozhoduje počet sdílení a "lajků" o tom, jak moc jsi vidět. Tyto metriky se dají snadno padělat.

* **Farmy a API skriptování:** Celá lživá platforma nenajímá tisíc živých studentů, aby denně klikali ikonku palce. Na jednom silném serveru běží backendová aplikace v Node.js nebo Pythonu, která má zapamatované přihlašovací údaje ke sto tisícům falešných "uživatelů". Autor skriptu stiskne tlačítko. Kód projde smyčku přes databázi účtů a za pár vteřin vyšle statisíce automatizovaných dotazů rovnou na servery TikToku nebo Facebooku.  Služební servery nedokážou vždy rozpoznat, že požadavek udělal skript z prázdné plechovky, a nikoli lidský prst swipující na mobilu. Výsledkem je, že zpráva bez obsahu a šílený názor od "nikoho" raketově letí sociálním algoritmem na všechny strany.

## 5. Případové studie: Ekosystém lži v praxi
Aby dezinformátoři dosáhli maximálního dosahu a zisku (případně ovlivnili volby), zmíněné technologie nikdy nepoužívají odděleně. Spojují je do takzvaného ekosystému manipulace. Takhle vypadá obvyklý scénář kampaně krok za krokem:

1. **Fáze 1 (Příprava pastí přes Sítě a SEO):** Útočník zaregistruje 50 zrcadlových domén (PBN sítě) se jmény jako *cz-pravdnes.com* nebo *zpravy-bez-cenzury.net*. Část z nich využívá přesně zkopírovaný design zavedených světových deníků (Typo-squatting). 
2. **Fáze 2 (Strojová výroba obsahu s využitím AI):** Přes API napojené na jazykové modely se do databáze všech padesáti webů automaticky vygeneruje 300 neustále se obměňujících lživých článků (např. o blížícím se státním bankrotu a nedostatku jídla). AI klonování hlasu a Deepfake videogenerátor navíc vyrobí neexistující rozhovor s guvernérem národní banky, který onen krach lživě potvrzuje.
3. **Fáze 3 (Útok Botů maskovaných přes VPN):** Backendový serverový skript (Botnet) naruší sociální sítě. Pomocí tisíců ukradených účtů (všechny se maskují přes různé Proxy a VPN servery, aby vypadaly jako připojení občanů z různých koutů republiky) sdílejí falešní "lidé" tyto články a hromadně na ně klikají "To se mi líbí".
4. **Závěr (Ovlivnění algoritmu):** Algoritmy Googlu, TikToku a Instagramu si všimnou mohutné obří sítě sdílení i provázanosti odkazů na webech. Míra dosahu překročí kritickou mez a systém automaticky naservíruje tuto vykonstruovanou umělou lež do mobilů milionům běžných, skutečných občanů. Za 72 hodin se programátorovi podařilo udělat ze skriptu celostátní kauzu.

## Checklist studenta (Identifikace stroje)

- [ ] Předávám pochybnému webu data? (Pokud není v adrese klasický *zámeček certifikátu* nebo adresa vypadá divně podezřele – `prihlaseniseznam.xz.com` – je to scam!).
- [ ] Chová se komentující účet spíše jako **bot** než člověk? (Publikuje dlouhý a nabitý text ve 3 hodiny ráno zhruba s 2vteřinovým zpožděním od vydání původního článku, a jmenuje se zváštně genericky – user18388484?)
- [ ] Zní hlasový záznam nebo vyjádření celebrity úplně odtrženě od toho, co by ten jedinec reálně řekl? Nemůže se jednat o AI zvukový model či manipulativní deepfake obrázek postavený na ukradeném záznamu?

## Související pojmy
- [Strategie ověřování (Jak propálit skrytá metadata a proxy botů)](strategie-overovani.md)
- [Anatomie dezinformace (Hoax, Astroturfing jako výsledek farem botů)](anatomie-dezinformace.md)
