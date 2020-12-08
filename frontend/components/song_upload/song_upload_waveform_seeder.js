// Seed waveforms
async drop(e) {
  e.persist();
  e.preventDefault();
  document.querySelector('.file-upload-overlay').style.display = 'none';

  const files = e.dataTransfer.files;
  console.log(files[0].type)
  if (!files || !files[0] || files.length > 1 ||  files[0].type !== 'audio/mpeg') {
    alert('Invalid file, please upload an audio file');
    return;
  }

  if (files[0].size > 6291456) {
    alert('File too large. Please upload a file less than 6MB');
    return;
  }

  let wavArr = [];
  let durArr = [];
  // let info = await [].map.call(files, async file => {
  //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
  //   const audioContext = new AudioContext();
  //   let data = await file.arrayBuffer()
  //     .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  //     .then(audioBuffer => {
  //       let waveform = this.drawWaveform(this.normalizeData(this.filterData(audioBuffer)));
  //       let duration = Math.trunc(audioBuffer.duration);
  //       wavStr = wavStr.concat("'")

  //       wavStr = wavStr.concat(`${waveform}`)
  //       durStr = durStr.concat(`${duration}`)

  //       wavStr = wavStr.concat("'")
  //       return {  };
  //     })
  //   })
  //   return { wavStr, durStr };
  let promises = [].map.call(files, async file => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let datum = await file.arrayBuffer()
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        let waveform = this.drawWaveform(this.normalizeData(this.filterData(audioBuffer)));
        let duration = Math.trunc(audioBuffer.duration);
        return { wavStr: `'${waveform}'`, durStr: `${duration}` };
      })
    return datum;
    })

  const data = await Promise.all(promises);
  data.forEach(d => {
    wavArr.push(d.wavStr);
    durArr.push(d.durStr);
  })
  let wavStr = wavArr.join(', ');
  wavStr = '[' + wavStr + ']';
  let durStr = durArr.join(', ');
  durStr = '[' + durStr + ']';
  // console.log(wavStr)
  // console.log(durStr)
}

filterData(audioBuffer) {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = 225; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }
  return filteredData;
};

normalizeData(filteredData) {
  const multiplier = Math.pow(Math.pow(Math.max(...filteredData), 2), -1);
  return filteredData.map(n => Math.pow(n, 2) * multiplier);
}

drawWaveform(data) {
  const canvas = document.createElement('canvas');
  canvas.width = '820';
  canvas.height = '90';
  const ctx = canvas.getContext('2d');
  ctx.translate(0, canvas.height / 2);
  let width = canvas.width / data.length;
  data.forEach((point, i) => {
    let height = point * canvas.height;
    let x = i * width;
    let y = height / -2;
    ctx.fillStyle = '#d3d3d3';
    ctx.fillRect(x, y, width, height);
  })
  return canvas.toDataURL();
}