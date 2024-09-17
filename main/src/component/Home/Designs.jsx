import "./Styles/About.css";

const Designs = () => {
  const designs = [
    "https://embed.figma.com/design/oIKdsVQ0LfFDY77bUvfmjC/PROJECT_DESGIN_MARK1?embed-host=share",
    "https://embed.figma.com/design/xC9oCxslWKUBKiZom2OsBG/NET_ANALYSIS_DASHBOARD?embed-host=share",
    "https://embed.figma.com/design/34h6urJBdokf9NNYMILHXZ/HIRO-UI-Design?embed-host=share",
  ];
  return (
    <>
      <div className="designs">
        <div className="header">
          <h1>UI/UX Designs</h1>
        </div>
        <div className="design-grid">
          {designs.map((design, index) => (
            <iframe
              key={index}
              src={design}
              allowFullScreen
              allow="transparency"
            ></iframe>
          ))}
        </div>
      </div>
    </>
  );
};

export default Designs;
