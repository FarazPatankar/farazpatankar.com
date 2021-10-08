import { GetStaticProps } from "next";
import { Box } from "@chakra-ui/react";

import { getDatabase } from "@lib/notion";
import { PostProps } from "@types/notion";

import { NotionText } from "@components/core/NotionText";
import Layout from "@components/layout";

const Projects: React.FC<{ projects: PostProps[] }> = ({ projects }) => {
  return (
    <Layout seo={{ title: "Projects" }}>
      <Box mb={8} w="full">
        <ol>
          {projects.map((project) => (
            <li key={project.id}>
              <NotionText text={project.properties.Title.title} />
            </li>
          ))}
        </ol>
      </Box>
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
