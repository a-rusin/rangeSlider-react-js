import RangeSlider from "../RangeSlider/RangeSlider";

function App() {
    return (
        <main>
            <section>
                <div className="wrapper">
                    <RangeSlider minDate="2014" maxDate="2021" minSelectedDate="05-2015" maxSelectedDate="06-2016" />
                </div>
            </section>
        </main>
    );
}

export default App;
