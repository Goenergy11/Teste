type Column<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
};

export function AdminTable<T extends { id: string }>({ columns, rows, emptyMessage }: { columns: Column<T>[]; rows: T[]; emptyMessage: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-ocean-100">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-ocean-50 text-ocean-900">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className="px-5 py-4 font-black">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-5 py-8 text-slate-500" colSpan={columns.length}>{emptyMessage}</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-ocean-50">
                  {columns.map((column) => (
                    <td key={column.header} className="px-5 py-4 text-slate-700">
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
