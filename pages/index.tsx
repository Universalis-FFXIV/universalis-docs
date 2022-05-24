import {
  AppShell,
  Navbar,
  Title,
  Divider,
  Header,
  Button,
  SimpleGrid,
  Group,
  DefaultMantineColor,
  Space,
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

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section>
            <Title className={classes.title}>Universalis</Title>
          </Navbar.Section>
          <Divider my="sm" />
          <Navbar.Section grow mt="md">
            <HomePageNavButton name="REST API" location="/" color="blue" onClick={setSection} />
            <Space h="xs" />
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
        <Header height={60} p="xs">
          <SimpleGrid cols={2}>
            <div />
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
      {docSections.get(section)}
    </AppShell>
  );
}
