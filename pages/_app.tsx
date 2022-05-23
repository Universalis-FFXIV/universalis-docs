import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  AppShell,
  Divider,
  Group,
  Header,
  Navbar,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import Link from 'next/link';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import useStyles from './_app.styles';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const { classes } = useStyles();

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Universalis Documentation</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <AppShell
            padding="md"
            navbar={
              <Navbar width={{ base: 300 }} p="xs">
                <Navbar.Section>
                  <Title className={classes.title}>Universalis</Title>
                </Navbar.Section>
                <Divider my="sm" />
                <Navbar.Section grow mt="md">
                  <UnstyledButton>
                    <Group>
                      <Text>
                        <Link href="/">REST API</Link>
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Navbar.Section>
              </Navbar>
            }
            header={
              <Header height={60} p="xs">
                <div />
                <ColorSchemeToggle />
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            })}
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
