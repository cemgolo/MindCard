import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import buttonStyles from "../styles/buttons";
import Modal from "react-native-modal";

const Dialog = ({ children, isOpen, title = "Unnamed Dialog", confirmLabel = "Confirm", onConfirm, onCancel }) => {
    return (
        <Modal isVisible={isOpen} animationIn={"fadeInUp"} animationOut={"fadeOutDown"} backdropTransitionOutTiming={-1}>
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {children}
                    <ButtonContainer confirmLabel={confirmLabel} onConfirm={onConfirm} onCancel={onCancel} />
                </View>
            </View>
        </Modal>
    );
}

const ButtonContainer = ({ confirmLabel, onConfirm, onCancel }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={buttonStyles.secondary}
            onPress={onCancel}
            >
                <Text style={buttonStyles.secondaryText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={buttonStyles.primary}
            onPress={onConfirm}
            >
                <Text style={buttonStyles.primaryText}>{confirmLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    }
});

export default Dialog;
