import './css/ToGitHub.scss';
import Github from './github-32.png';

function ToGitHub() {
  return (
    <div className="ToGitHub">
      <span className="Disclaimer"></span>
      <br />

      <a
        href="https://github.com/palvarezimaz/chatapp-client"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Github} alt="github"></img>
      </a>
    </div>
  );
}

export default ToGitHub;
