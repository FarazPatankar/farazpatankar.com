import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Link } from "@components/core/Link";
import Layout from "@components/layout";

const EMOJIS = ["👋", "🌻", "🚀", "💚", "👨‍💻", "👾"];

const getEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

const Home = () => {
  return (
    <Layout seo={{ title: "Home" }}>
      <VStack marginY="12" spacing="6" alignItems="start">
        <HStack alignItems="center" spacing="3">
          <Text fontSize="3xl">{getEmoji()}</Text>
          <Heading>Hey!</Heading>
        </HStack>
        <VStack spacing="3">
          <Text>
            My name is Faraz and I build stuff™. This website is supposed to be
            my public space on the internet where people{" "}
            <Text as="i">(mostly just me)</Text> can see the projects I am
            working on and things I am doing in life.
          </Text>
          <Text>
            Currently, I am working as a full-stack engineer at{" "}
            <Link href="https://railway.app/" isExternal>
              Railway
            </Link>
            , failing at finding the time/motivation to work on my{" "}
            <Link href="/projects">side projects</Link> and spending a good
            amount of time in the <Link href="/recipes">cooking</Link> my own
            meals.
          </Text>
          <Text>
            The most recent highlight of my life was acquiring an Aeropress Go
            and a portable hand grinder so I can make better than decent coffee
            while nomad-ing. I hope I can share some{" "}
            <Link href="/aeropress">recipes</Link> with y&apos;all soon!
          </Text>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Home;
