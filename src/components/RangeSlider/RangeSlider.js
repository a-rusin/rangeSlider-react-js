import { useEffect, useState } from "react";
import "./rangeSlider.css";

const RangeSlider = (props) => {
    const [minDate, setMinDate] = useState(+props.minDate);
    const [maxDate, setMaxDate] = useState(+props.maxDate);

    const [minSelectedDate, setMinSelectedDate] = useState(+props.minSelectedDate.split("-")[1] + (1 / 12) * props.minSelectedDate.split("-")[0]);

    const [maxSelectedDate, setMaxSelectedDate] = useState(+props.maxSelectedDate.split("-")[1] + (1 / 12) * props.maxSelectedDate.split("-")[0]);

    const [swicthMode, setSwicthMode] = useState("years");

    const activeClassSwitcher = "active";

    let step = 20 / (maxDate - minDate);
    let compensetionLeft = 40 + step * (minSelectedDate - minDate);
    let compensetionRight = 40 + step * (maxDate - maxSelectedDate);

    const rangeSliderInputMin = "rangeSlider-input-min";
    const rangeSliderInputMax = "rangeSlider-input-max";

    useEffect(() => {
        if (swicthMode === "years") {
            setMinDate(props.minDate);
            setMaxDate(props.maxDate);
        } else if (swicthMode === "month") {
            setMinDate(parseInt(minSelectedDate));
            setMaxDate(Math.ceil(maxSelectedDate));
        }
    }, [swicthMode]);

    const monthes = ["фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

    const monthsFormatValues = {
        0: "Январь",
        0.08: "Февраль",
        0.17: "Март",
        0.25: "Апрель",
        0.33: "Май",
        0.42: "Июнь",
        0.5: "Июль",
        0.58: "Август",
        0.67: "Сентябрь",
        0.75: "Октябрь",
        0.83: "Ноябрь",
        0.92: "Декабрь",
    };

    const rangeStep = 1 / 12; //12 - number of months in a year; 1 - basic step for range input

    const onChangeSelectedDate = (name, value) => {
        switch (name) {
            case rangeSliderInputMin:
                if (maxSelectedDate - value <= 1 && swicthMode === "years") {
                    setMinSelectedDate(maxSelectedDate - 1);
                } else if (maxSelectedDate - value <= rangeStep && swicthMode === "month") {
                    setMinSelectedDate(maxSelectedDate - rangeStep);
                } else {
                    setMinSelectedDate(value);
                }
                break;
            case rangeSliderInputMax:
                if (value - minSelectedDate <= 1 && swicthMode === "years") {
                    setMaxSelectedDate(+minSelectedDate + 1);
                } else if (value - minSelectedDate <= rangeStep && swicthMode === "month") {
                    setMaxSelectedDate(+minSelectedDate + rangeStep);
                } else {
                    setMaxSelectedDate(value);
                }
                break;
            default:
                break;
        }
    };

    const onChangeSwitchMode = (e) => {
        e.preventDefault();
        setSwicthMode(e.target.getAttribute("data-switchers"));
    };

    const ruleRender = (maxDate, minDate) => {
        let htmlRuler = [];

        let currentDifMaxMinYear = maxDate - minDate;
        let step = 100 / currentDifMaxMinYear;

        if (swicthMode === "years") {
            for (let i = 0; i <= currentDifMaxMinYear; i++) {
                let styleYears = {
                    left: `${step * i}%`,
                    transform: `translateX(-${step * i}%)`,
                };
                htmlRuler.push(
                    <li key={i} className="rangeSlider-years-item" style={styleYears}>
                        {minDate + i}
                    </li>
                );
            }
        } else if (swicthMode === "month") {
            for (let i = 0; i <= currentDifMaxMinYear; i++) {
                let styleYears = {
                    left: `${step * i}%`,
                    transform: `translateX(-${step * i}%)`,
                };
                htmlRuler.push(
                    <li key={i} className="rangeSlider-years-item rangeSlider-years-item-black" style={styleYears}>
                        {minDate + i}
                    </li>
                );
                if (i + parseInt(minDate) !== Math.ceil(maxDate)) {
                    monthes.forEach((month, j) => {
                        let monthPos = i * step + (j + 1) * (100 / currentDifMaxMinYear / 12);
                        let styleMonthes = {
                            left: `${monthPos}%`,
                            transform: `translateX(-${monthPos}%)`,
                        };
                        htmlRuler.push(
                            <li key={month + i} className="rangeSlider-years-item" style={styleMonthes}>
                                {month}
                            </li>
                        );
                    });
                }
            }
        }

        return htmlRuler;
    };

    return (
        <div className="rangeSlider-container">
            <div className="rangeSlider-switcher">
                <button data-switchers="years" className={swicthMode === "years" ? `rangeSlider-btn ${activeClassSwitcher}` : "rangeSlider-btn"} onClick={(e) => onChangeSwitchMode(e)}>
                    Все года
                </button>
                <button data-switchers="month" className={swicthMode === "month" ? `rangeSlider-btn ${activeClassSwitcher}` : "rangeSlider-btn"} onClick={(e) => onChangeSwitchMode(e)}>
                    Месяца
                </button>
            </div>
            <div className="rangeSlider-content">
                <div className="rangeSlider-slider">
                    <div
                        className="rangeSlider-progress"
                        style={{
                            left: 100 - (100 * (maxDate - minSelectedDate)) / (maxDate - minDate) + "%",
                            right: (100 * (maxDate - maxSelectedDate)) / (maxDate - minDate) + "%",
                        }}
                    ></div>
                </div>
                <div className="rangeSlider-inputs">
                    <div
                        className="rangeSlider-tooltip rangeSlider-tooltip-min"
                        style={{
                            left: 100 - (100 * (maxDate - minSelectedDate)) / (maxDate - minDate) + "%",
                            transform: `translateX(-${compensetionLeft}%)`,
                        }}
                    >
                        {monthsFormatValues[+(minSelectedDate % 1).toFixed(2)]} <br />
                        {parseInt(minSelectedDate)}
                    </div>
                    <div
                        className="rangeSlider-tooltip rangeSlider-tooltip-max"
                        style={{
                            right: (100 * (maxDate - maxSelectedDate)) / (maxDate - minDate) + "%",
                            transform: `translateX(${compensetionRight}%)`,
                        }}
                    >
                        {monthsFormatValues[+(maxSelectedDate % 1).toFixed(2)]} <br />
                        {parseInt(maxSelectedDate)}
                    </div>
                    <input type="range" name={rangeSliderInputMin} className="rangeSlider-input-min" min={minDate} max={maxDate} value={minSelectedDate} onChange={(e) => onChangeSelectedDate(e.target.name, e.target.value)} step={rangeStep} />
                    <input type="range" name={rangeSliderInputMax} className="rangeSlider-input-max" min={minDate} max={maxDate} value={maxSelectedDate} onChange={(e) => onChangeSelectedDate(e.target.name, e.target.value)} step={rangeStep} />
                </div>
                <ul className="rangeSlider-years-list">{ruleRender(+maxDate, +minDate)}</ul>
            </div>
        </div>
    );
};

export default RangeSlider;
