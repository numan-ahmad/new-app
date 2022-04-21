import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";

import {
  AutoCompleteContainer,
  Input,
  AutoCompleteItem,
  AutoCompleteItemButton
} from "./styles";
const Root = styled.div`
  position: relative;
  width: 320px;
  display: flex;
`;
const SubmitButton = styled.input`
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
  margin-left: 5px;
`;
interface autoCompleteProps {
  iconColor?: string;
  inputStyle?: React.CSSProperties;
  optionsStyle?: React.CSSProperties;
  data: any[];
}
interface iuser {
  text: string;
  suggestions: any[];
}
export const AutoComplete: FC<autoCompleteProps> = ({
  inputStyle,
  optionsStyle,
  data
}) => {
  const [search, setSearch] = useState<iuser>({
    text: "",
    suggestions: []
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = data.sort().filter((v) => regex.test(v));
    }
    setIsComponentVisible(true);
    setSearch({ text: value, suggestions });
  };

  const suggestionSelected = (value: string) => {
    setIsComponentVisible(false);

    setSearch({
      text: value,
      suggestions: []
    });
  };

  const { suggestions } = search;

  return (
    <Root>
      <Input
        id="input"
        autoComplete="off"
        value={search.text}
        onChange={onTextChanged}
        type={"text"}
        placeholder="Country"
        style={inputStyle}
      />
      <SubmitButton type="submit" />
      {suggestions.length > 0 && isComponentVisible && (
        < AutoCompleteContainer style={optionsStyle}>
          {suggestions.map((item) => (
            <AutoCompleteItem key={item}>
              <AutoCompleteItemButton
                onClick={() => suggestionSelected(item)}
              >
                {item}
              </AutoCompleteItemButton>
            </AutoCompleteItem>
          ))}
        </AutoCompleteContainer>
      )
      }
    </Root >
  );
};