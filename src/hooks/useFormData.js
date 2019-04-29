import { useReducer, useCallback } from "react";

const types = {
  TEXT_FIELD_CHANGE: "TEXT_FIELD_CHANGE",
  CHECKBOX_CHANGE: "CHECKBOX_CHANGE"
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.TEXT_FIELD_CHANGE:
    case types.CHECKBOX_CHANGE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

const useFormData = initialState => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;

      dispatch({
        type: types.TEXT_FIELD_CHANGE,
        payload: { [name]: value }
      });
    },
    [dispatch]
  );

  const handleCheckboxChange = useCallback(
    e => {
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
