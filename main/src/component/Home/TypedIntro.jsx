import Typewriter from "typewriter-effect";

function TypedIntro() {
  return (
    <Typewriter
      options={{
        strings: [
          "A Undergrad Data Scientist",
          "An AI/ML enthusiast",
          "Just another python programmer",
          "An open-source contributor",
          "My only hope is a pieace of Rope"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default TypedIntro;