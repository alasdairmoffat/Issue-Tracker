# Issue Tracker

> FreeCodeCamp Issue Tracker challenge.

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://badges.mit-license.org)
[![Build Status](https://travis-ci.com/alasdairmoffat/Issue-Tracker.svg?branch=master)](https://travis-ci.com/alasdairmoffat/Issue-Tracker)
[![codecov](https://codecov.io/gh/alasdairmoffat/Issue-Tracker/branch/master/graph/badge.svg)](https://codecov.io/gh/alasdairmoffat/Issue-Tracker)

## Table of Contents

- [Preview](#preview)
- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [License](#license)

## Preview

[Glitch](https://alasdairmoffat-issue-tracker.glitch.me)

## General Info

Project built to fulfill the following User Stories:

1. Prevent cross site scripting(XSS attack).
2. I can **POST** `/api/issues/{projectname}` with form data containing required _issue_title_, _issue_text_, _created_by_, and optional _assigned_to_ and _status_text_.
3. The object saved (and returned) will include all of those fields (blank for optional no input) and also include _created_on_(date/time), _updated_on_(date/time), _open_(boolean, true for open, false for closed), and _\_id_.
4. I can **PUT** `/api/issues/{projectname}` with a _\_id_ and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+\_id. This should always update _updated_on_. If no fields are sent return 'no updated field sent'.
5. I can **DELETE** `/api/issues/{projectname}` with a _\_id_ to completely delete an issue. If no \_id is sent return '\_id error', success: 'deleted '+\_id, failed: 'could not delete '+\_id.
6. I can **GET** `/api/issues/{projectname}` for an array of all issues on that specific project with all the information for each issue as was returned when posted.
7. I can filter my get request by also passing along any field and value in the query(ie. `/api/issues/{project}?open=false`). I can pass along as many fields/values as I want.
8. All 11 functional tests are complete and passing.

### Example usage

- /api/issues/{project}
- /api/issues/{project}?open=true&assigned_to=Joe

### Example return

```json
[
  {
    "_id":"5871dda29faedc3491ff93bb",
    "issue_title":"Fix error in posting data",
    "issue_text":"When we post data it has an error.",
    "created_on":"2017-01-08T06:35:14.240Z",
    "updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe",
    "assigned_to":"Joe","open":true,"status_text":"In QA"
  },
  ...
]
```

## Technologies

- Node.js version: 10.15
- Express version: 4.17
- Chai version: 4.2
- Mocha version: 6.2
- Helmet version: 3.20
- MongoDB version: 3.2
- Mongoose version: 5.6

## Setup

### Clone

Clone from repository

```bash
git clone https://github.com/alasdairmoffat/Issue-Tracker.git
```

### Installation

```bash
cd Issue-Tracker
npm install
npm start
```

## License

> **[MIT license](https://opensource.org/licenses/mit-license.php)**
