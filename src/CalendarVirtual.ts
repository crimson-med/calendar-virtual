import { CalendarVirtualConfig } from "./types";
import {
    addDays, compareAsc, differenceInDays, formatDistance,
} from "date-fns";

/**
 * Create a Virtual Calendar to track in game dates
 */
export class CalendarVirtual {
    private virtualLength: number
    private realLength: number
    private ratio: number
    private genesisDate: Date
    /**
     * Initiates a new Virtual Calendar
     * @param config Configuration of the virtual calendar
     */
    constructor(config: CalendarVirtualConfig) {
        this.ratio = config.virtualLength / config.realLength
        this.realLength = config.realLength
        this.virtualLength = config.virtualLength
        this.genesisDate = config.genesisDate
    }

    /**
     * Get the difference between two dates
     * @param firstDate First date 
     * @param secondDate Second date
     * @returns Difference rounded to nearest whole number to deal with DST
     */
    private dateDiff = (firstDate: any, secondDate: any) => {
        return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
    }

    /**
     * Get the genesis of the virtual calendar
     * @returns The genesis date of the virtual calendar
     */
    virtualGenesisDate = () => {
        return this.genesisDate
    }

    /**
     * Get the end of the virtual calendar
     * @returns The end date of the virtual calendar
     */
    virtualEndDate = () => {
        return addDays(this.genesisDate, this.virtualLength)
    }

    /**
     * Get the distance to the end of the virtual calendar
     * @param dateFrom `(optional)` A start date otherwise the default is now
     * @returns `String` readable distance to end of virtual calendar
     */
    distanceToEnd = (dateFrom?: Date) => {
        const origin = (dateFrom) ? dateFrom : new Date()
        return formatDistance(this.virtualEndDate(), origin)
    }

    /**
     * Get the remaining days to the end of the virtual calendar
     * @param dateFrom `(optional)` A start date otherwise the default is now
     * @returns number of days to end of the virtual calendar
     */
    daysToEnd = (dateFrom?: Date) => {
        const origin = (dateFrom) ? dateFrom : new Date()
        return differenceInDays(this.virtualEndDate(), origin)
    }

    /**
     * Check if a date or now is past the end of the virtual calendar
     * @param dateFrom  `(optional)` A start date otherwise the default is now
     * @returns boolean if date is past the end of the virtual calendar
     */
    isPastEnd = (dateFrom?: Date) => {
        const origin = (dateFrom) ? dateFrom : new Date()
        return (compareAsc(this.virtualEndDate(), origin) === 1) ? false : true
    }

    /**
     * Check if a date or now is past the genesis of the virtual calendar
     * @param dateFrom  `(optional)` A start date otherwise the default is now
     * @returns boolean if date is past the genesis of the virtual calendar
     */
    isPastGenesis = (dateFrom?: Date) => {
        const origin = (dateFrom) ? dateFrom : new Date()
        return (compareAsc(this.genesisDate, origin) === 1) ? false : true
    }

    /**
     * Check if a date or now is before the genesis of the virtual calendar
     * @param dateFrom  `(optional)` A start date otherwise the default is now
     * @returns boolean if date is before the genesis of the virtual calendar
     */
    isBeforeGenesis = (dateFrom?: Date) => {
        const origin = (dateFrom) ? dateFrom : new Date()
        return (compareAsc(this.genesisDate, origin) === 1) ? true : false
    }

    /**
     * Check if a date or now is before the end of the virtual calendar
     * @param dateFrom  `(optional)` A start date otherwise the default is now
     * @returns boolean if date is before the end of the virtual calendar
     */
    isBeforeEnd = (dateFrom?: Date) => {
        const origin = (dateFrom) ? dateFrom : new Date()
        return (compareAsc(this.virtualEndDate(), origin) === 1) ? true : false
    }

    /**
     * Translate a real life date to a the corresponding date in the virtual calendar
     * @param realDate the date to translate to a virtual date
     * @returns the date in the virtual calendar
     */
    virtualDate = (realDate: Date) => {
        const diff = this.dateDiff(this.genesisDate, realDate)
        const virtualDate = new Date();
        virtualDate.setDate(this.genesisDate.getDate() + diff * this.ratio);
        return virtualDate;
    }

    /**
     * Translate a virtual date to a the corresponding real date
     * @param virtualDate the date to translate to a real date
     * @returns the date in the real calendar
     */
    realDate = (virtualDate: Date) => {
        const diff = this.dateDiff(this.genesisDate, virtualDate)
        const realDate = new Date();
        realDate.setDate(this.genesisDate.getDate() + diff / this.ratio);
        return realDate;
    }
}