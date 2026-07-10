import { useEffect, useState } from 'react';

const codespace = import.meta.env.VITE_CODESPACE_NAME;
const endpoint = codespace
  ? `https://${codespace}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : (data.results ?? data.items ?? [])))
      .catch(() => setItems([]));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </section>
  );
}
