const waveforms = ["sine", "sawtooth", "square", "triangle"];

export const generators: { [type: string]: () => string } = {
  frequency: () => `${Math.round(Math.random() * 20000 + 20)}Hz`,

  waveform: () => waveforms[Math.floor(Math.random() * waveforms.length)],

  shortinterval: () => 0.01 * Math.round(100 * Math.random() * 5) + "s",

  midinote: () => {
    return String(Math.floor(17 + Math.random() * 91));
  },
};
