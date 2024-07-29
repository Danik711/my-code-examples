import EncryptedStorage from "react-native-encrypted-storage";

export async function storeValue(key: string, value: string) {
    try {
        await EncryptedStorage.setItem(
            key,
            value
        );

        return true;
    } catch(error) {
        return false;
    }
}

export async function getValue(key: string) {
    try {
        const jsonVal = await EncryptedStorage.getItem(key);

        return JSON.parse(jsonVal ?? "");
    } catch(error) {
        return "";
    }
}

export async function removeValue(key: string) {
    try {
        await EncryptedStorage.removeItem(key);
    } catch(error) {

    }
}

export async function clearStorage() {
    try {
        await EncryptedStorage.clear();
    } catch(error) {
        
    }
}