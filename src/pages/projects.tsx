import { GetStaticProps } from "next";
import { VStack, Text, Heading, Img } from "@chakra-ui/react";

import { getDatabase } from "@lib/notion";
import { PostProps } from "@customTypes/notion";

import { NotionText } from "@components/core/NotionText";
import Layout from "@components/layout";
import { TitleLink } from "@components/core/Link";

const Projects: React.FC<{ projects: PostProps[] }> = ({ projects }) => {
  return (
    <Layout
      seo={{
        title: "Projects",
        description:
          "Everything I've ever built. Well, at least the stuff that's still online.",
      }}
    >
      <VStack alignItems="start" spacing="8">
        <Heading>Projects</Heading>
        <VStack alignItems="start">
          <Text>
            I love building side projects. They&apos;re great for a bunch of
            reasons. Want to learn a new programming language? Build a side
            project. Want to try a new platform to deploy your app to? Build a
            side project. Want to try this shiny new CSS framework? Yes, you
            guessed it. Build a side project!
          </Text>
          <Text>
            I&apos;ve built several of these over the past year or so. The
            domains have expired on some of them so they aren&apos;t online
            anymore but thanks to services like Netlify, most of my new ones are
            still up and will probably always be. So without further ado,
            let&apos;s take a look at them!
          </Text>
        </VStack>
      </VStack>

      <VStack mt="16" spacing="16">
        {projects.reverse().map((project) => (
          <VStack key={project.id} alignItems="start" spacing="8">
            <Heading>
              {project.properties.Url?.url ? (
                <TitleLink
                  isExternal
                  href={project.properties.Url!.url}
                  textDecoration="underline"
                >
                  {project.properties.Title.title[0].plain_text}
                </TitleLink>
              ) : (
                <>{project.properties.Title.title[0].plain_text}</>
              )}
            </Heading>
            <Img
              // @ts-ignore
              src={project.properties.Image.files[0].file.url}
              alt={project.properties.Image.files[0].name}
              height="auto"
              width="full"
            />
            <NotionText text={project.properties.Description.rich_text} />
          </VStack>
        ))}
      </VStack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getDatabase(process.env.PROJECTS_TABLE_ID as string);

  return {
    props: {
      projects,
    },
    revalidate: 1,
  };
};

export default Projects;
