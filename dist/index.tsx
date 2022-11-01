import { createEffect, createMemo, createSignal } from "solid-js";
import './assets/stylesheets/base.scss';
import moment from 'moment';
import { monthList, viewList, weekDays } from "./utils/constant";

import caledarTimeIcon from './assets/icons/calender-time.svg';
import rightArrowIcon from './assets/icons/right-arrow.svg';
import leftArrowIcon from './assets/icons/left-arrow.svg';
import roundedRightArrowIcon from './assets/icons/round-right-arrow.svg';
import roundedleftArrowIcon from './assets/icons/round-left-arrow.svg';
import timingLogo from './assets/icons/time.svg';
import calendarViewIcon from './assets/icons/calendarView.svg'

interface IPropsValue {
    activeView: string;
    startDate?: Date;
    endDate?: Date;
    currentDate?: Date;
    dateRangeDifference: number;
    date: string;
    month: string;
    year: string;
    day: string;
    time: string;
    currentWeekStartDate: Date;
    currentWeekEndDate: Date;
    // currentQuarter: number;
    // prevQuarter: number;
    // nextQuarter: number;
}

interface ICalendarComponentProps {
    dateFormat?: string;
    customizeRangeSelectedDates?: string;
    prevDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    enableDateRangeSelector?: boolean;
    currentDate: Date | string;
    headerMonthFormat?: string;
    headerYearFormat?: string
    enableArrowNavigation?: boolean;
    enableSelectedDate?: boolean;
    enableSelectedDateEditor?: boolean
    enableTodayNavigator?: boolean;
    customizeSelectedDate?: string;
    customizeLeftArrow?: string;
    customizeRightArrow?: string;
    customizeActiveMonth?: string;
    customizeTodayNavigator?: string;
    activeCalendarView?: 'day' | 'month' | 'year';
    cutomizeCalendarViewButtons?: string;
    enableCalendarViewType?: boolean;
    customizeListView?: string;
    customizeListHeader?: string;
    customizeYearLeftNavigationArrow?: string;
    customizeYearRightNavigationArrow?: string;
    enableTimeView?: boolean;
    ednableTimeEditing?: boolean;
    customizeTimeViewSwitch?: string;
    customizeTimeInputField?: string;
    customizeTimeUpdateButton?: string;
    customizeConsolidateTimeView?: string;
    customizeTimeDownArrow?: string;
    customizeTimeUpArrow?: string;
    renameTimeUpdateButton?: string;
    calendarResponse?: (props: IPropsValue) => void;
}

