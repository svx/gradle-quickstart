// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hello World',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'svx', // Usually your GitHub org/user name.
  projectName: 'gradle-quickstart', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve the docs at the site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        //blog: false {
          //showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //},
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [[require.resolve("docusaurus-lunr-search"), {
    enableHighlight: true
  }]],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Gradle Playground',
        logo: {
          alt: 'OCLD Logo',
          src: 'img/ocld-logo.png',
        },
        items: [
          //{
          //  type: 'docSidebar',
          //  sidebarId: 'tutorialSidebar',
          //  position: 'left',
          //  label: 'Tutorial',
          //},
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/svx/gradle-quickstart',
            //label: 'GitHub',
            position: 'right',
            className: 'header-github-link',
            "aria-label": "GitHub repository",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'User Manual',
                href: 'https://docs.gradle.org/current/userguide/userguide.html',
              },
              {
                label: 'DSL Reference',
                href: 'https://docs.gradle.org/current/dsl/',
              },
            ],
          },
          {
            title: 'Get Help',
            items: [
              {
                label: 'Forums',
                href: 'https://discuss.gradle.org/c/help-discuss',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/gradle/',
              },
              {
                label: 'Training',
                href: 'https://gradle.org/training/',
              },
            ],
          },
          {
            title: 'News',
            items: [
              {
                label: 'Blog',
                href: 'https://blog.gradle.org/',
              },
              {
                label: 'Newsletter',
                href: 'https://newsletter.gradle.org/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
