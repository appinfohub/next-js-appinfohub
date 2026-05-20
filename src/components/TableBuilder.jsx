import React, { useState } from 'react';

const TableBuilder = ({ value = '', onChange }) => {
  // value is HTML string, parse to rows
  const defaultRows = [
    { key: 'Category', value: '' },
    { key: 'Latest Version', value: '' },
    { key: 'Publish Date', value: '' },
    { key: 'Developer', value: '' },
    { key: 'Security', value: '100% Safe' },
    { key: 'Price', value: 'Free' }
  ];
  const parseRows = val => {
    if (!val) return [...defaultRows];
    const doc = new DOMParser().parseFromString(val, 'text/html');
    const trs = Array.from(doc.querySelectorAll('tr'));
    return trs.map(tr => {
      const tds = tr.querySelectorAll('td');
      return { key: tds[0]?.innerText || '', value: tds[1]?.innerText || '' };
    });
  };
  const [rows, setRows] = useState(() => parseRows(value));

  // Sync rows with value prop when value changes
  React.useEffect(() => {
    setRows(parseRows(value));
  }, [value]);

  const handleRowChange = (idx, field, val) => {
    const updated = rows.map((row, i) => i === idx ? { ...row, [field]: val } : row);
    setRows(updated);
    emitChange(updated);
  };

  const addRow = () => {
    const updated = [...rows, { key: '', value: '' }];
    setRows(updated);
    emitChange(updated);
  };

  const removeRow = idx => {
    const updated = rows.filter((_, i) => i !== idx);
    setRows(updated);
    emitChange(updated);
  };

  const emitChange = (rows) => {
    // Convert to HTML table string
    const html = `<table>${rows.map(r => `<tr><td>${r.key}</td><td>${r.value}</td></tr>`).join('')}</table>`;
    onChange(html);
  };

  return (
    <div className="space-y-2">
      {rows.map((row, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            className="border px-2 py-1 rounded w-1/3"
            placeholder="Key"
            value={row.key}
            onChange={e => handleRowChange(idx, 'key', e.target.value)}
          />
          <input
            className="border px-2 py-1 rounded w-1/2"
            placeholder="Value"
            value={row.value}
            onChange={e => handleRowChange(idx, 'value', e.target.value)}
          />
          <button type="button" className="text-red-500" onClick={() => removeRow(idx)}>-</button>
        </div>
      ))}
      <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded" onClick={addRow}>Add Row</button>
    </div>
  );
};

export default TableBuilder;

