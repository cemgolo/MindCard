import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { State } from "ts-fsrs";
import { cardStateColors } from "../storage/helper";
import { useState } from "react";

const ReviewSessionCardStateBar = ({ sessionCards }) => {
    const stateCounts = [State.New, State.Learning, State.Review, State.Relearning]
        .reduce((obj, state) => ({ ...obj, [state]: sessionCards[state]?.length ?? 0 }), {});

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <TouchableOpacity style={[styles.flexRow, styles.container]} onPress={() => setIsExpanded(!isExpanded)}>
            {Object.entries(stateCounts).map(([state, cardCount]) =>
                <View key={state} style={[styles.flexRow, styles.cardStateInfo, isExpanded && {width: '50%'}]}>
                    <View style={[styles.color, {backgroundColor: cardStateColors[state]}]} />
                    {isExpanded && <Text>{State[state]}:</Text>}
                    <Text>{cardCount}</Text>
                </View>
            )}
            <Text style={{marginLeft: 'auto'}}>{isExpanded ? '-' : '⋯'}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    container: {
        gap: 20,
        backgroundColor: '#e5e5e5',
        padding: 10
    },
    cardStateInfo: {
        gap: 5
    },
    color: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 3
    }
});

export default ReviewSessionCardStateBar;
