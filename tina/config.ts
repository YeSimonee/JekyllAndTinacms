import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  //process.env.GITHUB_BRANCH ||
  //process.env.VERCEL_GIT_COMMIT_REF ||
  //process.env.HEAD ||
  "main";

export default defineConfig({
  branch: "main", // Cambialo in "master" se il tuo branch principale è master
  clientId: "efca281a-b889-4a77-b391-91b8b9355e02", // Usa "sandbox" per l'uso locale
  token: "397f45c373c4776a6285f88d3b0cbe63854bba1a", // Nessun token necessario in locale

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  cmsCallback: (cms) => {
    cms.flags.set("useGitHubAuthRedirect", true); // 🔥 Permette di autenticarsi con GitHub
    return cms;
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/

  schema:{
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "content",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Titolo della Pagina",
            type: "string",
          },
          {
            name: "hero_title",
            label: "Titolo Luogo",
            type: "string",
          },
          {
            name: "hero_text",
            label: "Descrizione Luogo",
            type: "rich-text",
          },
          {
            name: "news",
            label: "News",
            type: "object",
            list: true,
            fields: [
              { name: "title", label: "Titolo Notizia", type: "string" },
              { name: "date", label: "Data", type: "string" },
              { name: "author", label: "Autore", type: "string" },
              { name: "description", label: "Descrizione", type: "string" },
            ],
          },
          {
            name: "research",
            label: "Sezione Ricerca",
            type: "object",
            list: true,
            fields: [
              { name: "title", label: "Titolo", type: "string" },
              { name: "image", label: "Immagine", type: "image" },
              { name: "description", label: "Descrizione", type: "string" },
            ],
          },
          {
            name: "features",
            label: "Features",
            type: "object",
            fields: [
              { name: "title", label: "Titolo Features", type: "string" },
              { name: "subtitle", label: "Sottotitolo", type: "string" },
              {
                name: "topics",
                label: "Tematiche di Studio",
                type: "object",
                list: true,
                fields: [
                  { name: "icon", label: "Icona", type: "string" },
                  { name: "text", label: "Testo", type: "string" },
                ],
              },
            ],
          },
          {
            name: "career_opportunities",
            label: "Sbocchi Professionali",
            type: "object",
            fields: [
              { name: "title", label: "Titolo", type: "string" },
              { name: "description", label: "Descrizione", type: "string" },
              {
                name: "list",
                label: "Lista Sbocchi Professionali",
                type: "string",
                list: true,
              },
            ],
          },
        ],
      },
    ],
  },
  
    // 🔥 Aggiungi questa parte per abilitare il visual editing
    cmsCallback: (cms) => {
      cms.flags.set("visualEditing", true);
      return cms;
    },

});