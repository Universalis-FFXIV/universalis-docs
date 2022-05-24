import { AppShell, Navbar, Title, Divider, Header, Button, SimpleGrid, Group } from '@mantine/core';
import { RocketIcon } from '@modulz/radix-icons';
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
            <Link href="/" passHref>
              <Button
                variant="light"
                color="blue"
                leftIcon={<RocketIcon />}
                styles={{ inner: { justifyContent: 'left' } }}
                fullWidth
              >
                REST API
              </Button>
            </Link>
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
      <RestDocumentation />
    </AppShell>
  );
}
