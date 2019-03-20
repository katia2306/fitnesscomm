import { useReducer, useCallback, ChangeEvent } from "react";

interface FormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

enum types {
  TEXT_FIELD_CHANGE = "TEXT_FIELD_CHANGE",
  CHECKBOX_CHANGE = "CHECKBOX_CHANGE"
}

interface Action {
  type: types;
  payload: FormData;
}

const reducer = (state: FormData, action: Action): FormData => {
  const { type, payload } = action;

  switch (type) {
    case types.TEXT_FIELD_CHANGE:
    case types.CHECKBOX_CHANGE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

const useFormData = (initialState: FormData) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTextFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: types.TEXT_FIELD_CHANGE,
        payload: { [e.target.name]: e.target.value }
      });
    },
    [dispatch]
  );

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: types.CHECKBOX_CHANGE,
        payload: { [e.target.name]: e.target.checked }
      });
    },
    [dispatch]
  );

  return {
    formData: state,
    formDataActions: { handleTextFieldChange, handleCheckboxChange }
  };
};

export default useFormData;
