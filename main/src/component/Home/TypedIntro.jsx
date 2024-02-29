import Typewriter from "typewriter-effect";

function TypedIntro() {
  return (
    <Typewriter
      options={{
        strings: [
          "an Undergrad Data Scientist",
          "an AI/ML enthusiast",
          "Just another python programmer",
          "an Open-source contributor",
          "My only hope is a pieace of Rope",
          "an Internal Pointer Variable",
          "a Story Teller",
          "Gotta catch em' all",
          "a Noobie Sketch-Artist",
          "a guy who loves to shoot pictures not people"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default TypedIntro;