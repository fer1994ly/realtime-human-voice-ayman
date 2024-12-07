class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.isRecording = true;
  }

  process(inputs, outputs) {
    // Get the first input
    const input = inputs[0];
    const output = outputs[0];

    // If there's no input, keep the processor alive and wait
    if (!input || !input.length) return true;

    // Process each channel
    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      // Copy input to output (pass-through)
      for (let i = 0; i < inputChannel.length; i++) {
        outputChannel[i] = inputChannel[i];
      }
    }

    // Keep the processor alive
    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor); 