import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import buttonStyles from "../../styles/buttons";

const Dialog = ({ children, isDestructiveAction = false, isOpen, emoji = "", title = "Unnamed Dialog", confirmLabel = "Confirm", onConfirm, onCancel }) => {
    return (
        <Modal isVisible={isOpen} animationIn={"fadeInUp"} animationOut={"fadeOutDown"} backdropTransitionOutTiming={-1}>
            <View style={styles.contentContainer}>
                {emoji && <Text style={styles.emoji}>{emoji}</Text>}
                <Text style={styles.title}>{title}</Text>
                {children}
                <ButtonContainer confirmLabel={confirmLabel} isDestructiveAction={isDestructiveAction} onConfirm={onConfirm} onCancel={onCancel} />
            </View>
        </Modal>
    );
}

const ButtonContainer = ({ confirmLabel, isDestructiveAction, onConfirm, onCancel }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={[buttonStyles.secondary, {flex: 1}]}
            onPress={onCancel}
            >
                <Text style={buttonStyles.secondaryText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[buttonStyles.primary, isDestructiveAction && {backgroundColor: 'red'}, {flex: 1}]}
            onPress={onConfirm}
            >
                <Text style={buttonStyles.primaryText}>{confirmLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      alignItems: 'center',
      margin: 'auto'
    },
    emoji: {
        fontSize: 40,
        marginBottom: 20
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
    }
});

export default Dialog;
