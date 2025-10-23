import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { providerConfigService } from '../api/services';
import Navbar from '../components/Navbar';

function Settings() {
  const [configs, setConfigs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    provider: '',
    model: '',
    api_key: '',
    settings: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const response = await providerConfigService.getAll();
      setConfigs(response.data);
    } catch (error) {
      console.error('Failed to load configs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await providerConfigService.create(
        formData.provider,
        formData.model,
        formData.api_key,
        formData.settings
      );
      setFormData({ provider: '', model: '', api_key: '', settings: {} });
      setShowForm(false);
      loadConfigs();
    } catch (error) {
      console.error('Failed to save config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      try {
        await providerConfigService.delete(id);
        loadConfigs();
      } catch (error) {
        console.error('Failed to delete config:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">AI Provider Settings</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {showForm ? 'Cancel' : 'Add Provider'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Provider</label>
                  <select
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Provider</option>
                    <option value="openai">OpenAI</option>
                    <option value="azure">Azure OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="ollama">Ollama</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Model</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., gpt-4, claude-3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">API Key</label>
                  <input
                    type="password"
                    value={formData.api_key}
                    onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your API key"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Configuration'}
              </button>
            </form>
          )}

          <div className="space-y-4">
            {configs.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No provider configurations yet.</p>
            ) : (
              configs.map((config) => (
                <div key={config.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{config.provider.toUpperCase()}</h3>
                    {config.model && <p className="text-gray-600">Model: {config.model}</p>}
                  </div>
                  <button
                    onClick={() => handleDelete(config.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

