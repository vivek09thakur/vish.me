const CurrentPlaying = () => {
  return (
    <div>
        <h1 className="max-[680px]:text-[1rem]">Vibe with me 🎶</h1>
      <a
        href="https://spotify-github-profile.vercel.app/api/view?uid=31cs6dk24ca5qvanpqmciwrqy6fy&redirect=true"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="max-[680px]:w-[80%] max-[680px]:max-w-none max-[680px]:h-auto"
          src="https://spotify-github-profile.vercel.app/api/view?uid=31cs6dk24ca5qvanpqmciwrqy6fy&cover_image=true&theme=novatorem&show_offline=false&background_color=121212&interchange=false&bar_color=53b14f&bar_color_cover=false"
        />
      </a>
    </div>
  );
};

export default CurrentPlaying;
