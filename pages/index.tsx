import {
  AppShell,
  Navbar,
  Title,
  Divider,
  UnstyledButton,
  Group,
  Header,
  Anchor,
} from '@mantine/core';
import Link from 'next/link';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { RestDocumentation } from '../components/RestDocumentation/RestDocumentation';
import useStyles from './index.styles';

export default function HomePage() {
  const { classes } = useStyles();

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
            <UnstyledButton>
              <Group>
                <Anchor component={Link} href="/">
                  REST API
                </Anchor>
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
      <RestDocumentation />
    </AppShell>
  );
}
