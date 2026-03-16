interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto mb-8 border border-nerv-mid-gray">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-nerv-dark-gray">
            <th
              className="text-left px-4 py-3 text-nerv-orange uppercase tracking-wider font-bold border-b border-nerv-mid-gray"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              Prop
            </th>
            <th
              className="text-left px-4 py-3 text-nerv-orange uppercase tracking-wider font-bold border-b border-nerv-mid-gray"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              Type
            </th>
            <th
              className="text-left px-4 py-3 text-nerv-orange uppercase tracking-wider font-bold border-b border-nerv-mid-gray"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              Default
            </th>
            <th
              className="text-left px-4 py-3 text-nerv-orange uppercase tracking-wider font-bold border-b border-nerv-mid-gray"
              style={{ fontFamily: "var(--font-nerv-display)" }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-nerv-mid-gray/40 hover:bg-nerv-dark-gray/50 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-nerv-cyan whitespace-nowrap">
                {prop.name}
                {prop.required && (
                  <span className="text-nerv-red ml-1">*</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-nerv-magenta whitespace-nowrap">
                {prop.type}
              </td>
              <td className="px-4 py-3 font-mono text-nerv-green">
                {prop.default || "—"}
              </td>
              <td
                className="px-4 py-3 text-nerv-white"
                style={{ fontFamily: "var(--font-nerv-body)" }}
              >
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
