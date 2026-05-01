export function HeroVideo() {
  return (
    <iframe
      className="absolute top-0 left-0 w-full h-full scale-110"
      src="https://www.youtube.com/embed/YGcczHq0Nmk?autoplay=1&mute=1&loop=1&playlist=YGcczHq0Nmk&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
      title="KMC Lalitpur Campus"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ zIndex: 0, border: "none" }}
    />
  );
}
