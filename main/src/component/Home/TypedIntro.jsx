import Typewriter from "typewriter-effect";

function TypedIntro() {
  return (
    <Typewriter
      options={{
        strings: [
          "A Undergrad Data Scientist",
          "An AI/ML enthusiast",
          "Just another Python Programmer",
          "An Open-Source Contributor",
          "My Only Hope is a pieace of Rope"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 10,
      }}
    />
  );
}

export default TypedIntro;