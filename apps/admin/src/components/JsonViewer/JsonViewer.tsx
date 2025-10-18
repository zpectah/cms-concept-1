import './index.scss';

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
interface JsonObject {
  [key: string]: JsonValue;
}

interface JsonViewerProps {
  data: JsonValue | unknown;
  level?: number;
  label?: string;
}

const JsonViewer = ({ data, level = 0, label }: JsonViewerProps) => {
  const indent = { marginLeft: `${level * 1.2}em` };

  if (!data) return;

  if (typeof data === 'string') {
    return (
      <div style={indent}>
        {label && <span className="key">"{label}"</span>}: <span className="string">"{data}"</span>
      </div>
    );
  }

  if (typeof data === 'number') {
    return (
      <div style={indent}>
        {label && <span className="key">"{label}"</span>}: <span className="number">{data}</span>
      </div>
    );
  }

  if (typeof data === 'boolean') {
    return (
      <div style={indent}>
        {label && <span className="key">"{label}"</span>}: <span className="boolean">{String(data)}</span>
      </div>
    );
  }

  if (data === null) {
    return (
      <div style={indent}>
        {label && <span className="key">"{label}"</span>}: <span className="null">null</span>
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <details open style={indent}>
        <summary>
          {label && <span className="key">"{label}"</span>}: <span className="brackets">[ ... ]</span>
        </summary>
        <div>
          {data.map((item, i) => (
            <JsonViewer key={i} data={item} level={level + 1} />
          ))}
        </div>
      </details>
    );
  }

  // Object
  return (
    <details open style={indent}>
      <summary>
        {label && <span className="key">"{label}"</span>}: <span className="braces">{`{ ... }`}</span>
      </summary>
      <div>
        {Object.entries(data).map(([key, value]) => (
          <JsonViewer key={key} data={value} label={key} level={level + 1} />
        ))}
      </div>
    </details>
  );
};

export default JsonViewer;
