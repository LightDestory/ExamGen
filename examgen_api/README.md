# :cloud: Exam-Gen (back-end)  

This repository hosts the source code of the back-end services developed to assist my Exam-Gen web application.

## :heart: Powered By

The services are very basic but *I tried to use new technologies* such as:

- **NodeJS**, it is a JavaScript runtime built on Chrome's V8 JavaScript engine;
- **TypeScript**, it is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions
- **express**, it is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**, it is a No-SQL document-based database.

## :book: API documentation

The services is based on the URL:
> http|https://YOUR_DOMAIN/api/ ...

The documentation is available in [HTML](./docs/docs_html.html) or [Markdown](./docs/docs_markdown.md) format. 

## :gear: Setup

You must fulfill the prerequisites before building the back-end:

- *NodeJS* 14+ with *npm*
- *MongoDB* with a *role and database* ready for the applicaition to use

If you got everything, we can start building:

1) Install all the dependencies using __npm install__ inside the back-end repo folder.
2) Make a copy of _.env.dist_ from tesmplates folder and paste it on back-end root folder, then fill it with your settings.
3) Run the application running __npm run start__.
4) The back-end will listening to locahost at your prefered port. You can now set up a reverse proxy or a direct DNS record to your machine. This is sys-admin stuff that do not requires my explaination.