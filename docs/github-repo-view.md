## Implementation plan: real GitHub repo viewer inside portfolio

### 1. Store project repo config

For each project, store only this:

```ts
{
  slug: "pazman",
  name: "Pazman",
  owner: "your-github-username",
  repo: "pazman",
  branch: "main",
  defaultFile: "README.md"
}
```

Same for `townbase`.

---

## 2. API calls needed

### A. Get repo metadata

Use this for title, description, stars, forks, default branch, last updated.

```txt
GET https://api.github.com/repos/{owner}/{repo}
```

GitHub’s repo endpoint can be used for public repositories without auth. ([GitHub Docs][1])

Use response fields:

```ts
name;
description;
html_url;
stargazers_count;
forks_count;
language;
default_branch;
updated_at;
pushed_at;
```

---

### B. Get full file tree

Use this to build the GitHub-style file explorer.

```txt
GET https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1
```

GitHub’s tree API returns the file/folder hierarchy of a repository. ([GitHub Docs][2])

Use response:

```ts
tree: [
  {
    path: "app/page.tsx",
    type: "blob",
    sha: "...",
    size: 1234,
  },
  {
    path: "components",
    type: "tree",
  },
];
```

Logic:

```txt
Fetch tree
Filter useless files:
- node_modules
- .next
- dist
- build
- lockfiles maybe optional

Convert flat paths into nested folders
Render folder/file explorer
```

---

### C. Get selected file content

Use this when user clicks a file.

```txt
GET https://api.github.com/repos/{owner}/{repo}/contents/{path}?ref={branch}
```

GitHub’s contents API returns file or directory contents by path. ([GitHub Docs][3])

Response gives base64 content:

```ts
content;
encoding: "base64";
```

Logic:

```txt
Decode base64
Detect language from extension
Render code block
```

Example:

```ts
const decoded = atob(content.replace(/\n/g, ""));
```

For large files, don’t auto-load. Show:

```txt
File too large. View on GitHub.
```

---

### D. Get README

Use this for the default repo landing view.

```txt
GET https://api.github.com/repos/{owner}/{repo}/readme
```

Render decoded markdown as the main content.

Use README as default tab because it explains the project better than raw code.

---

### E. Get commits

Use this for real repo activity.

```txt
GET https://api.github.com/repos/{owner}/{repo}/commits?sha={branch}&per_page=10
```

GitHub has REST endpoints for commit data. ([GitHub Docs][4])

Use fields:

```ts
commit.message;
commit.author.name;
commit.author.date;
html_url;
sha;
```

Render like:

```txt
Latest commits
- fix vault sync issue     2 days ago
- add encrypted export     5 days ago
- improve landing page     1 week ago
```

---

## 3. Page loading flow

```txt
User opens /projects/pazman

1. Read local project config
2. Fetch repo metadata
3. Fetch repo tree
4. Fetch README
5. Fetch latest commits
6. Render central GitHub-style repo UI
```

Default screen:

```txt
Repo header
Tabs: Code | README | Commits
File explorer
README preview
```

When file clicked:

```txt
1. Set selected file path
2. Fetch contents API for that path
3. Decode content
4. Show code viewer
```

---

## 4. UI logic

Central panel should have this layout:

```txt
repo-shell
├── repo-header
│   ├── project name
│   ├── description
│   ├── stars / forks / language
│   └── GitHub + Live buttons
│
├── repo-tabs
│   ├── Code
│   ├── README
│   └── Commits
│
└── repo-body
    ├── file-tree
    └── content-viewer
```

Keep the repo viewer inside your center column only. The patterned sides stay outside.

Important CSS behavior:

---

## 5. Rate limit handling

Without auth, GitHub API has stricter limits. With auth, limits are higher. GitHub recommends authentication for higher rate limits. ([GitHub Docs][5])

Use a GitHub token server-side only.

Do **not** expose token in frontend.

Logic:

```txt
Frontend calls your own endpoint:
GET /api/github/repo?project=pazman

Your backend calls GitHub with token:
Authorization: Bearer GITHUB_TOKEN
```

Cache responses:

```txt
repo metadata: 10–30 minutes
tree: 10–30 minutes
README: 10–30 minutes
commits: 5–10 minutes
file content: 10–30 minutes
```

---

## 6. Final behavior

What the page should actually do:

```txt
/projects/pazman
shows real Pazman GitHub repo data

/projects/townbase
shows real Townbase GitHub repo data

File explorer is real
README is real
Commits are real
Selected code file is real
GitHub button opens actual repo
Live button opens deployed project
```

Best implementation logic:

```txt
Use GitHub REST API.
Build your own GitHub-inspired UI.
Do not iframe GitHub.
Do not use cgit.
Only fetch the data you need and render it inside your central portfolio panel.
```

[1]: https://docs.github.com/en/rest/repos/repos?utm_source=chatgpt.com "REST API endpoints for repositories"
[2]: https://docs.github.com/rest/git/trees?utm_source=chatgpt.com "REST API endpoints for Git trees"
[3]: https://docs.github.com/rest/repos/contents?utm_source=chatgpt.com "REST API endpoints for repository contents"
[4]: https://docs.github.com/rest/commits/commits?utm_source=chatgpt.com "REST API endpoints for commits"
[5]: https://docs.github.com/en/rest?utm_source=chatgpt.com "GitHub REST API documentation"
