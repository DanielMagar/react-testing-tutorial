import { render, screen, waitFor } from "@testing-library/react";
import PokemonList from "../Components/PokemonList";
import PokemonApi, { getPokemon } from "../Components/PokemonApi";
import axios from "axios";

// jest.mock("./PokemonApi", () => ({
//   getPokemon: jest.fn(),
// }));
jest.mock("axios");

describe("PokemonList Component", () => {

  it("should display character name and abilities", async () => {
    const mockData = {
      abilities: [
        { ability: { name: "blaze" } },
        { ability: { name: "solar-power" } },
      ],
    };
 
    try {
      axios.get.mockResolvedValueOnce(mockData);
      const result = await PokemonApi.getPokemon("charizard"); // Call the function with the character name

      expect(result).toEqual(mockData); // Assert that the data returned is as expected
      expect(axios.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/charizard/"
      ); // Check if axios was called with the correct URL
    } catch (error) {
      axios.get.mockRejectedValueOnce(new Error("Network Error"));
      await expect(PokemonApi.getPokemon("charizard")).rejects.toThrow(
        "Failed to fetch data"
      ); // Assert error is thrown
    }
  });

  it("should throw an error when status is not 200", async () => {
    // Mocking a non-200 status response
    axios.get.mockResolvedValueOnce({ status: 404 });

    await expect(PokemonApi.getPokemon("unknown")).rejects.toThrow(
      "Failed to fetch data"
    ); // Assert error is thrown
  });

  it("should handle errors from the API call", async () => {
    // Mocking an error thrown by axios
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(PokemonApi.getPokemon("charizard")).rejects.toThrow(
      "Failed to fetch data"
    ); // Assert error is thrown
  });
  it('should throw an error when the response structure is unexpected', async () => {
    // Mock the axios.get method to resolve with an unexpected structure
    axios.get.mockResolvedValueOnce({ status: 200, data: { unexpectedField: [] } });

    await expect(PokemonApi.getPokemon('charizard')).resolves.toEqual({ unexpectedField: [] }); // Check if resolves to unexpected field
  });
});
