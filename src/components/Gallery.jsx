import "../styles/Gallery.css";

export default function Gallery() {
  return (
    <div className="gallery">
      <h2>Moments at Brew Haven</h2>
      <div className="grid">
        <img src="https://archello.s3.eu-central-1.amazonaws.com/images/2020/09/24/futuris-architects-rooby-fancy-cafe-bars-archello.1600934446.5584.jpg" />
        <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/80/2e/73/getlstd-property-photo.jpg?w=900&h=500&s=1" />
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_FZd5PMeFKBzvuGXnCUGpQoZvZtADxUfcqA0cP6ZdgrwNX5xbqJIAASJKfZQ3yAZFyKvCDPaROl9vs3FZwETv4gUdvIj9oDaTDRkBRC17oauyJSSoV211qma-nU5hGjrem3cj2sbnbMVuQEN4poMoZ6FI-C9bRubnL5fPmB6nT_SsyEi4NlIpMBtBtH-G/s2691/RedManCafeBestCafeTbilisi.jpg" />
        <img src="https://media-cdn.tripadvisor.com/media/photo-p/1b/39/f0/da/img-20200312-160001-largejpg.jpg" />
        <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/f8/41/76/brew.jpg?w=1100&h=-1&s=1" />
      </div>
      <button onClick={() => window.open("https://www.tripadvisor.com/Restaurant_Review-g293932-d21079177-Reviews-Brew-Yerevan.html", "_blank")}>See More</button>
    </div>
  );
}
