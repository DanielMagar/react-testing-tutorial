// pokemonApi.test.js
import { getPokemon } from "./Pokemon";

// Mock the global fetch function
global.fetch = jest.fn();

describe('getPokemon', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should fetch Pokémon data successfully', async () => {
    const mockData = {
      name: 'charizard',
      abilities: [
        { ability: { name: 'blaze' } },
        { ability: { name: 'solar-power' } },
      ],
    };

    // Mocking the fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData), // Mock the json method
    });

    const data = await getPokemon('charizard');

    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/charizard/');
    expect(data).toEqual(mockData); // Check if returned data matches mock data
    expect(data).toMatchSnapshot();
  });

  it('should handle errors when fetch fails', async () => {
    // Mocking the fetch to throw an error
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getPokemon('unknown')).rejects.toThrow('Failed to fetch data');
  });
  it('should handle non-ok response status', async () => {
    // Mocking fetch to return an ok: false response (e.g., 404)
    fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn(), // Mock the json method (won't be called)
    });

    await expect(getPokemon('unknown')).rejects.toThrow('Failed to fetch data');
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/charizard/');
  });
  it('should handle missing abilities in the response', async () => {
    const mockData = {
      name: 'charizard',
      abilities: [], // No abilities
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData), // Mock the json method
    });

    const data = await getPokemon('charizard');

    expect(data.abilities).toEqual([]); // Should handle empty abilities list gracefully
  });
});
