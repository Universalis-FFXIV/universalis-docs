import {
  Title,
  Text,
  Anchor,
  AppShell,
  Header,
  Navbar,
  Divider,
  UnstyledButton,
  Group,
} from '@mantine/core';
import { useState } from 'react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import useStyles from './Documentation.styles';

export function Documentation() {
  const { classes } = useStyles();

  // TODO: make this actual CSS lol
  const [bgc, setBgc] = useState('rgba(0.0, 0.0, 1.0, 0.0)');

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section>
            <Title>Universalis</Title>
          </Navbar.Section>
          <Divider my="sm" />
          <Navbar.Section grow mt="md">
            <UnstyledButton
              style={{ width: '100%', backgroundColor: bgc }}
              onMouseOver={() => {
                setBgc('rgba(0, 0, 255, 0.2)');
              }}
              onMouseLeave={() => {
                setBgc('rgba(0, 0, 0, 0.0)');
              }}
            >
              <Group>
                <Text>REST API</Text>
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
      <Title className={classes.title} align="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
          Mantine
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/theming/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
    </AppShell>
  );
}
