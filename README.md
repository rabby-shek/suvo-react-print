
# React Element Printer

A React component to easily print any part of the page, automatically copying styles and external resources for a seamless print experience. No need to manually pass styles — it handles everything for you!

## Installation

Install the package via npm:

```bash
npm install suvo-react-print
```

Or using yarn:

```bash
yarn add suvo-react-print
```

## Usage

The `ReactElementPrinter` component allows you to print content with just a few simple steps. You can customize the print behavior, including the title, styles, and before/after print callbacks.

### Basic Example

```jsx
import React, { useRef } from 'react';
import ReactElementPrinter from 'react-element-printer';

const MyComponent = () => {
  const printerRef = useRef();

  return (
    <div>
      <h1>My Page</h1>
      <p>This is some content to be printed.</p>

      <ReactElementPrinter ref={printerRef}>
        <div>
          <h2>This will be printed</h2>
          <p>Along with its styles</p>
        </div>
      </ReactElementPrinter>

      <button onClick={() => printerRef.current.print()}>Print</button>
    </div>
  );
};

export default MyComponent;
```

### Print Multiple Sections Example

In this example, you can print multiple sections of the page, each with different content.

```jsx
import React, { useRef } from 'react';
import ReactElementPrinter from 'react-element-printer';

const MultiSectionPrint = () => {
  const sectionRef1 = useRef();
  const sectionRef2 = useRef();

  return (
    <div>
      <h1>Multi Section Print</h1>
      <p>This section is visible, but only part of it will be printed.</p>

      <ReactElementPrinter ref={sectionRef1}>
        <div>
          <h2>Section 1</h2>
          <p>This is content from Section 1 that will be printed.</p>
        </div>
      </ReactElementPrinter>

      <ReactElementPrinter ref={sectionRef2}>
        <div>
          <h2>Section 2</h2>
          <p>This is content from Section 2 that will also be printed.</p>
        </div>
      </ReactElementPrinter>

      <button onClick={() => sectionRef1.current.print()}>Print Section 1</button>
      <button onClick={() => sectionRef2.current.print()}>Print Section 2</button>
    </div>
  );
};

export default MultiSectionPrint;
```

### Full Customization Example

This example shows how you can use the `documentTitle` and `onBeforePrint`/`onAfterPrint` callbacks to fully customize the print process.

```jsx
import React, { useRef } from 'react';
import ReactElementPrinter from 'react-element-printer';

const CustomPrintExample = () => {
  const printerRef = useRef();

  const handleBeforePrint = () => {
    console.log('Before print');
  };

  const handleAfterPrint = () => {
    console.log('After print');
  };

  return (
    <div>
      <h1>Custom Print Example</h1>
      <ReactElementPrinter
        ref={printerRef}
        documentTitle="Custom Printed Document"
        onBeforePrint={handleBeforePrint}
        onAfterPrint={handleAfterPrint}
      >
        <div>
          <h2>This will be printed with custom title and callbacks</h2>
          <p>This content is printed with customized before and after actions.</p>
        </div>
      </ReactElementPrinter>

      <button onClick={() => printerRef.current.print()}>Print</button>
    </div>
  );
};

export default CustomPrintExample;
```

## Props

| Prop              | Type                    | Default   | Description                                                                 |
|-------------------|-------------------------|-----------|-----------------------------------------------------------------------------|
| `documentTitle`   | `string`                | 'Print'   | Title of the printed document.                                               |
| `onBeforePrint`    | `function`              | `null`    | Callback function to be executed before printing.                            |
| `onAfterPrint`     | `function`              | `null`    | Callback function to be executed after printing.                             |

## Ref API

You can use the `print` method via the ref to trigger the print action.

```jsx
const printerRef = useRef();

const handlePrint = () => {
  printerRef.current.print();
};
```

## Features

- **Automatic Style Copying:** The printed content will inherit the styles from the main page without needing to manually pass them.
- **External Stylesheets Support:** External stylesheets (e.g., Google Fonts) are also copied into the print window.
- **Customizable Callbacks:** Execute functions before and after printing to customize the print flow.
- **Seamless Integration:** Easily integrate it into any part of your React app without modifying the structure.

## How It Works

1. The `ReactElementPrinter` component renders the content you want to print.
2. When you trigger the print action, it copies the content and all relevant styles from your page (including external CSS and linked styles).
3. It creates a new print window, sets up the content, and prints it.

## License

ISC License.
