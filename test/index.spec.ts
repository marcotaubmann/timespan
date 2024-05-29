import * as dayjs from "dayjs";
import { timediff } from '../lib';
import expect from 'expect';
import { Options } from '../lib';

describe('timediff', function () {
  it('should accept only parsable dates as first two parameters', function () {
    expect(function () {
      timediff('no date', new Date());
    }).toThrow();
    expect(function () {
      // @ts-ignore
      timediff(new Date(), function () {});
    }).toThrow();

    expect(function () {
      timediff(new Date(), new Date());
    }).not.toThrow();
    expect(function () {
      timediff('2015-01-12', new Date());
    }).not.toThrow();
    expect(function () {
      timediff(new Date(), '2015-01-12 12:00:00');
    }).not.toThrow();
    expect(function () {
      timediff(new Date(), new Date().toString());
    }).not.toThrow();
    expect(function () {
      // @ts-ignore
      timediff(new Date(), dayjs());
    }).not.toThrow();
  });

  it('should calculate the timediff between the first two parameters as a result object with unit keys', function () {
    const time = new Date();
    let result = timediff(time, time);
    expect(result).toEqual({
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    result = timediff('2015-01-01 12:00:00', '2016-02-09 13:01:01');
    expect(result).toEqual({
      years: 1,
      months: 1,
      weeks: 1,
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
      milliseconds: 0,
    });

    result = timediff('2015-01-01 12:00:00', '2017-03-17 14:02:02');
    expect(result).toEqual({
      years: 2,
      months: 2,
      weeks: 2,
      days: 2,
      hours: 2,
      minutes: 2,
      seconds: 2,
      milliseconds: 0,
    });

    result = timediff('2014-09-20 16:44:15', '2016-03-03 01:03:10');
    expect(result).toEqual({
      years: 1,
      months: 5,
      weeks: 1,
      days: 4,
      hours: 8,
      minutes: 18,
      seconds: 55,
      milliseconds: 0,
    });
  });

  it('should support years, months, weeks, days, hours, minutes, second and milliseconds as units', function () {
    const result = timediff(new Date(), new Date());
    expect(result.years).toBeDefined();
    expect(result.months).toBeDefined();
    expect(result.weeks).toBeDefined();
    expect(result.days).toBeDefined();
    expect(result.hours).toBeDefined();
    expect(result.minutes).toBeDefined();
    expect(result.seconds).toBeDefined();
    expect(result.milliseconds).toBeDefined();
  });

  it('should only set result unit keys that are selected via the options.units key', function () {
    const options = {
      units: {
        months: true,
        days: true,
        hours: true,
        minutes: true,
      },
    };
    const result = timediff('2014-09-18 16:44:15', '2015-01-13 21:49:10', options);
    expect(result.years).not.toBeDefined();
    expect(result.months).toBeDefined();
    expect(result.weeks).not.toBeDefined();
    expect(result.days).toBeDefined();
    expect(result.hours).toBeDefined();
    expect(result.minutes).toBeDefined();
    expect(result.seconds).not.toBeDefined();
    expect(result.milliseconds).not.toBeDefined();
  });

  it('should accept a string containing any of "YMWDHmSs" as options.units to select result units', function () {
    let options = { units: 'MDHm' };
    let result = timediff('2014-09-18 16:44:15', '2015-01-13 21:49:10', options);
    expect(result).toEqual({ months: 3, days: 26, hours: 5, minutes: 4 });

    options = { units: 'YMD' };
    result = timediff('1984-01-01', '2015-04-20 20:15:00', options);
    expect(result).toEqual({ years: 31, months: 3, days: 19 });
  });

  it('should accept an object containing any of the supported unit keys as options.units to select result units', function () {
    let options: Options = { units: { months: true, days: true, hours: true, minutes: true } };
    let result = timediff('2014-09-18 16:44:15', '2015-01-13 21:49:10', options);
    expect(result).toEqual({ months: 3, days: 26, hours: 5, minutes: 4 });

    options = { units: { years: true, months: true, days: true } };
    result = timediff('1984-01-01', '2015-04-20 20:15:00', options);
    expect(result).toEqual({ years: 31, months: 3, days: 19 });
  });

  it('should per default provide all requested units even if their value is 0', function () {
    const options = { units: 'YMD' };
    const result = timediff('2015-01-01', '2015-04-01', options);
    expect(result).toEqual({ years: 0, months: 3, days: 0 });
  });

  it('should provide only those requested units in the result whos values are not 0 if options.returnZeros === false', function () {
    const options = { units: 'YMD', returnZeros: false };
    const result = timediff('2015-01-01', '2015-04-01', options);
    expect(result).toEqual({ months: 3 });
    expect(result.years).not.toBeDefined();
    expect(result.days).not.toBeDefined();
  });

  it('should accept a string containing any of "YMWDHmSs" as third parameter to select result units', function () {
    const result = timediff('2014-09-18 16:44:15', '2015-01-13 21:49:10', 'MDHm');
    expect(result).toEqual({ months: 3, days: 26, hours: 5, minutes: 4 });
  });

  it('should accept now', function () {
    const result = timediff('2014-09-18 16:44:15', 'now', 'Y');
    expect(result).toEqual({ years: 9 });
  });
});
