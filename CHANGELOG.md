# Change Log
All notable changes to this project will be documented in this file.

## [0.5.0] - 2024-01-19

- Renamed ILocalStorage to IEventBusBuffer
- Implemented unit test
- Add additional check for topic subscribers

## [0.4.0] - 2023-09-04

- Add prefix and delimiter to event id

## [0.3.4] - 2023-04-05

- Fix for handing an empty event

## [0.3.3] - 2023-03-08

- Regenerated types for event bus interface

## [0.3.2] - 2023-03-08

- Mark data param as optional for send method

## [0.3.1] - 2023-03-08

- Fixed handling events that no contains data

## [0.3.0] - 2023-01-26

- Introduced config for event bus
- Introduced a mechanism that would be removing received events from local storage

## [0.2.0] - 2023-01-21

- Introduced .nvmrc file
- Introduced jest.ts along with first unit tests
- Implemented method for checking whether topic has existing subscribers

## [0.1.2] - 2023-01-21

- Hall of Fame section in README created
- Merged PR with refactor of local storage class

## [0.1.1] - 2023-01-18

- Removed exclusion for dist directory

## [0.1.0] - 2023-01-18

- Basic implementation of EventBus class. Combined with internal LocalStorage class.
- Interfaces used in exposing functionalities outside the library
