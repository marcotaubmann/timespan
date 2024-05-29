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

*Required*
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
| ------ | -------------|
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

## License
MIT copyright [Marco Taubmann]
