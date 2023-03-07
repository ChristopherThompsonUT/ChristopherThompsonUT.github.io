const githubRepoUrl = 'https://api.github.com/repos/ChristopherThompsonUT/site-images/contents';
const rawContentUrls = [];

async function getRawContentUrls() {
  const response = await fetch(githubRepoUrl);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    const fileUrl = data[i].download_url;
    if (fileUrl.endsWith('.png')) { // Change this to match your file extension
      rawContentUrls.push(fileUrl);
    }
  }
}

getRawContentUrls();

function selectRawContentUrl() {
  const now = new Date();
  const minute = now.getMinutes();
  const fiveMinuteChunk = Math.floor(minute / 5);
  const index = fiveMinuteChunk % rawContentUrls.length;
  return rawContentUrls[index];
}

async function changeBackground() {
  const jumbotron = document.querySelector('.jumbotron');
  const imageUrl = await selectRawContentUrl();
  jumbotron.style.backgroundImage = `url(${imageUrl})`;

  document.getElementById("image_link").href = imageUrl;
}


getRawContentUrls().then(() => {
  changeBackground();
});