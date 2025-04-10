"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const WordVoiceComponent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");

  useEffect(() => {
    if (!window || !window.speechSynthesis) return;
    const words = document.querySelectorAll(
      "ol > li > p > strong, ol > li > strong",
    );
    if (!words.length) return;

    words.forEach((word) => {
      const button = createButton();
      const empty = createEmptyElement();
      word.after(button);
      word.after(empty);
      word.after(document.createTextNode(""));
      button.addEventListener("click", () => {
        sayIt(word.textContent || "");
      });
    });

    return () => {
      words.forEach((word) => {
        word.removeEventListener("click", () => {});
        const button = word.nextElementSibling;
        if (button && button.tagName === "BUTTON") {
          button.removeEventListener("click", () => {});
          button.remove();
        }
      });
    };
  }, [pathname, queryPage]);

  return null;
};

const WordVoice = () => {
  return (
    <Suspense fallback={<div />}>
      <WordVoiceComponent />
    </Suspense>
  );
};

export default WordVoice;

const VOICE_SVG_HTML = `<svg height="18" width="18" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496.159 496.159" xml:space="preserve" fill="#38c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:transparent;" d="M496.159,248.085c0-137.023-111.07-248.082-248.076-248.082C111.071,0.003,0,111.063,0,248.085 c0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.159,385.086,496.159,248.085z"></path> <g> <path style="fill:--x-color-primary-800;" d="M247.711,125.252c-3.41-1.851-7.559-1.688-10.813,0.426l-95.137,61.789h-35.164 c-5.845,0-10.583,4.738-10.583,10.584v92.727c0,5.845,4.738,10.583,10.583,10.583h35.164l95.137,61.79 c1.748,1.135,3.753,1.707,5.765,1.707c1.733,0,3.471-0.425,5.049-1.281c3.41-1.852,5.534-5.421,5.534-9.301V134.553 C253.244,130.672,251.121,127.103,247.711,125.252z"></path> <path style="fill:--x-color-primary-800;" d="M282.701,319.271c0.894,0,1.801-0.162,2.685-0.504c24.239-9.412,40.524-38.49,40.524-72.359 c0-29.957-13.2-57.049-33.63-69.018c-3.534-2.072-8.08-0.885-10.153,2.65c-2.073,3.536-0.885,8.082,2.651,10.153 c15.971,9.358,26.291,31.424,26.291,56.214c0,27.359-12.77,51.424-31.055,58.525c-3.82,1.481-5.714,5.781-4.231,9.602 C276.924,317.474,279.729,319.271,282.701,319.271z"></path> <path style="fill:--x-color-primary-800;" d="M302.073,350.217c0.895,0,1.802-0.162,2.684-0.504c34.046-13.219,57.822-55.979,57.822-103.988 c0-43.187-18.884-82.156-48.11-99.279c-3.534-2.072-8.082-0.885-10.152,2.652c-2.073,3.535-0.885,8.081,2.651,10.152 c24.768,14.512,40.771,48.455,40.771,86.475c0,42.027-19.883,79.1-48.353,90.154c-3.82,1.481-5.715,5.781-4.231,9.602 C296.295,348.418,299.1,350.217,302.073,350.217z"></path> <path style="fill:--x-color-primary-800;" d="M322.025,379.715c-3.005,0-5.841-1.818-6.994-4.788c-1.499-3.861,0.416-8.206,4.277-9.706 c38.764-15.051,65.837-64.404,65.837-120.019c0-50.136-21.609-95.192-55.052-114.786c-3.574-2.094-4.773-6.688-2.68-10.262 c2.094-3.574,6.688-4.774,10.263-2.68c37.948,22.232,62.469,72.369,62.469,127.728c0,61.66-31.009,116.764-75.409,134.002 C323.846,379.551,322.928,379.715,322.025,379.715z"></path> </g> </g></svg>`;

const createEmptyElement = () => {
  const emptyElement = document.createElement("span");
  emptyElement.innerHTML = " ";
  emptyElement.style.cssText = `
    width: 0px;
    font-size: 0px;
 `;
  return emptyElement;
};

const createButton = () => {
  const button = document.createElement("button");
  button.innerHTML = VOICE_SVG_HTML;
  button.style.cssText = `
    margin-left: 1px;
    cursor: pointer;
    background: none;
    border: none;
    color: blue;
    font-size: 1em;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: sub;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    margin-right: 1px;
  `;
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#ccc";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "transparent";
  });
  return button;
};

const sayIt = (word: string) => {
  if (!window || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.voice =
    window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang === "en-US") || null;
  window.speechSynthesis.speak(utterance);
};
