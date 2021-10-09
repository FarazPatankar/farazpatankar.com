import { DefaultSeoProps } from "next-seo";

const defaultSEOConfig: DefaultSeoProps = {
  title: "Faraz Patankar",
  titleTemplate: "%s | Faraz Patankar",
  defaultTitle: "Faraz Patankar",
  description: "Full-stack engineer and digital nomad",
  canonical: "https://farazpatankar.com",
  openGraph: {
    url: "https://farazpatankar.com",
    title: "Faraz Patankar",
    description: "Full-stack engineer and digital nomad",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "nextarter-chakra.sznm.dev og-image",
      },
    ],
    site_name: "farazpatankar",
  },
  twitter: {
    handle: "@farazpatankar13",
    cardType: "summary_large_image",
  },
  dangerouslySetAllPagesToNoIndex: true,
  dangerouslySetAllPagesToNoFollow: true,
};

export default defaultSEOConfig;
