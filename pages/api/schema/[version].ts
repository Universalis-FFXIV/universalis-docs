import { NextApiRequest, NextApiResponse } from 'next';
import { stderr, stdout } from 'process';
import { getSchemaUrl } from '../../../data/api/universalis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { version } = req.query;
  if (Array.isArray(version)) {
    res.status(400).json({ error: 'Expected version, got array.' });
    return;
  }

  try {
    // The response type depends on if the data is compressed or not,
    // so we just read it as a JSON object and re-serialize it either way.
    const url = getSchemaUrl(version);
    stdout.write(`${new Date().toUTCString()}\tFetching schema from ${url}\n`);
    const data = await fetch(url).then((r) => r.json());
    res.status(200).json(data);
  } catch (err) {
    stderr.write(`${new Date().toUTCString()}\tFailed to get schema: ${err}\n`);
    res.status(500).json({ error: 'Failed to get API schema.' });
  }
}
