module.exports = {
  base: '/cpic-collection/',
  title: 'CPIC Collection',
  themeConfig: {
    repo: 'kgrid-objects/cpic-collection',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'KGrid.org', link: 'https://kgrid.org' },
      { text: 'Overview', link: '/' },
      { text: 'Instructions', link: '/deployment/' },
      { text: 'CPIC Demo', link: 'https://demo.kgrid.org/cpic-demo'},
      { text: 'Online Demo', link: 'https://demo.kgrid.org/cpic-demo/web' }
    ],
    search: true,
    searchMaxSuggestions: 10,
    sidebar: 'auto',
    displayAllHeaders: true
  }
}
