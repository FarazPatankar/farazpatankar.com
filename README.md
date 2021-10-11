# farazpatankar.com

The source code for my (soon to be) personal website.

## 🚀 How to deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FFarazPatankar%2Ffarazpatankar.com&envs=NOTION_TOKEN%2CPOSTS_TABLE_ID%2CPROJECTS_TABLE_ID%2CRECIPES_TABLE_ID&optionalEnvs=POSTS_TABLE_ID%2CPROJECTS_TABLE_ID%2CRECIPES_TABLE_ID&NOTION_TOKENDesc=Your+Notion+API+token&referralCode=faraz)

You can deploy the exact same blog in one-click by clicking the button above. You can follow the [getting started guide](https://developers.notion.com/docs/getting-started) by Notion to get your `NOTION_TOKEN`. The guide also takes you through creating a _database table_ which can become your `POSTS_TABLE_ID`.

### 🛠 Changes

- I have three databases, one each for posts, projects, and recipes. You probably don't want all 3 so you'll have to edit both the code and environment variables accordingly.
  - Assuming you only want posts, delete `pages/projects.tsx`, `pages/recipes.tsx`, and `pages/recipe`.

## 📝 Notes

- Originally forked from [sozonome/nextarter-chakra](https://github.com/sozonome/nextarter-chakra).
- Initial Notion API implementation was based on this [post](https://samuelkraft.com/blog/building-a-notion-blog-with-public-api) by Samuel Kraft.
