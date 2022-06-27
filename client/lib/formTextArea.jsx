import React from "react";

export function FormTextArea({ label, value, setValue }) {
  return (
    <div>
      <div>
        <strong>{label}</strong>{" "}
      </div>
      <div>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}
