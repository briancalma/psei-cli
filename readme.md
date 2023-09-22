# psei-cli

[![npm version](https://badge.fury.io/js/@kairoot%2Fpsei-cli.svg)](https://badge.fury.io/js/@kairoot%2Fpsei-cli)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A simple command-line tool for fetching Philippine stock market data. Built with the [Phisix API](https://github.com/phisix-org/phisix) and inspired by [pse-tracker-cli](https://github.com/ianvizarra/pse-tracker-cli).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Sources](#sources)
- [Author](#author)

## Features

- Fetch real-time and historical stock data from the Philippine Stock Exchange.
- User-friendly command-line interface.
- Highly customizable queries.

## Prerequisites

- Node.js: You'll need to have Node.js installed to use `psei-cli`. Download it [here](https://nodejs.org/en/download/current).

## Installation

After installing Node.js, you can install `psei-cli` globally using the following command:

```bash
npm install -g @kairoot/psei-cli
```

## Usage

After installation, you can fetch stock data using the following commands:

```bash
# To get stock data
psei-cli get-stock <symbol>

# Example
psei-cli get-stock JFC

# To view help
psei-cli --help

# To view command-specific help
psei-cli [command] --help
```

## License

`psei-cli` is licensed under the [GNU General Public License v3](https://opensource.org/licenses/GPL-3.0).

## Sources

- API from [Phisix API](https://github.com/phisix-org/phisix)

## Author

- Developed and maintained by Brian Calma.
- 📧 Email: [briancalmadevacc@gmail.com](mailto:briancalmadevacc@gmail.com)
