export const modelKeys = {
  articles: 'articles',
  attachments: 'attachments',
  categories: 'categories',
  comments: 'comments',
  members: 'members',
  menu: 'menu',
  menuItems: 'menuItems',
  messages: 'messages',
  pages: 'pages',
  tags: 'tags',
  translations: 'translations',
  users: 'users',
} as const;

export const modelKeysArray = [...Object.keys(modelKeys)] as [string, ...string[]];
