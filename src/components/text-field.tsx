import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/colors";

type TextFieldProps = {
    label: string;
    placeholder: string;
    secureTextEntry?: boolean;
    editable?: boolean;
    keyboardType?: KeyboardTypeOptions;
    required?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

export function TextFieldComponent({ 
    label, 
    placeholder, 
    secureTextEntry = false, 
    editable = true, 
    keyboardType = "default", 
    required = true, 
    value, 
    onChangeText,
}: TextFieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {required && <Text style={{ color: 'red'}}>*</Text>}
                {label}
            </Text>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                editable={editable}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.borderInput,
        borderRadius: 12,
        padding: 12,
        fontFamily: "Manrope_400Regular",
        fontSize: 14,
        height: 48,
        width: '90%'
    }
})