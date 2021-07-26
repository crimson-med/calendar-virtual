import { CalendarVirtual } from './../CalendarVirtual'
import {
    addDays
} from "date-fns";

// Define defaults
const realLength = 8
const virtualLength = 364
// Define test values
const nowDate = new Date()
const halfDate = addDays(nowDate, realLength / 2)
const endDate = addDays(nowDate, realLength)
const virtualEndDate = addDays(nowDate, virtualLength)
// Define test calendar
const testCalendar = new CalendarVirtual({
    realLength,
    virtualLength,
    genesisDate: nowDate
})

test('CalendarVirtual Genesis Date', () => {
    expect(testCalendar.virtualGenesisDate()).toStrictEqual(nowDate);
});

test('CalendarVirtual End Date', () => {
    expect(testCalendar.virtualEndDate().toLocaleDateString()).toStrictEqual(virtualEndDate.toLocaleDateString());
});

test('CalendarVirtual Days to End', () => {
    expect(testCalendar.daysToEnd()).toStrictEqual(virtualLength - 1);
});

test('CalendarVirtual Distance to End', () => {
    expect(typeof testCalendar.distanceToEnd()).toBe('string');
});

test('CalendarVirtual Half Date is Before Genesis', () => {
    expect(testCalendar.isBeforeGenesis(halfDate)).toStrictEqual(false);
});

test('CalendarVirtual Half Date is Past Genesis', () => {
    expect(testCalendar.isPastGenesis(halfDate)).toStrictEqual(true);
});

test('CalendarVirtual Half Date is Before End', () => {
    expect(testCalendar.isBeforeEnd(halfDate)).toStrictEqual(true);
});

test('CalendarVirtual Half Date is Past End', () => {
    expect(testCalendar.isPastEnd(halfDate)).toStrictEqual(false);
});

test('CalendarVirtual Real Date', () => {
    expect(testCalendar.realDate(testCalendar.virtualEndDate()).toLocaleDateString()).toStrictEqual(endDate.toLocaleDateString());
});