import GitHubCalendar from "react-github-calendar";
import { DiCode } from "react-icons/di";
import "./style.css";
const GithubActivity = () => {
  return (
    <div
      className="github-activity"
      style={{
        width: "70%",
        margin: "5% auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="heading">
        My <span style={{ color: "var(--btn_color)",margin:"0 1%" }}> Coding</span> Activity{" "}
        <DiCode id="icon" style={{ color: "var(--btn_color)" }} />
      </h1>
      <GitHubCalendar
        username="vivek09thakur"
        blockSize={15}
        blockMargin={5}
        color="#c084f5"
        fontSize={16}
      />
    </div>
  );
};

export default GithubActivity;
