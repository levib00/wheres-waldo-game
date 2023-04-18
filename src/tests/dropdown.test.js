/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { getByRole, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { getValue } from "@testing-library/user-event/dist/utils";
import { CharacterDropdown } from "../components/character-dropdown";

describe("Test guessing", () => {
  const mockCorrectFn = jest.fn();
  const mockCloseFn = jest.fn();
  
  it('Test making a correct guess.', async() => {
    const isGuessCorrect = (xCoords, yCoords, coordObj) => {
      // Checks whether the coordinates of the user click is within acceptable area for the chosen character.
      const dbCoordx1 = coordObj['x1']
      const dbCoordx2 = coordObj['x2']
      const dbCoordy1 = coordObj['y1']
      const dbCoordy2 = coordObj['y2']
  
      if ((dbCoordx1 < xCoords && xCoords < dbCoordx2) && (dbCoordy1 < yCoords && yCoords < dbCoordy2)) {
        return true
      } else {
        return false
      }
    }

    render(<CharacterDropdown characters={['Misaka']} getCharCoords={() => ({x1:0, x2:2, y1:0, y2:2})} handleCorrectGuess={(mockCorrectFn)} top={1} left={1} isGuessCorrect={isGuessCorrect} setShowDropdown={mockCloseFn} setShowMessage={() => null} /> )
    const Misaka = screen.getByText('Misaka');
    act(() => {
      userEvent.click(Misaka)
    });
    await new Promise(process.nextTick);
      expect(mockCorrectFn).toBeCalledTimes(1)
      expect(mockCloseFn).toBeCalledTimes(1)
    
  });

  it('Test making an incorrect guess.', async() => {
    const isGuessCorrect = (xCoords, yCoords, coordObj) => {
      // Checks whether the coordinates of the user click is within acceptable area for the chosen character.
      const dbCoordx1 = coordObj['x1']
      const dbCoordx2 = coordObj['x2']
      const dbCoordy1 = coordObj['y1']
      const dbCoordy2 = coordObj['y2']
  
      if ((dbCoordx1 < xCoords && xCoords < dbCoordx2) && (dbCoordy1 < yCoords && yCoords < dbCoordy2)) {
        return true
      } else {
        return false
      }
    }

    render(<CharacterDropdown characters={['Misaka']} getCharCoords={() => ({x1:0, x2:2, y1:0, y2:2})} handleCorrectGuess={(mockCorrectFn)} top={5} left={5} isGuessCorrect={isGuessCorrect} setShowDropdown={mockCloseFn} setShowMessage={() => null} /> )
    const Misaka = screen.getByText('Misaka');
    act(() => {
      userEvent.click(Misaka)
    });
    await new Promise(process.nextTick);
    expect(mockCorrectFn).toBeCalledTimes(0)
    expect(mockCloseFn).toBeCalledTimes(1)    
  });
});