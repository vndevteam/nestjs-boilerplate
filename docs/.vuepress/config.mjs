import { viteBundler } from '@vuepress/bundler-vite';
import { defaultTheme } from '@vuepress/theme-default';
import { searchPlugin } from '@vuepress/plugin-search';
import { defineUserConfig } from 'vuepress';

export default defineUserConfig({
  lang: 'en-US',
  title: 'NestJS boilerplate',
  description: 'NestJS boilerplate',
  base: '/nestjs-boilerplate/',
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: [
      {
        text: 'Database',
        link: '/database.md',
      },
      {
        text: 'Convention',
        children: [
          '/docs/conventions/base-coding-conventions.md',
          '/docs/conventions/ts-coding-conventions.md',
          '/docs/conventions/branch-conventions.md',
          '/docs/conventions/code-formatter.md',
          '/docs/conventions/commit-conventions.md',
        ],
      },
    ],
  }),
  plugins: [
    searchPlugin({
      maxSuggestions: 15,
      hotKeys: ['s', '/'],
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
    }),
  ],
});
