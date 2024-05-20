const authors = [
  { name: "Krish Renjen", gitHub: "https://github.com/krishrenjen" },
  { name: "Vignesh Saravanakumar", gitHub: "https://github.com/vigneshsaravanakumar404" },
];

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 text-center space-x-5">
      {authors.map((author) => (
        <a className="align-middle" href={author.gitHub} key={author.name}>
          {author.name}
        </a>
      ))}
    </footer>
  );
}
