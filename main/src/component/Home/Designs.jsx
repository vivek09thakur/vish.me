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
    <div className="w-[98%] h-full ml-[2%] mt-[5%] max-[680px]:mt-[15%]">
      <div className="overflow-y-hidden my-[2%] mx-auto">
        <h1 className="font-medium">UI/UX Designs <TbPencilMinus style={{marginBottom:'-5px'}}/></h1>
      </div>
      <div className="w-[80%] flex flex-wrap justify-evenly mx-auto max-[680px]:w-full max-[680px]:flex-col">
        {designs.map((design, index) => (
          <div
            key={index}
            className="w-[48%] h-full min-h-[20rem] mb-[5%] opacity-70 text-center relative max-[680px]:w-full max-[680px]:my-[2%] max-[680px]:mx-auto"
          >
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
              className="w-full h-full min-h-[18rem] border-none rounded-[.3rem] opacity-80 max-[680px]:w-[90%] max-[680px]:my-[2%] max-[680px]:mx-auto"
              style={{
                pointerEvents: interactiveIndex === index ? "auto" : "none",
                display: loading[index] ? "none" : "block",
              }}
              onLoad={() => handleIframeLoad(index)}
            />
            <button
              onClick={() => toggleInteraction(index)}
              className="w-[30%] mx-auto p-2 border-none rounded-[.2rem] bg-btn font-poppins mt-[3%] max-[680px]:w-[50%]"
            >
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
