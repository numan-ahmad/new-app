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
`;

interface IData {
  name: string;
  code: string;
  suggestions: string[];
}
interface autoCompleteProps {
  iconColor?: string;
  inputStyle?: React.CSSProperties;
  optionsStyle?: React.CSSProperties;

  data: any[];
}
interface iuser {
  text:string;
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
      suggestions = data.sort().filter((v: IData) => regex.test(v.name));
    }
    setIsComponentVisible(true);
    setSearch({ text: value, suggestions });
  };

  const suggestionSelected = (value: IData) => {
    setIsComponentVisible(false);

    setSearch({
      text: value.name,
      suggestions: []
    });
  };

  const { suggestions } = search;

  return (
    <Root>
      <div
        onClick={() => setIsComponentVisible(false)}
        style={{
          display: isComponentVisible ? "block" : "none",
          width: "200vw",
          height: "200vh",
          backgroundColor: "transparent",
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0
        }}
      />
      <div>
        <Input
          id="input"
          autoComplete="off"
          value={search.text}
          onChange={onTextChanged}
          type={"text"}
          style={inputStyle}
        />
      </div>
      {suggestions.length > 0 && isComponentVisible && (
        < AutoCompleteContainer style={optionsStyle}>
          {suggestions.map((item: IData) => (
            <AutoCompleteItem key={item.code}>
              <AutoCompleteItemButton
                onClick={() => suggestionSelected(item)}
              >
                {item.name}
              </AutoCompleteItemButton>
            </AutoCompleteItem>
          ))}
        </AutoCompleteContainer>
      )
      }
    </Root >
  );
};