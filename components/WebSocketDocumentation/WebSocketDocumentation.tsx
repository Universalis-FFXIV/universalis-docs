import { Code, Container, List, Space, Text, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { SwaggerSchema } from '../../data/swagger/types';
import { LoadingDocumentation } from '../LoadingDocumentation/LoadingDocumentation';

export function WebSocketDocumentation({ schema }: { schema?: SwaggerSchema }) {
  if (schema == null) {
    return <LoadingDocumentation />;
  }

  return (
    <Container>
      <Title id="ws-api">{schema.info.title} WebSocket API</Title>
      <Text mt={16}>
        Universalis offers a WebSocket API for retrieving some types of data in real time. When
        using the WebSocket API, the client is expected to perform all data processing itself;
        precalculated fields such as averages and minimum/maximum prices will not be provided.
        WebSocket data is binary-serialized using BSON. Most programming languages should have a
        BSON library available online for use in deserializing data. WebSocket messages are not
        compressed.
      </Text>
      <Text mt={16}>
        The WebSocket API is likely not suited to spreadsheet-based applications such as Google
        Sheets or Microsoft Excel.
      </Text>
      <Text mt={16}>
        This page gives demonstrations on how to use the WebSocket API. A full API reference is not
        currently available.
      </Text>
      <Title id="getting-started" mt={32}>
        Getting started
      </Title>
      <Text mt={16}>
        To begin with, connect to the WebSocket endpoint and set up BSON deserializtion.
      </Text>
      <Prism.Tabs mt={16}>
        <Prism.Tab label="Node" withLineNumbers language="javascript">
          {`import { deserialize } from "bson";
import WebSocket from "ws";

const addr = "wss://universalis.app/api/ws";

const ws = new WebSocket(addr);

ws.on("open", () => console.log("Connection opened."));

ws.on("close", () => console.log("Connection closed."));

ws.on("message", data => {
    const message = deserialize(data);
    console.log(message);
});`}
        </Prism.Tab>
      </Prism.Tabs>
      <Text mt={16}>
        Initially, no data will be received from the WebSocket server. The data sent by the server
        is controlled by event channels, which clients must subscribe to. There are currently four
        event channels:
      </Text>
      <List mt={16}>
        <List.Item>
          <Code>listings/add</Code>
        </List.Item>
        <List.Item>
          <Code>listings/remove</Code>
        </List.Item>
        <List.Item>
          <Code>sales/add</Code>
        </List.Item>
        <List.Item>
          <Code>sales/remove</Code>
        </List.Item>
      </List>
      <Text mt={16}>
        To subscribe to an event channel, send a <Code>subscribe</Code> event to the server,
        specifying the channel you wish to receive messages from. Note that messages to the server
        must be BSON-serialized.
      </Text>
      <Prism.Tabs mt={16}>
        <Prism.Tab label="Node" withLineNumbers language="javascript">
          {`import { deserialize, serialize } from "bson";

// ...

ws.on("open", () => {
    console.log("Connection opened.");
    ws.send(serialize({ event: "subscribe", channel: "listings/add" }));
});`}
        </Prism.Tab>
      </Prism.Tabs>
      <Text mt={16}>
        Running the client should now cause your console to be flooded with messages from the
        server. Keep an eye on your application&apos;s memory usage; you may be receiving messages
        faster than your application is processing them.
      </Text>
      <Text mt={16}>Unsubscribing from an event channel works similarly:</Text>
      <Prism.Tabs mt={16}>
        <Prism.Tab label="Node" withLineNumbers language="javascript">
          {'ws.send(serialize({ event: "unsubscribe", channel: "listings/add" }));'}
        </Prism.Tab>
      </Prism.Tabs>
      <Text mt={16}>
        Events can be filtered on the server by appending a filter string to your{' '}
        <Code>subscribe</Code> request. Filter strings are comma-separated lists of fields that
        should be matched on sent messages. For example, messages on the <Code>listings/add</Code>{' '}
        channel have a <Code>world</Code> field, containing the world ID of the listing upload data.
        Adding <Code>{'{world=73}'}</Code> to the event channel will filter uploads to Adamantoise
        only:
      </Text>
      <Prism.Tabs mt={16}>
        <Prism.Tab label="Node" withLineNumbers language="javascript">
          {'ws.send(serialize({ event: "subscribe", channel: "listings/add{world=73}" }));'}
        </Prism.Tab>
      </Prism.Tabs>
      <Text mt={16}>
        Multiple subscriptions on the same channel can be made, in order to join filters on the same
        field in an OR pattern. Here, we subscribe to Adamantoise and Gilgamesh at the same time:
      </Text>
      <Prism.Tabs mt={16}>
        <Prism.Tab label="Node" withLineNumbers language="javascript">
          {`ws.send(serialize({ event: "subscribe", channel: "listings/add{world=73}" }));
ws.send(serialize({ event: "subscribe", channel: "listings/add{world=63}" }));`}
        </Prism.Tab>
      </Prism.Tabs>
      <Text mt={16}>
        Feel free to experiment with other combinations of channels and filters to refine the data
        you receive. Keep in mind that Universalis provides service to both the Global and Chinese
        game regions, so you probably won&apos;t want to listen on any channel without any filters
        at all.
      </Text>
        <Title id="bson-formatting" mt={32}>
            BSON Data Format
        </Title>
        <Text mt={16}>
            All data sent over the websocket is formatted via BSON, same as the subscribe requests,
            and will need to be passed through a BSON decoder/parser in order to be used in your
            application, please make sure to review the comments as some fields can be NULL or
            not included in some requests. Converting this for your specific language will require
            review of your languages BSON parser, as there may be case sensitivity issues.  The
            following is a JSON representation for your convenience.
        </Text>
        <Prism.Tabs mt={16}>
            <Prism.Tab label="Node" language="json">
                {`{
  /* This corresponds to the subscribe information */
  "event": "listings/add",
  /* Item ID being sent in this message */
  "item": 23122,
  /* World ID being sent in this message */
  "world": 2,
  /* This key is not present for sales subscriptions */
  "listings": [
    {
      /* This field is often NULL */
      "creatorID": 0,
      /* This is often an empty string */
      "creatorName": "",
      "hq": true,
      "isCrafted": false,
      /* Most recent upload date */
      "lastReviewTime": 1674368621,
      /* Unique hash used to identify a listing for removal */
      "listingID": "b5399af38b63eea4a3ceca6aa68692451076109b3a20c39f4be79c522f541cfc",
      "materia": [
        {
          /* Slot ID the materia is in */
          "slotID": 0,
          /* This is the materia id, which is not the item ID, use https://xivapi.com/materia/<id> to look up details if needed */
          "materiaID": 0
        }
      ],
      "onMannequin": false,
      "pricePerUnit": 20999,
      "quantity": 10,
      "retainerCity": 12,
      "retainerID": "98702c8262940d99d76cdc236324c18351a8d6dcf764d1f97b376f87bc22036f",
      "retainerName": "xyzzy",
      "sellerID": "74ce52ff2a2b7625bacdd4dace29d3abbbf2431e71f2aa8519905f437dd9fed9",
      "stainID": 0,
      "total": 209990,
      /* This field is often NULL */
      "worldID": 0,
      /* This field is often NULL */
      "worldName": ""
    }
  ],
  /* This key is not present for listings subscriptions */
  "sales": [
    {
      "buyerName": "xyzzy",
      "hq": false,
      "onMannequin": false,
      "pricePerUnit": 20999,
      "quantity": 10,
      "timestamp": 1674411943,
      "total": 209990,
      /* This field is often NULL */
      "worldID": 0,
      /* This field is often NULL */
      "worldName": ""
    }
  ]
}`}
            </Prism.Tab>
        </Prism.Tabs>
      <Space mt={200} />
    </Container>
  );
}
