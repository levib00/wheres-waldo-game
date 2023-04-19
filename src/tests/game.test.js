/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { getByRole, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { getValue } from "@testing-library/user-event/dist/utils";
import { Game } from "../components/game";
import { Modal } from "../components/modal";

describe("Test game starting", () => {
  it('Test start game button.', () => {
    render(<Game getLeaderboards={[]} db={[]} />)
    const incrementBtn = screen.getByRole('button', {name: 'Start Game'});
    expect(screen.getByText('Hiei from Yu Yu Hakusho')).toBeInTheDocument()
    act(() => {
      userEvent.click(incrementBtn)
    });
    expect(screen.queryByText('Hiei from Yu Yu Hakusho')).toBeNull()
  });
});

describe('Interacting with the game board', () => {
  it('Clicking on game board opens dropdown', () => {
    render(<Game getLeaderboards={[]} db={[]} />);
    const incrementBtn = screen.getByRole('button', {name: 'Start Game'});
    act(() => {
      userEvent.click(incrementBtn)
    });
    const gameBoard = screen.getByAltText('Many anime characters.')
    act(() => {
      userEvent.click(gameBoard)
    });
    expect(screen.getByText('Misaka')).toBeInTheDocument()
    expect(screen.getByText('Hiei')).toBeInTheDocument()
    expect(screen.getByText('Vash')).toBeInTheDocument()
  });

  it('Dropdown disappears when game is clicked again', () => {
    render(<Game getLeaderboards={[]} db={[]} />);
    const incrementBtn = screen.getByRole('button', {name: 'Start Game'});
    act(() => {
      userEvent.click(incrementBtn)
    });
    const gameBoard = screen.getByAltText('Many anime characters.')
    act(() => {
      userEvent.click(gameBoard);
    });
    expect(screen.getByText('Hiei')).toBeInTheDocument()
    act(() => {
      userEvent.click(gameBoard);
    });
    expect(screen.queryByText('Hiei')).toBeNull()
  });
})