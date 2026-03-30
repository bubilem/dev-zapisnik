import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Dev Zápisník",
  description: "Studijní a referenční podklad z oblasti vývoje aplikací",
  lang: 'cs-CZ',
  base: '/dev-zapisnik/',
  ignoreDeadLinks: true,
  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const hrefIndex = token.attrIndex('href');

        if (hrefIndex >= 0) {
          const href = token.attrs[hrefIndex][1];
          const githubBase = 'https://github.com/bubilem/dev-zapisnik/blob/main/docs/';

          // Pokud odkaz končí na naše přípony a není to absolutní URL
          if (/\.(py|js|php|html|sql|css)$/.test(href) && !href.startsWith('http')) {
            // Sestavíme cestu k GitHubu
            // env.relativePath nám řekne, kde jsme, abychom mohli očistit cesty typu ../
            const cleanPath = href.replace(/^\.\//, '');

            // Tady je trik: pokud je cesta relativní (např. src/file.js), 
            // musíme ji spojit s aktuální složkou dokumentu
            const currentDir = env.relativePath ? env.relativePath.split('/').slice(0, -1).join('/') : '';
            const fullPath = currentDir ? `${currentDir}/${cleanPath}` : cleanPath;

            token.attrs[hrefIndex][1] = `${githubBase}${fullPath}`;

            // Volitelné: otevřít v novém okně
            token.attrSet('target', '_blank');
            token.attrSet('rel', 'noopener noreferrer');
          }
        }
        return defaultRender(tokens, idx, options, env, self);
      };
    }
  },
  themeConfig: {
    // Navigace nahoře
    nav: [
      { text: 'Úvod', link: '/README' },
      { text: 'KM', link: '/kriticke-mysleni/README' },
      { text: 'WEB', link: '/webove-technologie/README' },
      { text: 'PRG', link: '/programovani/README' },
      { text: 'DAT', link: '/databaze/README' },
      { text: 'AI', link: '/ai/README' },
      { text: 'OST', link: '/ostatni/README' }
    ],

    // Levé postranní menu pro jednotlivé sekce
    sidebar: {
      '/webove-technologie/': [
        {
          text: 'Webové technologie',
          items: [
            { text: 'Rozcestník', link: '/webove-technologie/README' },
            {
              text: 'HTML',
              collapsed: false,
              items: [
                { text: 'Úvod', link: '/webove-technologie/html/README' },
                { text: 'Základy, pravidla a DOM', link: '/webove-technologie/html/doc/01-zaklady' },
                { text: 'Přehled používaných značek', link: '/webove-technologie/html/doc/02-prehled-znacek' },
                { text: 'Přístupnost, SEO', link: '/webove-technologie/html/doc/03-pokrocile-techniky' },
                { text: 'Tipy a triky', link: '/webove-technologie/html/doc/04-tipy-a-triky' }
              ]
            },
            {
              text: 'CSS',
              collapsed: false,
              items: [
                { text: 'Úvod', link: '/webove-technologie/css/README' },
                { text: 'Základy a selektory', link: '/webove-technologie/css/doc/01-zaklady-css' },
                { text: 'Box Model a barvy', link: '/webove-technologie/css/doc/02-box-model-barvy' },
                { text: 'Layout a pozicování', link: '/webove-technologie/css/doc/03-layout' },
                { text: 'UI/UX a Responzivita', link: '/webove-technologie/css/doc/04-ui-ux' }
              ]
            },
            {
              text: 'Kompetence',
              collapsed: false,
              items: [
                { text: 'O kompetencích', link: '/webove-technologie/kompetence/README' },
                { text: 'Webový ekosystém', link: '/webove-technologie/kompetence/doc/web' },
                { text: 'DevTools', link: '/webove-technologie/kompetence/doc/devtools' },
                { text: 'Git a správa verzí', link: '/webove-technologie/kompetence/doc/git-basics' },
                { text: 'HTML', link: '/webove-technologie/kompetence/doc/html-basics' },
                { text: 'CSS základy', link: '/webove-technologie/kompetence/doc/css-basics' },
                { text: 'CSS layout', link: '/webove-technologie/kompetence/doc/css-layout' },
                { text: 'UI/UX a Design', link: '/webove-technologie/kompetence/doc/ui-ux' },
                { text: 'Základy JS', link: '/webove-technologie/kompetence/doc/js-basics' },
                { text: 'JS DOM', link: '/webove-technologie/kompetence/doc/js-dom' },
                { text: 'JS ES6+', link: '/webove-technologie/kompetence/doc/js-es6' },
                { text: 'Asynchronní JS a API', link: '/webove-technologie/kompetence/doc/js-async' },
                { text: 'Nástroje a NPM', link: '/webove-technologie/kompetence/doc/tools-npm' },
                { text: 'Nasazení webu', link: '/webove-technologie/kompetence/doc/deployment' },
                { text: 'Virtualizace a Docker', link: '/webove-technologie/kompetence/doc/docker' },
                { text: 'Cheat Sheet', link: '/webove-technologie/kompetence/doc/cheatsheet' }

              ]
            }
          ]
        }
      ],

      '/programovani/': [
        {
          text: 'Programování',
          items: [
            { text: 'Rozcestník', link: '/programovani/README' },
            { text: 'Pyramida porozumění', link: '/programovani/pyramida-porozumeni/README' },
            {
              text: 'Problém batohu',
              collapsed: false,
              items: [
                { text: 'Úvod', link: '/programovani/problem-batohu-techniky/README' },
                { text: 'Hrubá síla (Brute Force)', link: '/programovani/problem-batohu-techniky/doc/brute-force-no-recursive' },
                { text: 'Hrubá síla (Rekurzivní)', link: '/programovani/problem-batohu-techniky/doc/brute-force-recursive' },
                { text: 'Genetický algoritmus', link: '/programovani/problem-batohu-techniky/doc/genetic' },
                { text: 'Heuristika (Poměr cena/výkon)', link: '/programovani/problem-batohu-techniky/doc/heuristic-ratio' },
                { text: 'Naivní hladový algoritmus', link: '/programovani/problem-batohu-techniky/doc/naive-greedy-algorithm' },
                { text: 'Náhodný výběr', link: '/programovani/problem-batohu-techniky/doc/random-shooting' }
              ]
            },
            {
              text: 'Úlohy',
              collapsed: true,
              items: [
                { text: 'Operace Blackout', link: '/programovani/task/01-operace-blackout/README' },

              ]
            },
            {
              text: 'Objektově orientované programování',
              collapsed: false,
              items: [
                { text: 'Úvod', link: '/programovani/oop-frame/README' },
                { text: 'Základní pilíře a principy OOP', link: '/programovani/oop-frame/doc/oop-principy' },
                { text: 'Základy OOP', link: '/programovani/oop-frame/doc/oop-basics' },
                { text: 'Porovnání implementace OOP v JavaScript, Python a PHP', link: '/programovani/oop-frame/doc/oop-frame' },
                { text: 'Popis rámce pro náš příklad', link: '/programovani/oop-frame/doc/frame' }
              ]
            },
            {
              text: 'Teorie grafů',
              collapsed: false,
              items: [
                { text: 'Úvod', link: '/programovani/teorie-grafu/README' },
                { text: 'Základní pojmy', link: '/programovani/teorie-grafu/docs/01-uvod' },
                { text: 'Vlastnosti grafů', link: '/programovani/teorie-grafu/docs/02-vlastnosti-grafu' },
                { text: 'Reprezentace grafu', link: '/programovani/teorie-grafu/docs/03-reprezentace' },
                { text: 'Základní algoritmy', link: '/programovani/teorie-grafu/docs/04-zakladni-algoritmy' },
                { text: 'Mosty města Královce', link: '/programovani/teorie-grafu/docs/05-mosty' }
              ]
            }
          ]
        }
      ],

      '/databaze/': [
        {
          text: 'Databáze',
          items: [
            { text: 'Rozcestník', link: '/databaze/README' },
            {
              text: 'Teorie',
              collapsed: false,
              items: [
                { text: '1. Úvod do databází', link: '/databaze/doc/01-uvod-do-databazi' },
                { text: '2. SŘBD / DBMS', link: '/databaze/doc/02-dbms' },
                { text: '3. Konceptuální modelování', link: '/databaze/doc/03-konceptualni-modelovani' },
                { text: '4. Relační model dat', link: '/databaze/doc/04-relacni-model-dat' },
                { text: '5. Převod do RMD', link: '/databaze/doc/05-koncept-rmd' },
                { text: '6. Normalizace', link: '/databaze/doc/06-rmd-normalizace' },
                { text: '7. Další modely', link: '/databaze/doc/07-dalsi-modely' },
                { text: '8. Datové typy', link: '/databaze/doc/08-datove-typy' }
              ]
            },
            {
              text: 'Projekt Cinema',
              collapsed: false,
              items: [
                { text: 'O projektu', link: '/databaze/cinema/README' },
                { text: 'Analýza', link: '/databaze/cinema/doc/analysis' },
                { text: 'E-R schéma', link: '/databaze/cinema/doc/er-schema' },
                { text: 'Datový slovník', link: '/databaze/cinema/doc/dictionary' },
                { text: 'Tabulky', link: '/databaze/cinema/doc/tables' },
                { text: 'SQL INSERT', link: '/databaze/cinema/doc/sql-insert' },
                { text: 'SQL UPDATE', link: '/databaze/cinema/doc/sql-update' },
                { text: 'SQL DELETE', link: '/databaze/cinema/doc/sql-delete' },
                { text: 'SQL SELECT', link: '/databaze/cinema/doc/sql-select' }
              ]
            }
          ]
        }
      ],

      '/ai/': [
        {
          text: 'AI',
          items: [
            {
              text: 'Převedení textu na čísla (vektorizace)',
              collapsed: false,
              items: [
                { text: 'Úvod', link: '/ai/word-embedding/README' },
                { text: 'Převedení textu na čísla (vektorizace)', link: '/ai/word-embedding/doc/word-to-vector' },
                { text: 'Word Embedding', link: '/ai/word-embedding/doc/word-embedding' },
                { text: 'Kosinova podobnost', link: '/ai/word-embedding/doc/cosine-similarity' }
              ]
            }
          ]
        }
      ],

      '/kriticke-mysleni/': [
        {
          text: 'Kritické myšlení',
          items: [
            { text: 'Rozcestník', link: '/kriticke-mysleni/README' },
            { text: 'Kognitivní zkreslení', link: '/kriticke-mysleni/doc/kognitivni-zkresleni' },
            { text: 'Anatomie dezinformace', link: '/kriticke-mysleni/doc/anatomie-dezinformace' },
            { text: 'Strategie ověřování', link: '/kriticke-mysleni/doc/strategie-overovani' },
            { text: 'Argumentační fauly', link: '/kriticke-mysleni/doc/argumentacni-fauly' },
            { text: 'Technologie manipulace', link: '/kriticke-mysleni/doc/technologie-manipulace' },
            { text: 'Ekonomika pozornosti', link: '/kriticke-mysleni/doc/ekonomika-pozornosti' },
            { text: 'Desatero digitální sebeobrany', link: '/kriticke-mysleni/doc/desatero-obrany' },
            { text: 'Slovník pojmů', link: '/kriticke-mysleni/doc/slovnik-pojmu' },
            { text: 'Kvízy a testování', link: '/kriticke-mysleni/doc/kvizy-a-reseni' }
          ]
        }
      ],

      '/ostatni/': [
        {
          text: 'Ostatní problematiky',
          items: [
            { text: 'Domů', link: '/ostatni/README' },
            { text: 'Markdown', link: '/ostatni/doc/markdown' },
            { text: 'Regulární výrazy', link: '/ostatni/doc/regexp' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bubilem' }
    ]
  }
})
