const vi = {
  selectLanguageText: 'Ngôn ngữ',
  selectLanguageName: 'Tiếng Việt',
  navbar: [
    {
      text: 'Trang chủ',
      link: '/',
    },
  ],
  sidebarDepth: 1,
  sidebar: [
    {
      text: 'Cơ sở dữ liệu',
      link: '/database.md',
    },
    {
      text: 'Quy ước',
      children: [
        '/conventions/base-coding-conventions.md',
        '/conventions/ts-coding-conventions.md',
        '/vi/conventions/branch-conventions.md',
        '/conventions/code-formatter.md',
        '/conventions/commit-conventions.md',
      ],
    },
  ],
};

export { vi };
