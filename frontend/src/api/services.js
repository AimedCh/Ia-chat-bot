import client from './client';

// Auth Services
export const authService = {
  register: (name, email, password) =>
    client.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    client.post('/auth/login', { email, password }),
  logout: () =>
    client.post('/auth/logout'),
};

// Conversation Services
export const conversationService = {
  getAll: () =>
    client.get('/conversations'),
  create: (title, metadata) =>
    client.post('/conversations', { title, metadata }),
  get: (id) =>
    client.get(`/conversations/${id}`),
  update: (id, data) =>
    client.patch(`/conversations/${id}`, data),
  delete: (id) =>
    client.delete(`/conversations/${id}`),
};

// Message Services
export const messageService = {
  getAll: (conversationId) =>
    client.get(`/conversations/${conversationId}/messages`),
  create: (conversationId, role, content, usage, status) =>
    client.post(`/conversations/${conversationId}/messages`, {
      role,
      content,
      usage,
      status,
    }),
  get: (conversationId, messageId) =>
    client.get(`/conversations/${conversationId}/messages/${messageId}`),
  update: (conversationId, messageId, data) =>
    client.patch(`/conversations/${conversationId}/messages/${messageId}`, data),
  delete: (conversationId, messageId) =>
    client.delete(`/conversations/${conversationId}/messages/${messageId}`),
};

// Provider Config Services
export const providerConfigService = {
  getAll: () =>
    client.get('/provider-configs'),
  create: (provider, model, api_key, settings) =>
    client.post('/provider-configs', { provider, model, api_key, settings }),
  get: (id) =>
    client.get(`/provider-configs/${id}`),
  update: (id, data) =>
    client.patch(`/provider-configs/${id}`, data),
  delete: (id) =>
    client.delete(`/provider-configs/${id}`),
};

