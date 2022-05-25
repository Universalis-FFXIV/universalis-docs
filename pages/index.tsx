import {
  AppShell,
  Navbar,
  Title,
  Header,
  Button,
  SimpleGrid,
  Group,
  DefaultMantineColor,
} from '@mantine/core';
import { RocketIcon } from '@modulz/radix-icons';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { RestDocumentation } from '../components/RestDocumentation/RestDocumentation';
import { WebSocketDocumentation } from '../components/WebSocketDocumentation/WebSocketDocumentation';
import useStyles from './index.styles';

function HomePageNavButton({
  name,
  location,
  color,
  onClick,
}: {
  name: string;
  location: string;
  color: DefaultMantineColor;
  onClick?: (x: string) => void;
}) {
  return (
    <Link href={location} passHref>
      <Button
        variant="light"
        color={color}
        leftIcon={<RocketIcon />}
        styles={{ inner: { justifyContent: 'left' } }}
        mb={10}
        onClick={() => {
          if (onClick != null) onClick(name);
        }}
        fullWidth
      >
        {name}
      </Button>
    </Link>
  );
}

export default function HomePage() {
  const { classes } = useStyles();

  const [section, setSection] = useState('REST API');
  const docSections = new Map<string, ReactElement>([
    ['REST API', <RestDocumentation />],
    ['WebSocket API', <WebSocketDocumentation />],
  ]);

  const navBarWidth = 260;
  const headerHeight = 60;

  return (
    <AppShell
      navbar={
        <Navbar width={{ base: navBarWidth }} p="xs" fixed>
          <Navbar.Section grow mt="md">
            <HomePageNavButton name="REST API" location="/" color="blue" onClick={setSection} />
            <HomePageNavButton
              name="WebSocket API"
              location="/"
              color="green"
              onClick={setSection}
            />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={headerHeight} p="xs" fixed>
          <SimpleGrid cols={2}>
            <Title className={classes.title}>Universalis</Title>
            <Group position="right">
              <ColorSchemeToggle />
            </Group>
          </SimpleGrid>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <div
        style={{
          marginLeft: navBarWidth,
          marginTop: headerHeight,
          height: `calc(100vh - ${headerHeight + 32}px)`,
        }}
      >
        {docSections.get(section)}
      </div>
    </AppShell>
  );
}
