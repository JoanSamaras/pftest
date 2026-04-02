const exportToExcel = (data: any[]) => {
  const rows = data.map((item) => ({
    Name: item.name,
    FilmCount: item.y,
    Films: item.films.join(' | '), // avoid commas breaking CSV
  }));

  // CSV header
  const headers = Object.keys(rows[0]).join(',');

  // CSV rows
  const csvContent = [
    headers,
    ...rows.map((row) =>
      Object.values(row)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`) // escape quotes
        .join(','),
    ),
  ].join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', 'characters_chart.xlsx');
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export { exportToExcel };
