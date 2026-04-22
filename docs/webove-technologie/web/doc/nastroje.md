# Užitečné nástroje pro webové vývojáře

Tvorba webových stránek není jen o psaní kódu v editoru. Vývojáři ke své práci využívají celou řadu nástrojů, které jim pomáhají s laděním, testováním, měřením výkonu nebo generováním dílčích součástí webu. 

Zde je přehled nejdůležitějších nástrojů a služeb, které by měl znát každý webdeveloper.

## 1. Vývojová prostředí a editory kódu (IDE)

Základním nástrojem každého vývojáře je kvalitní editor kódu, ve kterém tráví nejvíce času.

### Visual Studio Code (VS Code)
- Nejpoužívanější a nejoblíbenější editor kódu současnosti (od Microsoftu).
- Je zdarma, rychlý a extrémně rozšiřitelný díky tisícům doplňků (extensions).
- Nabízí vestavěný terminál, výbornou správu verzí (Git) a inteligentní napovídání kódu (IntelliSense).

### Antigravity
- Pokročilý AI asistent a agentní systém od Google DeepMind, navržený pro efektivní pair programming.
- Dokáže samostatně analyzovat kontext projektu, navrhovat architekturu, psát kód a upravovat soubory přímo ve vývojovém prostředí.

## 2. AI nástroje pro vývoj webu

Umělá inteligence dnes radikálně zrychluje a usnadňuje vývoj webových stránek.

### GitHub Copilot / Cursor
- Nástroje integrované přímo do editoru kódu. Automaticky doplňují celé řádky i rozsáhlé bloky kódu na základě kontextu vaší práce.

### ChatGPT / Claude
- Výkonné jazykové modely (LLM), které slouží jako zkušení mentoři. Mohou vám pomoci vyřešit programátorský zásek, vygenerovat kostru kódu nebo vysvětlit složité koncepty.

## 3. Nástroje přímo v prohlížeči

Moderní webové prohlížeče obsahují výkonné vývojářské nástroje (DevTools), které jsou absolutním základem pro práci s webem.

### Developer Tools (F12)
- **Kde najít:** Ve většině prohlížečů (Chrome, Firefox, Edge) se otevírají klávesou `F12` nebo `Ctrl + Shift + I`.
- **K čemu slouží:**
  - **Elements (Prvky):** Prohlížení a úprava HTML struktury a CSS stylů v reálném čase. Skvělé pro ladění vzhledu.
  - **Console (Konzole):** Zobrazuje chyby a upozornění JavaScriptu. Umožňuje také spouštět JS kód přímo na stránce.
  - **Network (Síť):** Sledování všech souborů, které se stahují (obrázky, CSS, JS), ukazuje rychlost jejich načtení a velikost. Pomáhá najít "úzká hrdla" brzdící načítání webu.
  - **Responsive Design Mode:** Simulace různých velikostí displejů mobilních zařízení.

### Google Lighthouse
- **Kde najít:** Zabudováno v Chrome DevTools (záložka Lighthouse).
- **K čemu slouží:** Automatizovaný nástroj, který ohodnotí vaši stránku ve čtyřech kategoriích: Výkon (Performance), Přístupnost (Accessibility), Osvědčené postupy (Best Practices) a SEO. Vygeneruje podrobný report s konkrétními radami, co a jak zlepšit.

## 4. Generátory a pomocníci

Proč psát složitý kód ručně, když existují nástroje, které to udělají za vás nebo vám práci výrazně usnadní?

### Favicon generátory
Favicon je malá ikonka zobrazená na záložce prohlížeče. Dnes je potřeba vygenerovat několik různých velikostí pro různé platformy (Windows, Apple, Android).
- **RealFaviconGenerator.net:** Jeden z nejlepších nástrojů. Nahrajete obrázek a on vám vygeneruje všechny potřebné velikosti ikonek i s přesným HTML kódem, který stačí vložit do `<head>`.

### Generátory QR kódů
Často se hodí vygenerovat QR kód s odkazem na váš web, například pro tisk na letáky nebo vizitky.
- **QRCode Monkey / QR Code Generator:** Umožňují vygenerovat QR kód zdarma, často i s možností vložit doprostřed logo nebo změnit barvu.

### CSS Generátory
Složité CSS vlastnosti se špatně píší z hlavy.
- **CSS Gradient:** Pro generování plynulých barevných přechodů.
- **Box-shadow CSS Generator:** Pro snadné naklikání stínů prvků.
- **CSS Grid Generator:** Vizuální nástroj pro návrh rozložení pomocí CSS Gridu.

## 5. Barvy a design

Při návrhu webu potřebujete ladící barvy, dobrý kontrast a kvalitní ikony.

### Barevné palety
- **Coolors.co:** Extrémně populární a rychlý generátor barevných palet. Stačí mačkat mezerník a generují se barvy, které k sobě vizuálně ladí.
- **Adobe Color:** Profesionální nástroj pro tvorbu palet na základě barevných pravidel (např. komplementární barvy).

### Kontrast a přístupnost barev
- **WebAIM Contrast Checker:** Zkontroluje, zda má váš text dostatečný kontrast vůči pozadí podle standardů WCAG, aby byl dobře čitelný i pro lidi se zhoršeným zrakem.

### Ikony a obrázky
- **Google Fonts (Icons):** Obrovská knihovna bezplatných, snadno použitelných ikon.
- **FontAwesome:** Známá knihovna ikon, nabízí bezplatnou i placenou verzi.
- **Unsplash / Pexels:** Fotobanky s vysoce kvalitními fotografiemi zdarma pro komerční i nekomerční použití.

## 6. Analytika a měření webu

Když web běží, je důležité vědět, kdo na něj chodí a jak si vede ve vyhledávačích.

### Google Analytics
- Nejrozšířenější bezplatný nástroj pro měření návštěvnosti. Ukáže vám, kolik lidí web navštívilo, odkud přišli (sociální sítě, vyhledávače), z jakých zařízení si web prohlížejí a jaké stránky je nejvíce zajímají.

### Google Search Console
- Nástroj pro správce webu, který ukazuje, jak web vidí samotný vyhledávač Google. Dozvíte se zde, na jaká klíčová slova se zobrazujete, zda nemá Google problém s indexací vašeho webu a zda je váš web dobře optimalizován pro mobily.

### PageSpeed Insights
- Samostatný webový nástroj od Googlu (fungující na podobném základu jako Lighthouse). Změří rychlost vašeho webu a ukáže výsledky reálných uživatelů (Core Web Vitals).

## 7. Validace kódu

Je váš kód správně napsaný a neobsahuje překlepy?

- **W3C Markup Validation Service:** Oficiální nástroj konsorcia W3C. Vložíte adresu svého webu (nebo přímo HTML kód) a nástroj vám vypíše všechny chyby ve struktuře HTML – například chybějící uzavírací tagy nebo nesprávně vnořené prvky.
- **WAVE Web Accessibility Evaluation Tool:** Zadáte URL a nástroj vám graficky přímo na vaší stránce ukáže chyby v přístupnosti (např. chybějící alternativní texty u obrázků, špatný kontrast, chybějící popisky u formulářů).
