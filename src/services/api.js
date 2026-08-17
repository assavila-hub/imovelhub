const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchProperties() {
  try {
    const res = await fetch(`${API_BASE_URL}/properties`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("Express API offline, falling back to local state", err);
    return null;
  }
}

export async function createProperty(propertyData) {
  try {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData)
    });
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error creating property via API:", err);
    return propertyData;
  }
}

export async function updateProperty(id, propertyData) {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData)
    });
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error updating property via API:", err);
    return propertyData;
  }
}

export async function deleteProperty(id) {
  try {
    await fetch(`${API_BASE_URL}/properties/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error("Error deleting property via API:", err);
  }
}

export async function fetchAddressByCep(cep) {
  try {
    const res = await fetch(`${API_BASE_URL}/cep/${cep}`);
    const json = await res.json();
    if (json.success) return json.data;
    return null;
  } catch (err) {
    console.error("Error fetching CEP:", err);
    return null;
  }
}

export async function fetchChatMessages(propertyId) {
  try {
    const res = await fetch(`${API_BASE_URL}/chats/${propertyId}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    return [];
  }
}

export async function sendChatMessage(propertyId, text, sender) {
  try {
    const res = await fetch(`${API_BASE_URL}/chats/${propertyId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sender })
    });
    const json = await res.json();
    return json.data;
  } catch (err) {
    return { id: `msg-${Date.now()}`, sender, text, time: 'Agora' };
  }
}

export async function processCheckoutPayment(propertyId, plan, method) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, plan, method })
    });
    const json = await res.json();
    return json.data;
  } catch (err) {
    return { success: true };
  }
}
