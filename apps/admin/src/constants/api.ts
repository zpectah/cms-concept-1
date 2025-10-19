export const API_URL_BASE = import.meta.env.VITE_API_URL;

export const API_URL = {
  articles: `${API_URL_BASE}private/articles`,
  attachments: `${API_URL_BASE}private/attachments`,
  blacklist: `${API_URL_BASE}private/blacklist`,
  categories: `${API_URL_BASE}private/categories`,
  comments: `${API_URL_BASE}private/comments`,
  maintenance: `${API_URL_BASE}private/maintenance`,
  members: `${API_URL_BASE}private/members`,
  menu: `${API_URL_BASE}private/menu`,
  menuItems: `${API_URL_BASE}private/menuitems`,
  messages: `${API_URL_BASE}private/messages`,
  pages: `${API_URL_BASE}private/pages`,
  requests: `${API_URL_BASE}private/requests`,
  settings: `${API_URL_BASE}private/settings`,
  tags: `${API_URL_BASE}private/tags`,
  translations: `${API_URL_BASE}private/translations`,
  users: `${API_URL_BASE}private/users`,
};

export const API_KEYS = {
  articles: 'articles',
  attachments: 'attachments',
  blacklist: 'blacklist',
  categories: 'categories',
  comments: 'comments',
  maintenance: 'maintenance',
  members: 'members',
  menu: 'menu',
  menuItems: 'menuitems',
  messages: 'messages',
  pages: 'pages',
  requests: 'requests',
  settings: 'settings',
  tags: 'tags',
  translations: 'translations',
  users: 'users',
};
