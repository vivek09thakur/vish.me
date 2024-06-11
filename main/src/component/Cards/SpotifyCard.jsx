import "./Style.css";

const CurrentPlaying = () => {
  return (
    <div className="spotify-card">
        <h1 className="title">Vibe with me 🎶</h1>
      <a
        href="https://spotify-github-profile.vercel.app/api/view?uid=31cs6dk24ca5qvanpqmciwrqy6fy&redirect=true"
        target="_blank"
        rel="noreferrer"
      >
        <img src="https://spotify-github-profile.vercel.app/api/view?uid=31cs6dk24ca5qvanpqmciwrqy6fy&cover_image=true&theme=novatorem&show_offline=false&background_color=121212&interchange=false&bar_color=53b14f&bar_color_cover=false" />
      </a>
    </div>
  );
};

export default CurrentPlaying;
