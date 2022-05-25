import { Box, Divider, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { SwaggerType } from '../../data/swagger/types';
import useStyles from './RestComponent.styles';

function nameToId(name: string): string {
  return `schema-${name.toLowerCase()}`;
}

function refToComponent(ref: string): string {
  return ref.substring(ref.lastIndexOf('/') + 1);
}

function typeToHint(type: SwaggerType): string {
  if (type.type === 'array') {
    return `${typeToHint(type.items)}[]`;
  }

  if (type.type == null) {
    return refToComponent(type.$ref);
  }

  if (type.type === 'integer') {
    return 'number';
  }

  if (type.type === 'object') {
    return 'Object';
  }

  return type.type;
}

function formatProperty({ name, property }: { name: string; property: SwaggerType }) {
  let text = `  ${name}`;
  if (property.type != null && property.nullable) {
    text += '?';
  }
  text += `: ${typeToHint(property)};`;

  if (property.type != null) {
    if ((property.type === 'string' || property.type === 'integer') && property.format != null) {
      text += ` // ${property.format}`;
    }

    if (property.description != null) {
      text = `${property.description
        .split(/\r?\n/g)
        .reduce((agg, next) => `${agg}  // ${next}\n`, '')}${text}`;
    }
  }

  return text;
}

export function RestComponent({ name, component }: { name: string; component: SwaggerType }) {
  const { classes } = useStyles();

  if (component.type !== 'object') {
    return <div />;
  }

  const propsRecord = component.properties;
  const props = Object.keys(propsRecord)
    .map((k) => ({
      name: k,
      property: propsRecord[k],
    }))
    .map(formatProperty);

  return (
    <div>
      <Title className={classes.title} mt={36} id={nameToId(name)}>
        {name}
      </Title>
      <Divider />
      <Box className={classes.componentBox} mt={16}>
        <Prism language="typescript">
          {`interface ${name} {\n${props.reduce((agg, next) => `${agg}${next}\n`, '')}}`}
        </Prism>
      </Box>
    </div>
  );
}
