export default function fetchOnClick() {
  photo = "/image-not-found.png";
  fetch("http://localhost:3000/headlines")
    .then((res) => res.json())
    .then((headlines) => {
      setheadlines(headlines);
      console.log(headlines);
      setLoading(false);
    });
  if (headlines[0].photo_source_url != null) {
    photo = headlines[0].photo_source_url;
    if (headlines[0].photo_source_url.slice(0, 1) != "h") {
      photo = "https://" + headlines[0].photo_source_url;
    }
  }
}
