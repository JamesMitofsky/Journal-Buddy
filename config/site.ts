export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Journal Buddy",
  description: "Format journal metadata for submission to a markdown file.",
  mainNav: [
    {
      title: "Visualize",
      href: "/",
    },
    {
      title: "Transcribe",
      href: "/transcribe",
    },
  ],
  links: {
    github: "https://github.com/jamesmitofsky",
  },
}
