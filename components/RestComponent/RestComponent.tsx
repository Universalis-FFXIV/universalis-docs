import { Divider, Space, Title } from '@mantine/core';
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

const newLineRegex = /\r?\n/g;

function formatProperty({ name, property }: { name: string; property: SwaggerType }) {
  let text = `  ${name}: ${typeToHint(property)};`;

  if (property.type != null) {
    if ((property.type === 'string' || property.type === 'integer') && property.format != null) {
      text += ` // ${property.format}`;
    }

    if (property.description != null) {
      text = `${property.description
        .split(newLineRegex)
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
      <Space h="lg" />
      <Title className={classes.title} id={nameToId(name)}>
        {name}
      </Title>
      <Divider />
      <Prism language="typescript">
        {`interface ${name} {\n${props.reduce((agg, next) => `${agg}${next}\n`, '')}}`}
      </Prism>
    </div>
  );
}
