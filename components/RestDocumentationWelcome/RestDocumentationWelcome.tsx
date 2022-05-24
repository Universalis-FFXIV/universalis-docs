import { Anchor, Code, Space, Text } from '@mantine/core';

export function RestDocumentationWelcome() {
  return (
    <div>
      <Text>Welcome to the Universalis documentation page.</Text>
      <Space h="lg" />
      <Text>
        There is a rate limit of 25 req/s (50 req/s burst) on the API, and 15 req/s (30 req/s burst)
        on the website itself, if you&apos;re scraping instead. The number of simultaneous
        connections per IP is capped to 8.
      </Text>
      <Space h="lg" />
      <Text>
        To map item IDs to item names or vice versa, use{' '}
        <Anchor href="https://xivapi.com/docs/Search#search">XIVAPI</Anchor>. In addition to XIVAPI,
        you can also get item ID mappings from{' '}
        <Anchor href="https://lumina.xiv.dev/docs/intro.html">Lumina</Anchor>,{' '}
        <Anchor href="https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Item.csv">
          this sheet
        </Anchor>
        , or{' '}
        <Anchor href="https://raw.githubusercontent.com/ffxiv-teamcraft/ffxiv-teamcraft/master/apps/client/src/assets/data/items.json">
          this
        </Anchor>{' '}
        pre-made dump.
      </Text>
      <Space h="lg" />
      <Text>
        To get a mapping of world IDs to world names, use{' '}
        <Anchor href="https://xivapi.com/World">XIVAPI</Anchor> or{' '}
        <Anchor href="https://github.com/xivapi/ffxiv-datamining/blob/master/csv/World.csv">
          this sheet
        </Anchor>
        . The <Code>key</Code> column represents the world ID, and the <Code>Name</Code> column
        represents the world name. Note that not all listed worlds are available to be used &#8212;
        many of the worlds in this sheet are test worlds, or Korean worlds (Korea is unsupported at
        this time).
      </Text>
      <Space h="lg" />
      <Text>
        If you use this API heavily for your projects, please consider supporting the website on{' '}
        <Anchor href="https://liberapay.com/karashiiro">Liberapay</Anchor>,{' '}
        <Anchor href="https://ko-fi.com/karashiiro">Ko-fi</Anchor>, or{' '}
        <Anchor href="https://patreon.com/universalis">Patreon</Anchor>, or making a one-time
        donation on <Anchor href="https://ko-fi.com/karashiiro">Ko-fi</Anchor>. Any support is
        appreciated!
      </Text>
    </div>
  );
}
