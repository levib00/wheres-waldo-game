import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Message } from "../components/message";

describe("Test correct/incorrect messages", () => {
  it('Test correct message', () => {
    render(<Message isCorrect={true} isMounted={true} testMessage={true}/>)
    const message = screen.getByText('right')
    const checkMark = screen.getByAltText('check mark')
    expect(message).toBeInTheDocument()
    expect(checkMark).toBeInTheDocument()
  });

  it('Test incorrect message', () => {
    render(<Message isCorrect={false} isMounted={true} testMessage={true}/>)
    const message = screen.getByText('wrong')
    const redX = screen.getByAltText('red X')
    expect(message).toBeInTheDocument()
    expect(redX).toBeInTheDocument()
  })
});