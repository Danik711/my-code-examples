import { AxiosError } from "axios";
import baseService from "../../../back-end/base-service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helpers
import { errorMessages } from "../../../../assets/textsInApp";
import { USER_REGISTER_API_REDUCER } from "../../reducers-names";

/**
 * const USER_REGISTER_API_REDUCER = "userRegister";
 */

export type UserRegisterResponseType = {
    token_type: string;
    access_token: string;
};

export type UserRegisterBodyType = {
    name: string;
    city_id: number;
    password: string;
    phone_number: string;
    kaspi_phone_number: string;
    password_confirmation: string;
};

const initialState = {
    error: "",
    response: {
        token_type: "",
        access_token: "",
    },
    isLoading: false,
};

export const userRegisterApi = createAsyncThunk<UserRegisterResponseType, UserRegisterBodyType>(
    "userRegsite/slice",
    async ({ name, city_id, kaspi_phone_number, phone_number, password, password_confirmation }, { rejectWithValue }) => {
        try {
            const res = await baseService.post("api_url", {
                name, city_id, kaspi_phone_number, phone_number, password, password_confirmation
            });
            return { access_token: res.data.access_token, token_type: res.data.token_type };
        } catch(error: any) {
            const parsedError = error as AxiosError;
            // @ts-ignore
            const message = parsedError.response.data.message;
            rejectWithValue(message ?? errorMessages["ru"].defaultBackendError);
            throw new Error(message);
        }
    }
);

export const userRegsiteSlice = createSlice({
    name: USER_REGISTER_API_REDUCER,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userRegisterApi.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(userRegisterApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.response = { ...action.payload };
        }),
        builder.addCase(userRegisterApi.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ?? errorMessages["ru"].defaultBackendError;
        });
    },
});

export default userRegsiteSlice.reducer;