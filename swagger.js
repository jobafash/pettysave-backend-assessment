export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Pettysave Task API',
    description: 'Express Task API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: 'localhost:5000',
  basePath: '/',
  tags: [
    {
      name: 'Users',
      description: 'API tag for users in the system',
    },
    {
      name: 'Tasks',
      description: 'API tag for tasks in the system',
    },
  ],
  schemes: [
    'http',
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  paths: {
    '/api/users': {
      post: {
        tags: [
          'Users',
        ],
        description: 'Create new user in system',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to create',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'A new user is created',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
    '/api/users/login': {
      post: {
        tags: [
          'Users',
        ],
        description: 'Sign user into API',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to create',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'User is signed in',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
    '/api/users/': {
      get: {
        tags: [
          'Users',
        ],
        summary: 'Get all users in API',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Users',
            },
          },
        },
      },
    },
    '/api/users/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of user that we want to find/update',
          type: 'uuid',
        },
      ],
      delete: {
        summary: 'Delete user with given ID',
        tags: [
          'Users',
        ],
        responses: {
          200: {
            description: 'User is deleted',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      put: {
        summary: 'Update user with given ID',
        tags: [
          'Users',
        ],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User with new values of properties',
            schema: {
              $ref: '#/definitions/updateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'User is updated',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
    '/api/tasks': {
      post: {
        tags: [
          'Tasks',
        ],
        description: 'Create new task in API',
        parameters: [
          {
            title: 'user',
            in: 'body',
            description: 'Task that we want to create',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'A new task is created',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
    },
    '/api/tasks/': {
      get: {
        tags: [
          'Tasks',
        ],
        summary: 'Get all tasks in API',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
    },
    '/api/tasks/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of task that we want to find/update',
          type: 'uuid',
        },
      ],
      delete: {
        summary: 'Delete task with given ID',
        tags: [
          'Tasks',
        ],
        responses: {
          200: {
            description: 'Task is deleted',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      put: {
        summary: 'Update task with given ID',
        tags: [
          'Tasks',
        ],
        parameters: [
          {
            name: 'task',
            in: 'body',
            description: 'Task with new values of properties',
            schema: {
              $ref: '#/definitions/updateTask',
            },
          },
        ],
        responses: {
          200: {
            description: 'Task is updated',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: [
        'name',
        '_id',
        'email',
      ],
      properties: {
        _id: {
          type: 'uuid',
          uniqueItems: true,
        },
        isAdmin: {
          type: 'boolean',
          default: false,
        },
        first_name: {
          type: 'string',
        },
        last_name: {
          type: 'string',
        },
        email: {
          type: 'string',
          unique: true,
        },
        password: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
      },
    },
    updateUser: {
      required: [
        'email',
        'name',
      ],
      properties: {
        isAdmin: {
          type: 'boolean',
        },
        name: {
          type: 'string',
        },
      },

    },
    Task: {
      required: [
        'title',
        'description',
        'status',
      ],
      properties: {
        _id: {
          type: 'uuid',
          uniqueItems: true,
        },
        status: {
          type: 'string',
          default: 'pending',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
    updateTask: {
      required: [
        'title',
        'status',
        'description',
      ],
      properties: {
        status: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },

    },
  },
  Users: {
    type: 'array',
    $ref: '#/definitions/User',
  },
  Tasks: {
    type: 'array',
    $ref: '#/definitions/Task',
  },

};
