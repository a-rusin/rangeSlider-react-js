import RangeSlider from "../RangeSlider/RangeSlider";

function App() {
    return (
        <div className="wrapper">
            <RangeSlider minDate="2014" maxDate="2021" minSelectedDate="0-2015" maxSelectedDate="0-2016" />
        </div>
    );
}

export default App;
