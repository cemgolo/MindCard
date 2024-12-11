import { cardStateColors } from "../storage/helper";
import { State } from "ts-fsrs";
import PieChart from "./PieChart";

const CardStatesPieChart = ({ cards, title = "Cards to study today", height }) => {
    const data = Object.entries(cardStateColors).map(([state, stateColor]) => ({
        name: State[state],
        count: cards[state]?.filter(card => card.state == state).length ?? 0,
        color: stateColor,
        legendFontColor: "#333",
        legendFontSize: 14
      }));

    return (
        <PieChart data={data} title={title} height={height} />
    );
};

export default CardStatesPieChart;

