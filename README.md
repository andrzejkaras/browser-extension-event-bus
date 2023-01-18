## browser-extension-event-bus

# Description

## Why this library was created?

After Google announced Manifest V3 for browser extensions, then we as developers could not use persistent background page anymore. What worse we have to use Service worker, which could be inactive from time to time. So simple in-memory event bus implementation is not enough.

## TL:;DR:

This tool allows (**again**) to decouple business logic hidden in orthogonal modules written for MV3 extensions.

## How it works?

`Browser extension event bus` is a cross-browser library that is utilizing browser local storage in order to buffer and dispatch all events to multiple subscribers if needed.

Events are persisted as soon as possible, then all subscribers receive them.

## Features

- Sending events
- Subscribing for events (from many places if needed)
- Buffering events (local storage implementation)
- Cross context communication *

# Technical side of things

## Installation

`NPM` - use command presented below

```shell
npm i extension-event-bus
```

`YARN` - use command presented below

```shell
yarn add extension-event-bus
```

## Dependencies

For now library is using only:

- Typescript
- webextension-polyfill

## API documentation

### Sending an event

In order to send event you need to use method presented below.

`async send(topic: string, data: any): Promise<boolean>`

We simply pass topic name and data we want to include in event.

### Subscribing or receiving an event

In order to subscribe to an event we need to use method shown below.

`subscribe(topic: string, f: Function): Promise<void>`

Again, we are passing topic and handler function that would take data that were sent as an argument.

## Usage example

```js
import { EventBusFactory } from 'extension-event-bus';
import { IEventBus } from 'extension-event-bus/dist/cjs/iEventBus';

// Define custom handler
const multiply = (n: number) => {
  const result = n * n;
  console.log(result);
}

// Create an event bus by using factory class
const eventBus: IEventBus = EventBusFactory.getEventBus();

// Define all subsribents
await eventBus.subscribe('numbers', console.log);
await eventBus.subscribe('numbers', multiply);

// Send event
await eventBus.send('numbers',10);

// Result in the console should be like ...
// 10
// 100
```

# Other things

## Contribution

Library is still on development stage. So please create an issues if you have some ideas or problems.

## Known issues and limitations

As you know we could distinguish a couple of sub-packages in browser extension:
- service worker
- content scripts
- popup
- devtools

We need to initialize our event bus in each context itself. Because an event bus is utilizing local storage (which is shared between contexts) we could send events between these contexts.

**WARN: THIS FEATURE IS IN TEST STAGE**

## TODOs

- Removing events once all subscribers receive them
- Reviewing events from given topic
- Supporting cross context communication
- Implement in-memory version if needed
- Implement unit tests
- Implement preloading events from storage if needed
- Define event as a type
- Add prop that defines trusted level
- and more :)

## Licensing

MIT - Check LICENSE file.

# ONE MORE WARN

It's implementation of beta version. So please watch out while using it. All insights, tips and bug reports are welcome!

# Changelog

Check CHANGELOG.md file for more details.