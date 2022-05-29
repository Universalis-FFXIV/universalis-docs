import {
  AppShell,
  Navbar,
  Header,
  Button,
  Group,
  DefaultMantineColor,
  Affix,
  Text,
  Transition,
  Anchor,
  Select,
  Divider,
  Image,
  UnstyledButton,
  ActionIcon,
  MediaQuery,
  Burger,
} from '@mantine/core';
import { useViewportSize, useWindowScroll } from '@mantine/hooks';
import { ChevronUpIcon, CubeIcon, GitHubLogoIcon, RocketIcon } from '@modulz/radix-icons';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { RestDocumentation } from '../components/RestDocumentation/RestDocumentation';
import { WebSocketDocumentation } from '../components/WebSocketDocumentation/WebSocketDocumentation';
import { SwaggerSchema } from '../data/swagger/types';

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

  const [navOpen, setNavOpen] = useState(false);

  const { width } = useViewportSize();
  if (!navOpen && width >= 768) {
    setNavOpen(true);
  }

  return (
    <AppShell
      navbar={
        <Transition transition="slide-right" mounted={navOpen}>
          {(transitionStyles) => (
            <Navbar
              width={{ base: navBarWidth }}
              p="xs"
              hiddenBreakpoint="sm"
              hidden={!navOpen}
              fixed
              style={transitionStyles}
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
              <Navbar.Section mt="md">
                <Divider mb={10} />
                <Group>
                  <UnstyledButton
                    component="a"
                    href="https://github.com/Universalis-FFXIV/Universalis"
                    target="_blank"
                  >
                    <ActionIcon size="lg">
                      <GitHubLogoIcon height={26} width={26} />
                    </ActionIcon>
                  </UnstyledButton>
                </Group>
              </Navbar.Section>
            </Navbar>
          )}
        </Transition>
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
          <Group style={{ justifyContent: 'space-between' }}>
            <Group>
              <Anchor href="https://universalis.app" style={{ textDecoration: 'none' }}>
                <MediaQuery query="(max-width: 370px)" styles={{ display: 'none' }}>
                  <Image src="/universalis_bodge.png" height={headerHeight - 21} />
                </MediaQuery>
                <MediaQuery query="(min-width: 370px)" styles={{ display: 'none' }}>
                  <Text size="xl">Universalis</Text>
                </MediaQuery>
              </Anchor>
            </Group>
            <Group position="right">
              <ColorSchemeToggle />
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger opened={navOpen} onClick={() => setNavOpen((o) => !o)} size="sm" />
              </MediaQuery>
            </Group>
          </Group>
        </Header>
      }
    >
      <div>
        <MediaQuery largerThan="sm" styles={{ marginLeft: navBarWidth }}>
          <div style={{ marginTop: headerHeight }}>{docSections.get(section)}</div>
        </MediaQuery>
        <Affix position={{ bottom: 40, right: 40 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
                <ChevronUpIcon />
              </Button>
            )}
          </Transition>
        </Affix>
      </div>
    </AppShell>
  );
}
