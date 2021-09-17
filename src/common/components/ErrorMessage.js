import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledText = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.red};
    margin-bottom: 5px;
`;

const ErrorMessage = ({ message }) => {
    return <StyledText>{message}</StyledText>;
};

ErrorMessage.propTypes = {
    message: PropTypes.string,
};

export default ErrorMessage;
