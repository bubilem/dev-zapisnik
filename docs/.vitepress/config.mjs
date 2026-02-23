import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Dev Zápisník",
  description: "Studijní a referenční podklad z oblasti vývoje aplikací",
  lang: 'cs-CZ',

  themeConfig: {
    // Navigace nahoře
    nav: [
      { text: 'Domů', link: '/' },
      { text: 'Webové technologie', link: '/webove-technologie/' },
      { text: 'Programování', link: '/programovani/' },
      { text: 'Databáze', link: '/databaze/' }
    ],

    // Levé postranní menu pro jednotlivé sekce
    sidebar: {
      '/webove-technologie/': [
        {
          text: 'Webové technologie',
          items: [
            { text: 'Rozcestník', link: '/webove-technologie/' },
            {
              text: 'HTML',
              collapsed: false,
              items: [
                { text: '1. Základy, pravidla a DOM', link: '/webove-technologie/html/doc/01-zaklady' },
                { text: '2. Přehled používaných značek', link: '/webove-technologie/html/doc/02-prehled-znacek' },
                { text: '3. Přístupnost, SEO', link: '/webove-technologie/html/doc/03-pokrocile-techniky' },
                { text: '4. Tipy a triky', link: '/webove-technologie/html/doc/04-tipy-a-triky' }
              ]
            },
            {
              text: 'CSS',
              collapsed: false,
              items: [
                { text: '1. Základy a selektory', link: '/webove-technologie/css/doc/01-zaklady-css' },
                { text: '2. Box Model a barvy', link: '/webove-technologie/css/doc/02-box-model-barvy' },
                { text: '3. Layout a pozicování', link: '/webove-technologie/css/doc/03-layout' },
                { text: '4. UI/UX a Responzivita', link: '/webove-technologie/css/doc/04-ui-ux' }
              ]
            },
            {
              text: 'Kompetence',
              collapsed: true,
              items: [
                { text: 'O kompetencích', link: '/webove-technologie/kompetence/' },
                { text: 'HTML', link: '/webove-technologie/kompetence/doc/html' },
                { text: 'CSS Základy', link: '/webove-technologie/kompetence/doc/css-basics' },
                { text: 'CSS Layout', link: '/webove-technologie/kompetence/doc/css-layout' },
                { text: 'UI / UX', link: '/webove-technologie/kompetence/doc/ui-ux' },
                { text: 'Základy JS', link: '/webove-technologie/kompetence/doc/js-basics' },
                { text: 'Práce s DOMem', link: '/webove-technologie/kompetence/doc/js-dom' },
                { text: 'Složitější JS', link: '/webove-technologie/kompetence/doc/js-advanced' },
                { text: 'Příprava PHP Serveru', link: '/webove-technologie/kompetence/doc/php-server' }
              ]
            }
          ]
        }
      ],

      '/programovani/': [
        {
          text: 'Programování',
          items: [
            { text: 'Rozcestník', link: '/programovani/' },
            {
              text: 'Problém batohu',
              collapsed: false,
              items: [
                { text: 'Úvod', link: '/programovani/problem-batohu-techniky/' },
                { text: 'Hrubá síla (Brute Force)', link: '/programovani/problem-batohu-techniky/doc/brute-force-no-recursive' },
                { text: 'Hrubá síla (Rekurzivní)', link: '/programovani/problem-batohu-techniky/doc/brute-force-recursive' },
                { text: 'Genetický algoritmus', link: '/programovani/problem-batohu-techniky/doc/genetic' },
                { text: 'Heuristika (Poměr cena/výkon)', link: '/programovani/problem-batohu-techniky/doc/heuristic-ratio' },
                { text: 'Naivní hladový algoritmus', link: '/programovani/problem-batohu-techniky/doc/naive-greedy-algorithm' },
                { text: 'Náhodný výběr', link: '/programovani/problem-batohu-techniky/doc/random-shooting' }
              ]
            },
            { text: 'Pyramida porozumění', link: '/programovani/pyramida-porozumeni/' },
            { text: 'Task assignment', link: '/programovani/task/' },
            { text: 'Teorie grafů', link: '/programovani/teorie-grafu/' }
          ]
        }
      ],

      '/databaze/': [
        {
          text: 'Databáze',
          items: [
            { text: 'Rozcestník', link: '/databaze/' },
            {
              text: 'Teorie',
              collapsed: false,
              items: [
                { text: '1. Úvod do databází', link: '/databaze/doc/01-uvod-do-databazi' },
                { text: '2. SŘBD / DBMS', link: '/databaze/doc/02-dbms' },
                { text: '3. Konceptuální modelování', link: '/databaze/doc/03-konceptualni-modelovani' }
              ]
            },
            {
              text: 'Projekt Cinema',
              collapsed: false,
              items: [
                { text: 'O projektu', link: '/databaze/cinema/' },
                { text: 'Zadání', link: '/databaze/cinema/doc/zadani' },
                { text: 'Model databáze', link: '/databaze/cinema/doc/dictionary' }
              ]
            }
          ]
        }
      ],

      '/kriticke-mysleni/': [
        {
          text: 'Kritické myšlení',
          items: [
            { text: 'Základy kognitivního myšlení', link: '/kriticke-mysleni/doc/01-kognitivni' },
            { text: 'Anatomie spikleneckých teorií', link: '/kriticke-mysleni/doc/02-anatomie' },
            { text: 'Vyvrácení logiky (Ad hominem)', link: '/kriticke-mysleni/doc/03-ad-hominem' },
            { text: 'Falešný kompromis', link: '/kriticke-mysleni/doc/04-falesny-kompromis' },
            { text: 'Post hoc ergo propter', link: '/kriticke-mysleni/doc/05-post-hoc' },
            { text: 'Konfirmační zkreslení', link: '/kriticke-mysleni/doc/06-konfirmacni-zkresleni' },
            { text: 'Falešné dilema', link: '/kriticke-mysleni/doc/07-falesne-dilema' },
            { text: 'Šikmá plocha', link: '/kriticke-mysleni/doc/08-sikma-plocha' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bubilem/dev-zapisnik' }
    ]
  }
})