export const DateTimePicker = (
    {
        currentDate,
        enableDateRangeSelector = false,
        prevDate = moment().startOf('weeks').toDate(),
        minDate,
        maxDate,
        customizeRangeSelectedDates = '',

        // header
        headerMonthFormat = 'MMM',
        headerYearFormat = 'YYYY',
        enableArrowNavigation = true,
        customizeLeftArrow = '',
        customizeRightArrow = '',
        customizeActiveMonth = '',

        // section 1
        enableSelectedDate = true,
        enableSelectedDateEditor = false,
        dateFormat = 'DD MMM, YYYY',
        customizeSelectedDate = '',
        //
        enableTodayNavigator = false,
        customizeTodayNavigator = '',

        // section 2
        cutomizeCalendarViewButtons = '',
        activeCalendarView = 'day',
        enableCalendarViewType = false,

        // Container
        customizeListView = '',
        customizeListHeader = '',
        customizeYearLeftNavigationArrow = '',
        customizeYearRightNavigationArrow = '',

        // Time
        enableTimeView = false,
        ednableTimeEditing = false,
        customizeTimeViewSwitch = '',
        customizeTimeInputField = '',
        customizeTimeUpdateButton = '',
        customizeConsolidateTimeView = '',
        customizeTimeDownArrow = '',
        customizeTimeUpArrow = '',
        renameTimeUpdateButton = '',

        // Output
        calendarResponse

    }: ICalendarComponentProps) => {

    const [locDate, setLocDate] = createSignal<Date | undefined>();

    const [previousDateState, setPreviousDate] = createSignal<Date | undefined>();

    const [dateRangeArr, setdateRangeArr] = createSignal<Date[]>([]);

    const [headerView, setHeaderView] = createSignal<{ [key: string]: number | string }>({ monthIndex: 0, month: '', year: 0 });

    const [activeView, setActiveView] = createSignal<string>(activeCalendarView);

    const [yearRangeOffset, setYearRangeOffset] = createSignal({ start: new Date(currentDate).getFullYear() - 4, offset: 0 });

    const [isTimeViewEnabled, setTimeView] = createSignal(false);

    const [timeValue, setTime] = createSignal<{ [key: string]: string }>({ hour: '', min: '', meridiem: '' })

    // const [isSelectedDateInvalid, setSelectedDateState] = createSignal<Boolean>(false);

    const dateList = createMemo(() => {
        const currentMonth = headerView().monthIndex;
        const currentYear = headerView().year;
        const monthStartDate = moment(`${currentMonth}, ${currentYear}`, 'MM, YYYY').startOf('month').format('DD MMMM, YYYY');

        const weekStartDate = moment(monthStartDate, 'DD MMMM, YYYY').startOf('week').toDate();

        return [...Array(42)].map((_1, index) => {
            return moment(weekStartDate).add(index, 'days').toDate();
        })
    })

    const momentFormatter = (date: Date | undefined, formatStr: string) => {
        return moment(date).format(formatStr);
    }

    // Render only once
    createEffect(() => {
        setPreviousDate(prevDate);
        setLocDate(moment(currentDate).toDate());
        const startDate = moment(prevDate).toDate();
        const endDate = moment(currentDate).toDate();
        setdateRangeArr([startDate, endDate]);
    });

    //  Render based on locDate;
    createEffect(() => {
        const curentMeridiem = momentFormatter(locDate(), 'A');
        setTime({ hour: momentFormatter(locDate(), 'HH'), min: momentFormatter(locDate(), 'mm'), meridiem: curentMeridiem });
        const month = Number(momentFormatter(locDate(), 'MM'));
        setHeaderView(() => ({
            monthIndex: month,
            month: momentFormatter(locDate(), headerMonthFormat),
            year: momentFormatter(locDate(), headerYearFormat)
        }));
    });

    createEffect(() => {
        if (calendarResponse) {
            calendarResponse({
                activeView: activeView(),
                startDate: previousDateState(),
                endDate: locDate(),
                currentDate: locDate(),
                dateRangeDifference: Math.abs((locDate()?.getDate() || 0) - (previousDateState()?.getDate() || 0)),
                date: momentFormatter(locDate(), 'DD'),
                month: momentFormatter(locDate(), 'MM'),
                year: momentFormatter(locDate(), 'YYYY'),
                day: momentFormatter(locDate(), 'dddd'),
                time: momentFormatter(locDate(), 'HH : MM'),
                currentWeekStartDate: moment(locDate()).startOf('weeks').toDate(),
                currentWeekEndDate: moment(locDate()).endOf('weeks').toDate(),
            })
        }
    })

    const headerNavigation = (index: number) => {

        const activeYear = Number(headerView().year);
        const activeMonthIndex = Number(headerView().monthIndex);
        const monthVal = new Date(activeYear, activeMonthIndex + (index), 0);

        setHeaderView(() => ({
            monthIndex: monthVal.getMonth() + 1,
            month: momentFormatter(monthVal, headerMonthFormat),
            year: momentFormatter(monthVal, headerYearFormat)
        }));
    }

    const yearViewNavigation = (value: Date) => {
        // navigate year range during input field onchange and today onClick
        if ((yearRangeOffset().start > value.getFullYear() || ((yearRangeOffset().start + 8) < value.getFullYear()))) {
            setYearRangeOffset({ start: value.getFullYear() - 4, offset: 0 })
        }
    }

    const editDate = (value: string) => {
        // handles onChange in Date edit field
        const currentDate: any = moment(value, dateFormat).toDate();
        if (currentDate.toString() !== 'Invalid Date') {
            if (!dateRangeArr()[1]) {
                setdateRangeArr([...dateRangeArr(), currentDate])
            }
            setLocDate(currentDate);
            yearViewNavigation(currentDate)
        }
    }

    const monthSelection = (selectedMonthInd: number) => {
        // handles month view selection
        const activeYear = Number(headerView().year);
        const newDate = new Date(activeYear, selectedMonthInd - 1, locDate()?.getDate());
        if (newDate.toString() !== 'Invalid Date') {
            setLocDate(newDate);
        } else {
            setLocDate(new Date(activeYear, selectedMonthInd, 1))
        }
    }

    const yearNavigation = (value: number) => {
        // handles year view range during navigation
        const offset = yearRangeOffset().offset + (value)
        const startYear = yearRangeOffset().start + (9 * value);
        setYearRangeOffset({ start: startYear, offset: offset })
    }

    const handleTimeChange = (value: number, key: string, range: number) => {
        const data = Number(timeValue()[key]) + value;
        if (data >= 0 && data <= range) {
            const value = data < 10 ? `0${String(data)}` : data;
            setTime({ ...timeValue(), [key]: String(value) })
        }
    }

    const handleMultiSelectDate = (value: Date) => {
        if (dateRangeArr().length === 2) {
            setdateRangeArr([value]);
        } else {
            setdateRangeArr([...dateRangeArr(), moment(value).endOf('days').toDate()])
        }
    }

    createEffect(() => {
        if (dateRangeArr()[0]) {
            setPreviousDate(dateRangeArr()[0]);
        }
        if (dateRangeArr()[1]) {
            setLocDate(dateRangeArr()[1]);
        }
    })

    return (
        <div class='cal-parent'>
            {/* Header */}
            <div class='cal-header'>
                {
                    enableArrowNavigation ?
                        <div
                            class={`left-arrow ${activeView() === 'day' ? 'cur-pointer' : 'v-none'} ${customizeLeftArrow}`}
                            onClick={() => headerNavigation(-1)}
                        >
                            <img src={leftArrowIcon} alt='left arrow' />
                        </div>
                        : null
                }
                <div class={`date-val ${customizeActiveMonth}`}> {headerView().month} - {headerView().year} </div>
                {
                    enableArrowNavigation ?
                        <div
                            class={`right-arrow ${activeView() === 'day' ? 'cur-pointer' : 'v-none'} ${customizeRightArrow}`}
                            onClick={() => { if (activeView() === 'day') headerNavigation(1) }}
                        >
                            <img src={rightArrowIcon} alt='right arrow' />
                        </div>
                        : null
                }
            </div>

            {/* Sub Header */}
            {enableTodayNavigator || enableSelectedDate ?
                <div class='cal-sub-header'>
                    {enableTodayNavigator && !enableDateRangeSelector ?
                        <button
                            class={`jump-today cur-pointer box-shadow-card ${customizeTodayNavigator}`}
                            onClick={() => {
                                const newDate = moment().toDate();
                                yearViewNavigation(newDate);
                                setLocDate(newDate);
                            }}
                        >
                            Today
                        </button> : null
                    }

                    {enableSelectedDate &&
                        <div class='today-col'>
                            <input
                                type='text'
                                placeholder='DD MMM YYYY'
                                class={`today-col-input box-shadow-card ${customizeSelectedDate}`}
                                value={momentFormatter(locDate() || moment().toDate(), dateFormat)}
                                readOnly={!enableSelectedDateEditor}
                                onKeyPress={(event: any) => {
                                    if (event.key === 'Enter' && event.target.value) {
                                        editDate(event.target.value);
                                    }
                                }}
                            />
                        </div>
                    }
                    {enableTimeView ? <img
                        class={`time-icon cur-pointer ${customizeTimeViewSwitch}`}
                        src={isTimeViewEnabled() ? calendarViewIcon : timingLogo}
                        alt='Day Time Icon'
                        onClick={() => {
                            setTimeView(!isTimeViewEnabled());
                        }}
                    /> : null}
                </div> : null
            }

            {/* Calendar View sub-header */}
            {enableCalendarViewType ?
                <div class='cal-sub-header-section'>
                    {viewList.map((it) => {
                        return (
                            <button
                                class={`view-options box-shadow-card cur-pointer  ${cutomizeCalendarViewButtons} ${it.value === activeView() ? 'active' : ''}`}
                                onClick={() => {
                                    if (isTimeViewEnabled()) {
                                        setTimeView(false)
                                    }
                                    setActiveView(it.value);
                                }}
                            >
                                {it.label}
                            </button>
                        )
                    })}
                </div> : null}

            {/* Month View */}
            <div class={`main-container ${activeView() === 'day' ? 'container-day_view__header ' : ''}`}>
                {activeView() !== 'month' || isTimeViewEnabled() ? null :
                    <div class='container-month-view'>
                        {monthList.map((it, monthIndex) => {
                            let isMonthDisabled = false;

                            if (maxDate) {
                                if (Number(maxDate.getFullYear()) < Number(locDate()?.getFullYear())) {
                                    isMonthDisabled = true;
                                }
                                else if (Number(maxDate.getFullYear()) === Number(locDate()?.getFullYear())) {
                                    isMonthDisabled = Number(maxDate.getMonth()) < monthIndex
                                }
                            }
                            if (minDate) {
                                if (Number(minDate.getFullYear()) > Number(locDate()?.getFullYear())) {
                                    isMonthDisabled = true;
                                }
                                else if (Number(minDate.getFullYear()) === Number(locDate()?.getFullYear())) {
                                    isMonthDisabled = isMonthDisabled || Number(minDate.getMonth()) > monthIndex
                                }
                            }

                            return (
                                <div
                                    class={`container-list cur-pointer ${customizeListView} ${((locDate()?.getMonth() || 0) + 1) === it.monthIndex ? 'active box-shadow-card' : ''} ${isMonthDisabled ? 'cust-dis pointer-none' : ''}`}
                                    onClick={() => monthSelection(it.monthIndex)}
                                >
                                    {it.short}
                                </div>
                            )
                        })}
                    </div>
                }

                {/* Year View */}
                {activeView() !== 'year' || isTimeViewEnabled() ? null :
                    <div class='container-year-view'>
                        <img src={roundedleftArrowIcon} class={`${customizeYearLeftNavigationArrow} year-navi__icon cur-pointer`} alt='left arrow' onClick={() => { yearNavigation(-1) }} />

                        <div class='container-year-list'>
                            {[...Array(9)].map((_1, index) => {
                                const value = yearRangeOffset().start + index;
                                const fullYear = Number(momentFormatter(locDate(), 'YYYY'));
                                const month = Number(momentFormatter(locDate(), 'MM'));
                                const date = Number(momentFormatter(locDate(), 'DD'));
                                let isYearDisabled = false;
                                if (maxDate || minDate) {
                                    isYearDisabled = (maxDate ? value > Number(maxDate.getFullYear()) : isYearDisabled) || (minDate ? value < Number(minDate.getFullYear()) : isYearDisabled);
                                }

                                return (
                                    <div
                                        class={`container-list cur-pointer ${customizeListView} ${value === fullYear ? 'active box-shadow-card' : ''} ${isYearDisabled ? 'cust-dis pointer-none' : ''}`}
                                        onClick={() => { setLocDate(new Date(value, month, date)) }}
                                    >
                                        {`${value}`}
                                    </div>
                                )
                            })}
                        </div>
                        <img src={roundedRightArrowIcon} class={`${customizeYearRightNavigationArrow} year-navi__icon cur-pointer`} alt='right arrow' onClick={() => { yearNavigation(1) }} />
                    </div>
                }

                {/* Day view */}
                {activeView() !== 'day' || isTimeViewEnabled() ? null :
                    <div class='container-day-view'>

                        <div class='list-header week-list'>
                            {weekDays.map((it) => {
                                return (
                                    <div class={`week-list-items pointer-none ${customizeListHeader}`}>{it.short}</div>
                                )
                            })}
                        </div>
                        <div class='week-list week-list__date'>
                            {dateList().map((it) => {
                                const startDate = moment(`${headerView().month}, ${headerView().year}`, 'MMM, YYYY').startOf('months').toDate();
                                const endDate = moment(`${headerView().month}, ${headerView().year}`, 'MMM, YYYY').endOf('months').toDate();

                                let isActive = false; // gives selected dates
                                let isRangeActive = false; // highlights the dates in-between
                                let isDatesDisabled = false; // disables the prev date during selection 

                                if (enableDateRangeSelector) {

                                    if (dateRangeArr()[0] && !dateRangeArr()[1]) {
                                        isActive = moment(it).isSame(moment(previousDateState()).startOf('days'));
                                        isDatesDisabled = moment(it).isBefore(moment(previousDateState()).startOf('days'));
                                        isRangeActive = false;
                                    }
                                    else if (dateRangeArr()[0] && dateRangeArr()[1]) {
                                        isActive = moment(it).isSame(moment(locDate()).startOf('days')) || moment(it).isSame(moment(previousDateState()).startOf('days'));
                                        isRangeActive = moment(it).isAfter(moment(previousDateState()).startOf('days')) && moment(it).isBefore(moment(locDate()).startOf('days'));
                                    }
                                } else {
                                    isActive = moment(it).isSame(moment(locDate()).startOf('days'));
                                }

                                // handles Max date given by user 
                                if (maxDate) {
                                    isDatesDisabled = isDatesDisabled || moment(it).isSameOrAfter(moment(maxDate).startOf('days'));
                                }
                                if (minDate) {
                                    isDatesDisabled = isDatesDisabled || moment(it).isSameOrBefore(moment(minDate).startOf('days'));
                                }
                                return (
                                    <div
                                        class={`week-list-items cur-pointer 
                                        ${isActive ? `${enableDateRangeSelector ? 'active-bg' : 'active '} box-shadow-card` : ''} 
                                        ${customizeListView}
                                        ${it < startDate || it > endDate ? 'cust-dis' : ''}
                                        ${isRangeActive ? `bg-hover-clr ${customizeRangeSelectedDates}` : ''}
                                        ${isDatesDisabled ? 'cust-dis pointer-none' : ''}
                                        `}
                                        onClick={() => {
                                            if (enableDateRangeSelector) {
                                                handleMultiSelectDate(it);
                                            } else {
                                                setLocDate(it);
                                            }
                                        }}
                                    >
                                        {momentFormatter(it, 'DD')}
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                }
                {!isTimeViewEnabled() ? null :
                    <div>
                        <div class='time-picker'>
                            <div class={`time-hours-picker`}>
                                <img
                                    src={roundedleftArrowIcon}
                                    class={`increment-icon icon_size cur-pointer box-shadow-card ${timeValue().hour === '00' ? 'pointer-none cust-dis' : ''} ${customizeTimeDownArrow}`}
                                    alt='hour-increment'
                                    onClick={() => {
                                        handleTimeChange(-1, 'hour', 23);
                                    }}
                                />
                                <input
                                    class={`${customizeTimeInputField} hour_value`}
                                    value={timeValue().hour}
                                    type='number'
                                    readOnly={!ednableTimeEditing}
                                    onKeyPress={(e: any) => {
                                        if (e.target?.value <= 24 && e.target?.value >= 0 && e.code === 'Enter') {
                                            const value = e.target?.value < 10 ? `0${e.target?.value}` : e.target?.value;
                                            setTime({ ...timeValue(), hour: value })
                                        }
                                    }}
                                />
                                <img
                                    src={roundedleftArrowIcon}
                                    class={`decrement-icon icon_size cur-pointer box-shadow-card ${timeValue().hour === '23' ? 'pointer-none cust-dis' : ''} ${customizeTimeUpArrow}`}
                                    alt='hour-decrement'
                                    onClick={() => {
                                        handleTimeChange(1, 'hour', 23);
                                    }}
                                />
                            </div>

                            <div class={`time-seperator`}>:</div>
                            <div class={`time-mins-picker`}>
                                <img
                                    src={roundedleftArrowIcon}
                                    class={`increment-icon icon_size cur-pointer box-shadow-card ${timeValue().min === '00' ? 'pointer-none cust-dis' : ''} ${customizeTimeDownArrow}`}
                                    alt='min-increment'
                                    onClick={() => {
                                        handleTimeChange(-1, 'min', 59);
                                    }}
                                />
                                <input
                                    class={`${customizeTimeInputField} min_value`}
                                    value={timeValue().min}
                                    type='number'
                                    readOnly={!ednableTimeEditing}
                                    onKeyPress={(e: any) => {
                                        if (e.target?.value <= 60 && e.target?.value >= 0 && e.code === 'Enter') {
                                            const value = e.target?.value < 10 ? `0${e.target?.value}` : e.target?.value;
                                            setTime({ ...timeValue(), min: value })
                                        }
                                    }}
                                />
                                <img
                                    src={roundedleftArrowIcon}
                                    class={`decrement-icon icon_size cur-pointer box-shadow-card ${timeValue().min === '59' ? 'pointer-none cust-dis' : ''} ${customizeTimeUpArrow}`}
                                    alt='min-decrement'
                                    onClick={() => {
                                        handleTimeChange(1, 'min', 59);
                                    }}
                                />
                            </div>
                        </div>
                        <div class={`time-parent`}>

                            <div class={`time-view box-shadow-card ${customizeConsolidateTimeView}`}>
                                <img class={`time-icon-container`} src={caledarTimeIcon} alt='Day Time Icon' />
                                <div class='time-value'>
                                    <div class='show-only'>
                                        {momentFormatter(locDate(), 'ddd DD MMM, YYYY ')}{timeValue().hour}:{timeValue().min}
                                    </div>
                                </div>
                            </div>
                            <button
                                class={`update-time cur-pointer ${customizeTimeUpdateButton}`}
                                onClick={() => {
                                    const newDate = moment(locDate());
                                    newDate.set('hour', Number(timeValue().hour))
                                    newDate.set('minute', Number(timeValue().min));
                                    if (!moment(locDate()).isSame(newDate.toDate())) {
                                        setLocDate(newDate.toDate());
                                        setTimeView(false);
                                    }
                                }}
                            >
                                {renameTimeUpdateButton || 'UPDATE'}
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}