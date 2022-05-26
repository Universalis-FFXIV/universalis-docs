import {
  AppShell,
  Navbar,
  Title,
  Header,
  Button,
  SimpleGrid,
  Group,
  DefaultMantineColor,
  Affix,
  Text,
  Transition,
  Anchor,
  Select,
  Divider,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { ChevronUpIcon, CubeIcon, RocketIcon } from '@modulz/radix-icons';
import Link from 'next/link';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { RestDocumentation } from '../components/RestDocumentation/RestDocumentation';
import { WebSocketDocumentation } from '../components/WebSocketDocumentation/WebSocketDocumentation';
import { SwaggerSchema } from '../data/swagger/types';
import useStyles from './index.styles';

function HomePageNavButton({
  name,
  location,
  icon,
  color,
  onClick,
}: {
  name: string;
  location: string;
  icon: ReactNode;
  color: DefaultMantineColor;
  onClick?: (x: string) => void;
}) {
  return (
    <Link href={location} passHref>
      <Button
        variant="light"
        color={color}
        leftIcon={icon}
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

  const [schemaVersion, setSchemaVersion] = useState<string>('v1');

  const [schema, setSchema] = useState<SwaggerSchema>();
  useEffect(() => {
    setSchema(undefined);
    fetch(`/api/schema/${schemaVersion}`)
      .then((res) => res.json())
      .then(setSchema);
  }, [schemaVersion]);

  const [section, setSection] = useState('REST API');
  const docSections = new Map<string, ReactElement>([
    ['REST API', <RestDocumentation schema={schema} />],
    ['WebSocket API', <WebSocketDocumentation schema={schema} />],
  ]);

  const [scroll, scrollTo] = useWindowScroll();

  const navBarWidth = 260;
  const headerHeight = 60;

  return (
    <AppShell
      navbar={
        <Navbar
          width={{ base: navBarWidth }}
          p="xs"
          fixed
          styles={(theme) => ({
            root: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          })}
        >
          <Navbar.Section grow mt="md">
            <Group mb={10} grow>
              <Text>API Version</Text>
              <Select
                value={schemaVersion}
                onChange={(value) => setSchemaVersion(value ?? 'v1')}
                data={['v1', 'v2']}
              />
            </Group>
            <Divider mb={10} />
            <HomePageNavButton
              name="REST API"
              icon={<CubeIcon />}
              location="/"
              color="blue"
              onClick={setSection}
            />
            <HomePageNavButton
              name="WebSocket API"
              icon={<RocketIcon />}
              location="/"
              color="green"
              onClick={setSection}
            />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          height={headerHeight}
          p="xs"
          fixed
          styles={(theme) => ({
            root: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          })}
        >
          <SimpleGrid cols={2}>
            <Anchor href="https://universalis.app" style={{ textDecoration: 'none' }}>
              <Title className={classes.title}>Universalis</Title>
            </Anchor>
            <Group position="right">
              <ColorSchemeToggle />
            </Group>
          </SimpleGrid>
        </Header>
      }
    >
      <div
        style={{
          marginLeft: navBarWidth,
          marginTop: headerHeight,
        }}
      >
        {docSections.get(section)}
      </div>
      <Affix position={{ bottom: 40, right: 40 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
              <ChevronUpIcon />
            </Button>
          )}
        </Transition>
      </Affix>
    </AppShell>
  );
}
