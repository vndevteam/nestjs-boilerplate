const en = {
  selectLanguageName: 'English',
  navbar: [
    {
      text: 'Home',
      link: '/',
    },
  ],
  sidebarDepth: 1,
  sidebar: [
    {
      text: 'Database',
      link: '/database.md',
    },
    {
      text: 'Convention',
      children: [
        '/conventions/base-coding-conventions.md',
        '/conventions/ts-coding-conventions.md',
        '/conventions/branch-conventions.md',
        '/conventions/code-formatter.md',
        '/conventions/commit-conventions.md',
      ],
    },
  ],
};

export { en };
