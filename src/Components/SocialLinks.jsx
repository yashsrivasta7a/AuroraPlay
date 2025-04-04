import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-6 bg-transparent ">
      <a
        href="https://github.com/yashsrivasta7a"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-[#6f52a9] transition duration-300 text-2xl"
      >
        <FaGithub />
      </a>
      <a
        href="https://twitter.com/yashsrivasta7a"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-[#6f52a9] transition duration-300 text-2xl"
      >
        <FaTwitter />
      </a>
      <a
        href="https://linkedin.com/in/yashsrivasta7a"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-[#6f52a9] transition duration-300 text-2xl"
      >
        <FaLinkedin />
      </a>
    </div>
  );
};

export default SocialLinks;
