import { useState, useCallback } from "react";
import { LuMousePointer2 } from "react-icons/lu";
import { TbPencilMinus } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";

const Designs = () => {
  const designs = [
    "https://embed.figma.com/design/oIKdsVQ0LfFDY77bUvfmjC/PROJECT_DESGIN_MARK1?embed-host=share",
    "https://embed.figma.com/design/xC9oCxslWKUBKiZom2OsBG/NET_ANALYSIS_DASHBOARD?embed-host=share",
    "https://embed.figma.com/design/34h6urJBdokf9NNYMILHXZ/HIRO-UI-Design?embed-host=share",
  ];

  const [interactiveIndex, setInteractiveIndex] = useState(null);
  const [loading, setLoading] = useState(Array(designs.length).fill(true));

  const toggleInteraction = (index) => {
    setInteractiveIndex(interactiveIndex === index ? null : index);
  };

  const handleIframeLoad = useCallback((index) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  }, []);

  return (
    <div className="designs">
      <div className="header">
        <h1>UI/UX Designs <TbPencilMinus style={{marginBottom:'-5px'}}/></h1>
      </div>
      <div className="design-grid">
        {designs.map((design, index) => (
          <div key={index} className="iframe-container relative">
            {loading[index] && (
              <div
                style={{
                  height: "18rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Loading Design ..
              </div>
            )}
            <iframe
              src={design}
              allowFullScreen
              title={`Design ${index + 1}`}
              style={{
                pointerEvents: interactiveIndex === index ? "auto" : "none",
                display: loading[index] ? "none" : "block",
              }}
              onLoad={() => handleIframeLoad(index)}
            />
            <button onClick={() => toggleInteraction(index)}>
              {interactiveIndex === index ? (
                <AiOutlineClose size={15} />
              ) : (
                <>
                  Interact{" "}
                  <LuMousePointer2 size={15} style={{ marginBottom: "-3px" }} />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Designs;
