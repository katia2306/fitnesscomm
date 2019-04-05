import { useReducer, useCallback } from "react";

enum types {
  TEXT_FIELD_CHANGE = "TEXT_FIELD_CHANGE",
  CHECKBOX_CHANGE = "CHECKBOX_CHANGE"
}

interface Action {
  type: types;
  payload: { [key: string]: string | number | boolean | undefined };
}

const reducer = <S>(state: S, action: Action): S => {
  const { type, payload } = action;

  switch (type) {
    case types.TEXT_FIELD_CHANGE:
    case types.CHECKBOX_CHANGE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

const useFormData = <S>(initialState: S) => {
  const [state, dispatch] = useReducer<React.Reducer<S, Action>>(
    reducer,
    initialState
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      dispatch({
        type: types.TEXT_FIELD_CHANGE,
        payload: { [name]: value }
      });
    },
    [dispatch]
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;

      dispatch({
        type: types.CHECKBOX_CHANGE,
        payload: { [name]: checked }
      });
    },
    [dispatch]
  );

  return {
    formData: state,
    formDataActions: { handleInputChange, handleCheckboxChange }
  };
};

export default useFormData;
