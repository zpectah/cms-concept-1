export const API_URL_BASE = import.meta.env.VITE_API_URL;

export const API_URL = {
  settings: `${API_URL_BASE}private/settings`,
  articles: `${API_URL_BASE}private/articles`,
  attachments: `${API_URL_BASE}private/attachments`,
  categories: `${API_URL_BASE}private/categories`,
  comments: `${API_URL_BASE}private/comments`,
  members: `${API_URL_BASE}private/members`,
  menu: `${API_URL_BASE}private/menu`,
  menuItems: `${API_URL_BASE}private/menuitems`,
  messages: `${API_URL_BASE}private/messages`,
  pages: `${API_URL_BASE}private/pages`,
  tags: `${API_URL_BASE}private/tags`,
  translations: `${API_URL_BASE}private/translations`,
  users: `${API_URL_BASE}private/users`,
  blacklist: `${API_URL_BASE}private/blacklist`,
  requests: `${API_URL_BASE}private/requests`,
};

export const API_KEYS = {
  settings: 'settings',
  articles: 'articles',
  attachments: 'attachments',
  categories: 'categories',
  comments: 'comments',
  members: 'members',
  menu: 'menu',
  menuItems: 'menuitems',
  messages: 'messages',
  pages: 'pages',
  tags: 'tags',
  translations: 'translations',
  users: 'users',
  blacklist: 'blacklist',
  requests: 'requests',
};
