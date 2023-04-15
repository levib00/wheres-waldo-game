import React from "react";
import { getByRole, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { getValue } from "@testing-library/user-event/dist/utils";
import { Modal } from "../components/modal";

describe("Test start game button fires function.", () => {
  const mockStartFunctions = jest.fn()
  
  it('Test start game button.', () => {
    render(<Modal startTimer={mockStartFunctions} setShow={mockStartFunctions}/>)
    const incrementBtn = screen.getByRole('button', {name: 'Start Game'});
    act(() => {
      userEvent.click(incrementBtn)
    });
    expect(mockStartFunctions).toBeCalledTimes(2)
  });
});