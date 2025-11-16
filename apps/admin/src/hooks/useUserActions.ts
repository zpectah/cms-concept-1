import { useMemo } from 'react';
import { deepMerge, usersAccessKeys } from '@common';
import { useUserQuery } from '../hooks-query';

export const useUserActions = () => {
  const { userQuery } = useUserQuery();

  const { data } = userQuery;

  const user = data?.user;

  const baseActions = {
    articles: {
      view: false,
      create: false,
      modify: false,
      delete: false,
      approve: false,
      selfApprove: false,
    },
    attachments: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    categories: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    comments: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    members: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    menu: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    menuItems: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    messages: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    pages: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    profile: {
      view: false,
      modify: false,
    },
    settings: {
      view: false,
      global: {
        view: false,
        modify: false,
      },
      client: {
        view: false,
        modify: false,
      },
      languages: {
        view: false,
        modify: false,
      },
      blacklist: {
        view: false,
        modify: false,
      },
      maintenance: {
        view: false,
        modify: false,
      },
    },
    tags: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    translations: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
    users: {
      view: false,
      create: false,
      modify: false,
      delete: false,
    },
  };

  const actions = useMemo(() => {
    const level = user?.access_rights ?? 0;

    switch (level) {
      case usersAccessKeys.admin:
        return deepMerge(baseActions, {
          articles: {
            view: true,
            create: true,
            modify: true,
            delete: true,
            approve: true,
            selfApprove: true,
          },
          attachments: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          categories: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          comments: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          members: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          menu: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          menuItems: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          messages: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          profile: {
            view: true,
            modify: true,
          },
          pages: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          settings: {
            view: true,
            global: {
              view: true,
              modify: true,
            },
            client: {
              view: true,
              modify: true,
            },
            languages: {
              view: true,
              modify: true,
            },
            blacklist: {
              view: true,
              modify: true,
            },
            maintenance: {
              view: true,
              modify: true,
            },
          },
          tags: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          translations: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          users: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
        });

      case usersAccessKeys.chiefRedactor:
        return deepMerge(baseActions, {
          articles: {
            view: true,
            create: true,
            modify: true,
            delete: true,
            approve: true,
            selfApprove: true,
          },
          attachments: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          categories: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          comments: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          members: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          menu: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          menuItems: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          messages: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          profile: {
            view: true,
            modify: true,
          },
          pages: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          settings: {
            view: true,
            global: {
              view: true,
              modify: true,
            },
            client: {
              view: true,
              modify: true,
            },
          },
          tags: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          translations: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          users: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
        });

      case usersAccessKeys.redactor:
        return deepMerge(baseActions, {
          articles: {
            view: true,
            create: true,
            modify: true,
          },
          comments: {
            view: true,
            create: true,
            modify: true,
            delete: true,
          },
          tags: {
            view: true,
            create: true,
            modify: true,
            delete: false,
          },
          profile: {
            view: true,
            modify: true,
          },
        });

      case usersAccessKeys.none:
        return deepMerge(baseActions, {
          profile: {
            view: true,
            modify: true,
          },
        });

      default:
        return deepMerge(baseActions, {});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    ...actions,
  };
};
