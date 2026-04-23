import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export async function createPullRequest({
  token,
  owner,
  repo,
  branch,
  title,
  content
}: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  title: string;
  content: string;
}) {
  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json'
  };

  // 1. Get default branch
  const repoData = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}`, { headers });
  const base = repoData.data.default_branch;

  // 2. Get latest commit SHA
  const refData = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/git/ref/heads/${base}`, { headers });
  const sha = refData.data.object.sha;

  // 3. Create new branch
  await axios.post(`${GITHUB_API}/repos/${owner}/${repo}/git/refs`, {
    ref: `refs/heads/${branch}`,
    sha
  }, { headers });

  // 4. Check if file exists
  let existingSha: string | undefined;
  try {
    const fileData = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/contents/generated.txt`, {
      headers,
      params: { ref: branch }
    });
    existingSha = fileData.data.sha;
  } catch (err: any) {
    // file doesn't exist, ignore
  }

  // 5. Create or update file
  await axios.put(`${GITHUB_API}/repos/${owner}/${repo}/contents/generated.txt`, {
    message: 'Add generated file',
    content: Buffer.from(content).toString('base64'),
    branch,
    ...(existingSha ? { sha: existingSha } : {})
  }, { headers });

  // 6. Create PR
  const pr = await axios.post(`${GITHUB_API}/repos/${owner}/${repo}/pulls`, {
    title,
    head: branch,
    base
  }, { headers });

  return pr.data.html_url;
}
