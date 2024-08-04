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
      text: 'Setup & Development',
      link: '/development.md',
    },
    {
      text: 'Technologies',
      link: '/technologies.md',
    },
    {
      text: 'Architecture',
      link: '/architecture.md',
    },
    {
      text: 'API',
      link: '/api.md',
    },
    {
      text: 'Database',
      link: '/database.md',
    },
    {
      text: 'Security',
      link: '/security.md',
    },
    {
      text: 'Testing',
      link: '/testing.md',
    },
    {
      text: 'Benchmarking',
      link: '/benchmarking.md',
    },
    {
      text: 'Deployment',
      link: '/deployment.md',
    },
    {
      text: 'Troubleshooting',
      link: '/troubleshooting.md',
    },
    {
      text: 'FAQ',
      link: '/faq.md',
    },
    {
      text: 'Convention',
      children: [
        '/conventions/naming-cheatsheet.md',
        '/conventions/styleguide.md',
        '/conventions/clean-code-typescript.md',
        '/conventions/branch-conventions.md',
        '/conventions/commit-conventions.md',
        '/conventions/linting-and-formatting.md',
      ],
    },
  ],
};

export { en };
