import { useState } from "react";
import { X } from "lucide-react";

const Designs = () => {
  const designs = [
    "https://embed.figma.com/design/oIKdsVQ0LfFDY77bUvfmjC/PROJECT_DESGIN_MARK1?embed-host=share",
    "https://embed.figma.com/design/xC9oCxslWKUBKiZom2OsBG/NET_ANALYSIS_DASHBOARD?embed-host=share",
    "https://embed.figma.com/design/34h6urJBdokf9NNYMILHXZ/HIRO-UI-Design?embed-host=share",
  ];

  const [interactiveIndex, setInteractiveIndex] = useState(null);

  const toggleInteraction = (index) => {
    setInteractiveIndex(interactiveIndex === index ? null : index);
  };

  return (
    <div className="designs">
      <div className="header">
        <h1>UI/UX Designs</h1>
      </div>
      <div className="design-grid">
        {designs.map((design, index) => (
          <div key={index} className="iframe-container relative">
            <iframe
              src={design}
              allowFullScreen
              style={{
                pointerEvents: interactiveIndex === index ? "auto" : "none",
              }}
              className="w-full h-full border-0"
            />
            <button onClick={() => toggleInteraction(index)}>
              {interactiveIndex === index ? <X size={12} /> : "View Design"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Designs;
