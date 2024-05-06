require("./style.css");

const authors = [
  { name: "Krish Renjen", gitHub: "https://github.com/krishrenjen" },
  { name: "Vignesh Saravanakumar", gitHub: "https://github.com/vigneshsaravanakumar404" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="authors">
        {authors.map(({ name, gitHub }) => (
          <div key={name}>
            <a href={gitHub} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </div>
        ))}
      </div>
    </footer>
  );
}
