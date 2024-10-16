// PokemonComponent.test.js
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import PokemonComponent from "../Components/PokemonComponent";

// Mock the axios module
jest.mock('axios');

describe('PokemonComponent', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
      });
  it('should display Pokémon data after successful API call', async () => {
    const mockData = {
      name: 'charizard',
      abilities: [
        { ability: { name: 'blaze' } },
        { ability: { name: 'solar-power' } },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<PokemonComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('CHARIZARD')).toBeInTheDocument();
      const abilities = screen.getAllByTestId('ability');
      expect(abilities).toHaveLength(2);
      expect(abilities[0]).toHaveTextContent('blaze');
      expect(abilities[1]).toHaveTextContent('solar-power');
    });
  });

  it('should handle API errors', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<PokemonComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      // Assert that the error message is displayed
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
      expect(screen.queryByText('CHARIZARD')).not.toBeInTheDocument(); // No data should be displayed
    });
  });
});

