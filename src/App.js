import "./App.css";
import {useEffect, useRef, useState} from 'react';

function App() {
  const dummyCastLink = "farcaster://casts/0x1a20b19094e257fb1536fe7f3a4785fe9e603a8e7159fccee1ab80760df6fdac/0x1a20b19094e257fb1536fe7f3a4785fe9e603a8e7159fccee1ab80760df6fdac"
  const dummyCast = {
    body: {
      type: "text-short",
      publishedAt: 1668227041241,
      sequence: 1793,
      username: "greg",
      address: "0xB4F195e9A982C2bA58988Cb2132557378e9E6b08",
      data: {
        text: "@bot imagine a movie about the temporary troubles of the cryptocurrency industry following a large financial loss due to mismanaged customers funds by a poofy haired man and his friends, who lived together in a big mansion",
        replyParentMerkleRoot:
          "0xe32f750e297292d182aeae8c8993dd981d0ba9667f041f4096b07c6650705461",
      },
      prevMerkleRoot:
        "0x0f31ec7d29e33768d6ab674eb42ce132952a37e4cfdf6b5f4ad03ad26b4b019f",
    },
    merkleRoot:
      "0x1a20b19094e257fb1536fe7f3a4785fe9e603a8e7159fccee1ab80760df6fdac",
    signature:
      "0xf08606ad41efea5b6b6363daed598f95107b4227571645a909a0f3610e18189254d95a11e44513ac60374e7dd38520e62197f112d87b915e0fefa5f733c9ca9d1b",
    meta: {
      displayName: "Greg Skriloff",
      avatar:
        "https://lh3.googleusercontent.com/CKgGLmvTkGzqcy197wRj2deQYZAwO1HVb0gGpq5UVDLjqlA4-zSlI8L8OrNLAm_eWWY4I6HVivqJb6Y2iBi8t6if27zead_JDaHNRQ",
      isVerifiedAvatar: true,
      numReplyChildren: 1,
      reactions: {
        count: 1,
        type: "Like",
        self: false,
      },
      recasts: {
        count: 0,
        self: false,
      },
      watches: {
        count: 0,
        self: false,
      },
      mentions: [
        {
          address: "0x2762037d1334076bAfe032BA5Fded1F264aC9Cde",
          username: "bot",
        },
      ],
      replyParentUsername: {
        address: "0xF8381127C3BeC4162F7FCeaF13709C249B8B87E2",
        username: "gabrielayuso",
      },
    },
    attachments: {
      openGraph: [],
    },
  };
  const dummyCode = `<div>somecode here</div>`;
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
  
  const dummyTime = shortEnglishHumanizer(Date.now() - dummyCast.body.publishedAt, { largest: 1 }).replace(/\s/g, '');

  const embedRef = useRef(null);
  const [embedVisible, setEmbedVisible] = useState(false)
  // make embed
  function makeEmbed(){
    setEmbedVisible(true);
  }
  // scroll to made embed
  useEffect(()=>{
    if (embedVisible){
      embedRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  },[embedVisible])
  return (
    <div className="App">
      <div className="App-content">
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
            cast
          </p>
          <div className="Button-group">
            <input type="text" placeholder="Paste cast link" />
            <button className="button" onClick={makeEmbed}>Make embed</button>
          </div>
        </div>
        <div className="Embed-block" ref={embedRef} style={{ display: `${embedVisible ? 'block': 'none'}` }}>
          <p> Here's your embed code</p>
          <div className="Center-div">
            <div className="Button-group">
              <div className="Code-box">{dummyCode}</div>
              <button className="button">Copy code</button>
            </div>
          </div>
          <div className="embedded_cast">
            <img className="embedded_cast__avatar" src={dummyCast.meta.avatar} alt='avatar'/>
            <div className="embedded_cast__text" >
            <div className="embedded_cast__top">
              <div className="embedded_cast__h1">
                {dummyCast.meta.displayName}
              </div>
              <div className="embedded_cast__h2">
                {" "}
                @{dummyCast.body.username} &bull; {dummyTime}
              </div>
            </div>
            <div className="embedded_cast__p">
            {dummyCast.body.data.text} 
            </div> 
              <a className="embedded_cast__link"
                href={dummyCastLink}
                target="_blank"
                rel="noopener noreferrer" >
                Open in Farcaster
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
