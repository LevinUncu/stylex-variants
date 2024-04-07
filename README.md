# StyleX Variants

## Documentation

## Quick Start

1. Installation

```bash
npm i stylex-variants
# or
yarn add stylex-variants
# or
pnpm add stylex-variants
```

2. Usage

```tsx
import stylex from '@stylexjs/stylex';
import { sv } from 'stylex-variants';

const styles = stylex.create({
  base: {
    padding: '10rem',
  },
  sizeLg: {
    height: '2rem',
  },
  sizeMd: {
    height: '1.5rem',
  },
});

const variants = sv({
  base: styles.base,
  variants: {
    size: {
      lg: styles.sizeLg,
      md: styles.sizeMd,
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const styleProps = stylex.props(variants({ size: 'lg' }));
```
