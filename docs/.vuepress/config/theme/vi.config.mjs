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
        '/conventions/naming-cheatsheet.md',
        '/conventions/styleguide.md',
        '/vi/conventions/clean-code-typescript.md',
        '/vi/conventions/branch-conventions.md',
        '/conventions/commit-conventions.md',
        '/conventions/linting.md',
      ],
    },
  ],
};

export { vi };
