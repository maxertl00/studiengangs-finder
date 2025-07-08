// 📄 pages/index.js
import { useState } from 'react';

export default function Home() {
  const [university, setUniversity] = useState('');
  const [level, setLevel] = useState('Bachelor');
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    setPrograms([]);
    try {
      const res = await fetch('/api/studiengaenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ university, level })
      });
      const data = await res.json();
      setPrograms(data.programs);
    } catch (err) {
      console.error('Fehler:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Studiengangs-Finder</h1>
      <input
        type="text"
        placeholder="Heimatuniversität"
        value={university}
        onChange={e => setUniversity(e.target.value)}
      />
      <select value={level} onChange={e => setLevel(e.target.value)}>
        <option>Bachelor</option>
        <option>Master</option>
      </select>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Lädt...' : 'Programme suchen'}
      </button>

      {programs.length > 0 && (
        <ul>
          {programs.map((prog, i) => (
            <li key={i}>{prog}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
Create index.js with homepage UI and search functionality
