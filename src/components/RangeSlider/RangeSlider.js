import { useEffect, useState } from "react";
import "./rangeSlider.css";

const RangeSlider = (props) => {
    const [minDate, setMinDate] = useState(+props.minDate);
    const [maxDate, setMaxDate] = useState(+props.maxDate);

    const [minSelectedDate, setMinSelectedDate] = useState(+props.minSelectedDate.split("-")[1] + (1 / 12) * props.minSelectedDate.split("-")[0]);

    const [maxSelectedDate, setMaxSelectedDate] = useState(+props.maxSelectedDate.split("-")[1] + (1 / 12) * props.maxSelectedDate.split("-")[0]);

    const [swicthMode, setSwicthMode] = useState("years");

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

    const onChangeMinSelectedDate = (minValue) => {
        if (maxSelectedDate - minValue <= 1 && swicthMode === "years") {
            setMinSelectedDate(maxSelectedDate - 1);
        } else if (maxSelectedDate - minValue <= 0.0833333333333333 && swicthMode === "month") {
            setMinSelectedDate(maxSelectedDate - 0.0833333333333333);
        } else {
            setMinSelectedDate(minValue);
        }
    };

    const onChangeMaxSelectedDate = (maxValue) => {
        if (maxValue - minSelectedDate <= 1 && swicthMode === "years") {
            setMaxSelectedDate(+minSelectedDate + 1);
        } else if (maxValue - minSelectedDate <= 0.0833333333333333 && swicthMode === "month") {
            setMaxSelectedDate(+minSelectedDate + 0.0833333333333333);
        } else {
            setMaxSelectedDate(maxValue);
        }
    };

    const onChangeSwitchMode = (e) => {
        e.preventDefault();
        setSwicthMode(e.target.getAttribute("data-switchers"));
    };

    const ruleRender = (maxDate, minDate) => {
        let htmlRuler = [];

        if (swicthMode === "years") {
            for (let i = 0; i <= maxDate - minDate; i++) {
                let step = maxDate - minDate;
                let positionLeft = i * (100 / step);
                htmlRuler.push(
                    <li key={i} className="rangeSlider-years-item" style={{ left: positionLeft + "%" }}>
                        {minDate + i}
                    </li>
                );
            }
        } else if (swicthMode === "month") {
            for (let i = 0; i <= maxDate - minDate; i++) {
                let step = maxDate - minDate;
                let positionLeft = i * (100 / step);
                htmlRuler.push(
                    <li key={i} className="rangeSlider-years-item rangeSlider-years-item-black" style={{ left: positionLeft + "%" }}>
                        {minDate + i}
                    </li>
                );
                if (i + parseInt(minDate) !== Math.ceil(maxDate)) {
                    monthes.forEach((month, j) =>
                        htmlRuler.push(
                            <li key={month + i} className="rangeSlider-years-item" style={{ left: positionLeft + (j + 1) * (((i + 1) * (100 / step) - positionLeft) / 12) + "%" }}>
                                {month}
                            </li>
                        )
                    );
                }
            }
        }

        return htmlRuler;
    };

    let step = 20 / (maxDate - minDate);
    let compensetionLeft = 40 + step * (minSelectedDate - minDate);
    let compensetionRight = 40 + step * (maxDate - maxSelectedDate);

    return (
        <div className="rangeSlider-container">
            <div className="rangeSlider-switcher">
                <a href="#" data-switchers="years" className={swicthMode === "years" ? "rangeSldier-link active" : "rangeSldier-link"} onClick={(e) => onChangeSwitchMode(e)}>
                    Все года
                </a>
                <a href="#" data-switchers="month" className={swicthMode === "month" ? "rangeSldier-link active" : "rangeSldier-link"} onClick={(e) => onChangeSwitchMode(e)}>
                    Месяца
                </a>
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
                    <input type="range" name="rangeSlider-input-min" className="rangeSlider-input-min" min={minDate} max={maxDate} value={minSelectedDate} onChange={(e) => onChangeMinSelectedDate(e.target.value)} step="0.0833333333333333" />
                    <input type="range" name="rangeSlider-input-max" className="rangeSlider-input-max" min={minDate} max={maxDate} value={maxSelectedDate} onChange={(e) => onChangeMaxSelectedDate(e.target.value)} step="0.0833333333333333" />
                </div>
                <ul className="rangeSlider-years-list">{ruleRender(+maxDate, +minDate)}</ul>
            </div>
        </div>
    );
};

export default RangeSlider;
