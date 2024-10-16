import {
  getByText,
  queryAllByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import PokemonList from "./PokemonList";
import PokemonApi, { getPokemon } from "./PokemonApi";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";


jest.mock("./PokemonApi", () => ({
  getPokemon: jest.fn(),
}));

describe("PokemonList Component", () => {
  it('should create Snapshot of PokemonList screen', () => {
    render(<PokemonList/>);
    const output = render(<PokemonList/>);
    expect (output).toMatchSnapshot();
  });
  
  it("should display character name and abilities", async () => {
    const mockData = {
      abilities: [
        { ability: { name: "blaze" } },
        { ability: { name: "solar-power" } },
      ],
    };

    PokemonApi.getPokemon.mockResolvedValueOnce(mockData);
    // Render the PokemonList component
 
    render(<PokemonList />);
    screen.debug(); // Logs the current state of the DOM
   
    const staticText = screen.getByText("Character CHARIZARD Abilities")

    await waitFor(() => {
      expect(staticText).toBeInTheDocument()
      const abilities = screen.getAllByTestId("name-id");
      expect(abilities).toHaveLength(2);

      const abilitiesOne = screen.getByText("blaze");
      expect(abilitiesOne).toBeInTheDocument();

      const abilitiesTwo = screen.getByText("solar-power");
      expect(abilitiesTwo).toBeInTheDocument()
    });
  });
  it("should handle the case when no abilities are returned", async () => {
    const mockData = { abilities: null };

    PokemonApi.getPokemon.mockResolvedValueOnce(mockData);

    render(<PokemonList />);

    // Wait for the component to render
    await waitFor(() => {
      const staticText = screen.getByText("Character CHARIZARD Abilities");
      expect(staticText).toBeInTheDocument();

      const abilities = screen.queryAllByTestId("name-id");
      expect(abilities).toHaveLength(0); // No abilities should be rendered
    });
  });

  it("should handle an API error and log it", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    PokemonApi.getPokemon.mockRejectedValueOnce(new Error("Network Error"));

    render(<PokemonList />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch Pokemon data:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore(); // Clean up after the test
  });
});
