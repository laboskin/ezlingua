const speak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    utterance.pitch = 1;
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
}

export default speak;