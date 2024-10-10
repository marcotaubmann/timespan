# timediff

Calculate a time difference in several time units.

This repo is based on [Marco Taubmann](https://github.com/marcotaubmann/timediff)'s work.

## Usage

```sh
$ npm install @marc-maniac/timediff
```

```typescript
import { timediff } from '@marc-maniac/timediff';

timediff('2015-01-01', '2018-05-02 02:15:10.777', 'YDHms');
// => { years: 3, days: 121, hours: 2, minutes: 15, milliseconds: 10777 }
```

## Examples

```typescript
// return the timediff in all possible units
timediff(new Date(2015, 1, 1), new Date('2018-05-02 02:15:10'));
// => { years: 3, months: 3, weeks: 0, days: 1, hours: 2, minutes: 15, seconds: 10, milliseconds: 0 }

// return the timediff only in years, weeks, days hours and seconds
timediff(new Date(2015, 1, 1), new Date('2018-05-02 02:15:10.777'), 'YWDHS');
// => { years: 3, weeks: 12, days: 6, hours: 2, seconds: 910 }

// return the timediff only in month, minutes seconds, and milliseconds
timediff(new Date(2015, 1, 1), new Date('2018-05-02 02:15:10.777'), 'MmSs');
// => { months: 39, minutes: 1575, seconds: 10, milliseconds: 777 }

// combine all options
const christmas = new Date();
christmas.setMonth(11);
christmas.setDate(24);

timediff(new Date(), christmas, {
  units: 'MWD',
  returnZeros: false,
});
// => 'Time until christmas: {"months":11,"weeks":1,"days":1}'
```

## API

### timediff(start, end, options)

Return the time difference between `start` and `end`. Use only the units specified in `options`.

Return:

```typescript
{
  years: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
}
```

#### start, end

_Required_
Type: `string` | `Date` | `moment`

#### options

Type: `object` | `string` | `function`

Default:

```typescript
{
  units: {
    years:true,
    months: true,
    weeks: true,
    days: true,
    hours: true,
    minutes: true,
    seconds: true,
    milliseconds: true
  },
  returnZeros: true,
  callback: null
}
```

Use `timediff(start, end, unitString)` (where `unitString` is a string) as a shortcut for
`timediff(start, end, {units: unitString})`.

Use `timediff(start, end, callback)` (where `callback` is a function) as a shortcut for
`timediff(start, end, {callback: callback})`.

##### options.units

Type: `object` | `string`

Can be an object as given above or a string containing any of `YMWDHmSs`.
If a letter exists in the string the corresponding unit is used in
the result.

| letter | result uses  |
| ------ | ------------ |
| Y      | years        |
| M      | months       |
| W      | weeks        |
| D      | days         |
| H      | hours        |
| m      | minutes      |
| S      | seconds      |
| s      | milliseconds |

##### options.returnZeros

Type: boolean

If `true` result can contain fields that are `0`, if `false` they are removed.

## Contributing 🧑‍💻

### Pre-commit hooks

This repo uses a pre-commit hook for biome (lint & format), as well as one to enforce
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

Git hooks are scripts that run automatically every time a particular event occurs in a Git repository. These events can include committing,
merging, and pushing, among others. Git hooks allow developers to enforce certain standards or checks before actions are completed in the
repository, enhancing the workflow and code quality.

The pre-commit framework is a tool that leverages Git hooks to run checks on the code before it is committed to the repository. By using pre-commit,
developers can configure various plugins or hooks that automatically check for syntax errors, formatting issues, or even run tests on the code being
committed. This ensures that only code that passes all the defined checks can be added to the repository, helping to maintain code quality and prevent
issues from being introduced.

To install the pre-commit framework on a system with Homebrew, follow these steps:

```
brew install pre-commit
```

Once pre-commit is installed, navigate to the root directory of your Git repository where you want to enable pre-commit hooks. Then, run the following
command to set up pre-commit for that repository. This command installs the Git hook scripts that the pre-commit framework will use to run checks before commits.

```shell
pre-commit install --install-hooks
pre-commit install --hook-type commit-msg
```

The commit check will check the commit message of the first commit on your branch to check compliance with
conventional commit specifications. This is important because it is used by
[semantic-release](https://github.com/semantic-release/semantic-release) to determine version bumps (major, minor
or patch).

Only 'feat', 'fix', 'perf', and 'revert' commits will trigger a version bump. Note that to trigger a major
version bump, annotate with 'feat!'. Example commit below:

```
chore: Added pre-commit hook to check for conventional commit compliance (#1208)
- Moved away from mirrors-prettier, as it is now under public archive
```

## License

MIT copyright [Marco Taubmann]
