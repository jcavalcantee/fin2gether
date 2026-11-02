import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

import { Colors } from "@/constants/colors";

type TextFieldProps = {
    label: string;
    placeholder: string;
    secureTextEntry?: boolean;
    editable?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: TextInputProps["autoCapitalize"];
    autoComplete?: TextInputProps["autoComplete"];
    autoCorrect?: boolean;
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
    autoCapitalize = "sentences",
    autoComplete,
    autoCorrect = true,
    required = true,
    value,
    onChangeText,
}: TextFieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
                {required && <Text style={styles.required}> *</Text>}
            </Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={Colors.textMuted}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                editable={editable}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                value={value}
                onChangeText={onChangeText}
                accessibilityLabel={label}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
    label: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 15,
        color: Colors.text,
    },
    required: {
        color: "#991B1B",
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.borderInput,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        paddingHorizontal: 12,
        fontFamily: "Manrope_400Regular",
        fontSize: 15,
        color: Colors.text,
        height: 48,
    }
})