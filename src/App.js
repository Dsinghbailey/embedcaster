import "./App.css";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import githubLogo from "./githubLogo.png";

// Users paste a cast link from far caster and they get an embed of the cast
// Two divs to this page: Input-block and Embed-block
// Users enter link in Input-block and retrieve embed from Embed-block

// Time functions
const humanizeDuration = require("humanize-duration");
const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    },
  },
});

const scriptRider = `<script async src="https://embedcaster.xyz/EmbedCast.js" charset="utf-8"></script>`;

function App() {
  // Embed block variables
  const embedRef = useRef(null);
  const [embedVisible, setEmbedVisible] = useState(false);
  // Cast link
  const [castLink, setCastLink] = useState("");
  const [castData, setCastData] = useState(null);
  const [embeddedCastCode, setEmbeddedCastCode] = useState("");

  // make embed
  function makeEmbed() {
    const merkleRoot = castLink.split("/")[3];
    if (!merkleRoot) {
      toast.error("Cast not found.");
      return;
    }
    fetch("/searchcaster?merkle_root=" + merkleRoot, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((payload) => {
        if (
          payload.casts.filter((cast) => cast.merkleRoot === merkleRoot)
            .length === 0
        ) {
          throw new Error("empty");
        } else {
          setCastData(
            payload.casts.filter((cast) => cast.merkleRoot === merkleRoot)[0]
          );
          setEmbedVisible(true);
          embedRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cast not found.");
      });
  }
  // scroll to made embed
  useEffect(() => {
    if (embedVisible) {
      embedRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [embedVisible]);

  //Update embedded cast code
  useEffect(() => {
    if (!!castData && castData !== []) {
      const castTime = shortEnglishHumanizer(
        Date.now() - castData.body.publishedAt,
        { largest: 1 }
      ).replace(/\s/g, "");
      let tempCast = `<div class="embedded_cast">
<img class="embedded_cast__avatar" src=${castData.meta.avatar} alt='avatar'/>
<div class="embedded_cast__text" >
<div class="embedded_cast__top">
<div class="embedded_cast__h1">
${castData.meta.displayName}
</div>
<div class="embedded_cast__h2">
${" "}
@${castData.body.username} &bull; ${castTime}
</div>
</div>
<div class="embedded_cast__p">
${castData.body.data.text} 
</div>`;
      const tempCastEnd = `<a class="embedded_cast__link"
href=${castLink}
target="_blank"
rel="noopener noreferrer" >
Open in Farcaster
</a></div></div>`;

      if (!!castData.body.data.image) {
        tempCast =
          tempCast +
          `<img src="${castData.body.data.image}" class="embedded_cast__image" loading="lazy" alt="" />` +
          tempCastEnd;
      } else {
        tempCast = tempCast + tempCastEnd;
      }
      setEmbeddedCastCode(tempCast.replace(/\s\s+/g, ' ').replace(/(\r\n|\n|\r)/gm, ""));

    }
  }, [castData, castLink]);

  // Copy Embed code
  function copyEmbed() {
    navigator.clipboard.writeText(embeddedCastCode + scriptRider);
    toast.success("Code copied!");
  }

  return (
    <div className="App">
      <div>
        <Toaster />
      </div>
      <div className="App-content">
        <div className="App-header">
          <a
            href="https://github.com/Dsinghbailey/embedcaster"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="Github-link" src={githubLogo} alt="github" />
          </a>
        </div>
        <h1>
          {" "}
          Embed<span className="purple">caster</span>
        </h1>
        <div className="Input-block">
          <p>
            Embed any{" "}
            <a
              className="purple"
              href="https://farcaster.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Farcaster
            </a>{" "}
            cast.
          </p>
          <div className="Button-group">
            <input
              type="text"
              placeholder="Paste cast link"
              value={castLink}
              onChange={(event) => setCastLink(event.target.value)}
            />
            <button className="button" onClick={makeEmbed}>
              Make embed
            </button>
          </div>
          <p>
            Powered by{" "}
            <a
              className="purple"
              href="https://searchcaster.xyz/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              searchcaster
            </a>
            . Updates every 30 mins.{" "}
          </p>
        </div>
        <div
          className="Embed-block"
          ref={embedRef}
          style={{ display: `${embedVisible ? "block" : "none"}` }}
        >
          <p>
            {" "}
            Here's your embed code. Paste it into the html section of your site.
          </p>
          <div className="Center-div">
            <div className="Button-group" onClick={copyEmbed}>
              <button className="Code-box">{embeddedCastCode + scriptRider}</button>
              <button className="button">Copy code</button>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: embeddedCastCode }} />
        </div>
      </div>
    </div>
  );
}

export default App;
