# Strategie ověřování: Praktické postupy

[Zpět na rozcestník](../README.md)

Rozpoznat lživou zprávu jen z toho, jak je napsaná, je dnes skoro nemožné. Dezinformace neobsahují žádný "virus", který by ti blikal, že čteš lež. Pokud chceš informace opravdu ověřit, nesmíš se upnout jen na samotný článek. Musíš se stát digitálním detektivem a podívat se na **stopy a kontext**, které web zanechal jinde po internetu. 

## Metoda SIFT (Pravidla pro sociální sítě)

Jedná se o rychlou a spolehlivou techniku pro ověřování na internetu, navrženou přesně pro prostředí mobilů a sociálních sítí.

1. **S – Stop (Zastav se):**
   - Jakmile v tobě titulek na mobilu vyvolá paniku, vztek nebo obrovskou radost, **přinuť se nezareagovat**. Ještě než připíšeš vzteklý komentář nebo dáš sdílet (čímž jen pošleš algoritmu zprávu, ať to ukáže dalším lidem), zjisti, o co vlastně jde.
2. **I – Investigate the Source (Prověř zdroj):**
   - Kdo to vůbec sdílí? Je to normální velká redakce novinářů, kteří mají na svém webu jasně napsaná jména, adresy a kontakty? Nebo je to anonymní prapodivný blog typu "Svobodná necenzurovaná pravda bez okovů"?
3. **F – Find Better Coverage (Najdi si lepší zdroje):**
   - Hoď téma zprávy do vyhledávače. Například pokud článek na sítích křičí: *"Od pátku se v tajnosti občanům kompletně ruší a zabavují všechny papírové peníze!"*, uvědom si obrovský dosah takové zprávy. Bude o takové masivní věci informovat seriózní Česká tisková kancelář (ČTK) nebo světové servery s obrovskou prestiží? Pokud na normálních webech není o této katastrofě ani zmínka a řeší to jen obskurní a rozpixelovaný bulvár, je to pravděpodobně lež.
4. **T – Trace Claims (Dojdi zpět k originálu):**
   - Podvodné zprávy se často snaží působit chytře: *"Obrovská americká studie NASA potvrdila, že..."* Nikdy v takovém případě nevěř pochybnému převypravěči článku. Klidně si NASA zprávu najdi sám na originálním webu, dej `Ctrl+F` a vyhledej si ta správná hesla. Brzy zjistíš, že si dezinformátor slova studie schválně překroutil.

## Lateral Reading (Čtení napříč / "Hledání bokem")
- **Co to je:** Opravdoví profesionálové (fact-checkeři) netráví zkoumáním podvodného zdroje vůbec žádný čas. Zvlášť neotevírají jejich záložku "O nás". Přece čekáš, že když někdo lže, tak sám sobě napíše krásný a úctyhodný popisek. Proč by do svého životopisu psal, že je pochybný? Fact-checker prostě **odejde pryč**, otevře si na boku (od toho Lateral) 5 nových záložek v prohlížeči a hledá, co o samotném webu napsali jiní lidé.
- **Příklad z praxe:** Najdeš portál "Výzkumné fórum zdraví", které má krásný nablýskaný design a prodává zázračné léky. Místo toho, abys slepě věřil recenzím přímo na stránce obchodu, prostě zadáš do Googlu heslo: `Výzkumné fórum zdraví, recenze, podvod, zkušnosti`. Okamžitě narazíš na články o soudech s pofidérními bylinkáři z minulých let. Utekl jsi ze lživé pasti a ušetřil si peníze.

## Reverzní hledání obrázků
- **Co to je:** Dezinformátoři běžně berou fotky z jiných situací a jiné doby, aby vyvolali zděšení dnes. Pokud máš pochybnosti o nějaké moc dokonalé nebo vyhrocené fotce z protestů nebo požáru letadla, stáhni si ji. Nahraj ji na weby jako **Google Images (Lens)**, **TinEye** nebo **Bing Visual Search**.
- **Příklad z praxe:** Vyskočí na tebe příspěvek z domácí scény o naprostém chaosu ve městech: *"Stávka lékařů ničí systém! Lidé prý bourají ulice a převrací auta!"*, a k tomu emotivní fotografie rozbitých ulic a plamenů. Dáš fotku do Googlu. Do vteřiny zjistíš, že je to slavný fotoreport z hokejových výtržností v Kanadě před dvanácti lety. Další klasický Hoax vyřízen během minuty.

## Technické odhalení Falešných potvrzovacích systémů (PBN)
- **O co jde:** Tvůrci falešných zpráv ví, že si je lidi občas umí ověřit, a proto ti nachystají další falešnou stopu. Vytvoří ještě stránku B a stránku C se zcela jiným logem i jménem, aby ti to pak při googlení "skvěle ověřily nezávislé důkazy". Ve skutečnosti celý tenhle kruh vlastní jeden a ten samý dezinformátor – postavil ti umělou hradbu referencí.
- **Odhalení (IT okénko):** Pro studenty zajímající se o IT – tyto sítě napojených domén (PBN) se dají velice hezky propálit z kódu nebo z konfigurace sítě. Když prozkoumáš domény na pozadí, najednou u "znesvářených" nezávislých stran uvidíš, že jejich weby hostuje jedna IP adresa (jeden chudák server u stejné společnosti), nebo je v HTML obou webů vloženo to úplně stejné tajné měřící ID Google Analytics. Podvodník se tak sám odhalil, protože si logoval návštěvy do stejného grafu na jeden nástroj.

## Checklist studenta ("Stop and go")

- [ ] Před hádkou v komentářích i sdílením jsem se pozastavil díky SIFT metodě.
- [ ] Otevřel jsem si novou kartu v prohlížeči, abych tenhle "bombastický web" prověřil u jiných lidí, místo abych věřil jen hezkému barevnému obalu stránky? (Lateral Reading)
- [ ] Prověřil(a) jsem šokující fotku z války nebo bouračky přes Google Lens pro zjištění, jestli není už dvacet let stará?

## Související pojmy
- [Kognitivní zkreslení (Proč selžeme, pokud neuděláme SIFT krok S - STOP)](kognitivni-zkresleni.md)
- [Anatomie dezinformace (Jak nás pofidérní portály zaplaví Astroturfing boty)](anatomie-dezinformace.md)
