"""
Battleship Game (CLI) - Python Implementation
A simple text-based version of the classic Battleship board game.
"""

import random

# Game constants
BOARD_SIZE = 10
SHIP_SIZES = [5, 4, 3, 3, 2]  # Different ship sizes
SHIP_NAMES = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer']

# Symbols for the board
WATER = '~'
SHIP = 'S'
HIT = 'X'
MISS = 'O'

class BattleshipGame:
    def __init__(self):
        """Initialize the game with an empty board."""
        self.board = [[WATER for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]
        self.ships_placed = 0
        self.total_ships = len(SHIP_SIZES)
        self.hits = 0
        self.total_hits_needed = sum(SHIP_SIZES)
        self.game_over = False
        
    def print_board(self, show_ships=False):
        """Print the current state of the board."""
        print("\n   " + " ".join([chr(65 + i) for i in range(BOARD_SIZE)]))
        for i in range(BOARD_SIZE):
            row_str = f"{i:2} "
            for j in range(BOARD_SIZE):
                cell = self.board[i][j]
                if not show_ships and cell == SHIP:
                    cell = WATER
                row_str += cell + " "
            print(row_str)
        print()
    
    def is_valid_placement(self, row, col, size, horizontal):
        """Check if a ship can be placed at the given position."""
        if horizontal:
            if col + size > BOARD_SIZE:
                return False
            for j in range(col, col + size):
                if self.board[row][j] != WATER:
                    return False
        else:
            if row + size > BOARD_SIZE:
                return False
            for i in range(row, row + size):
                if self.board[i][col] != WATER:
                    return False
        return True
    
    def place_ship(self, row, col, size, horizontal):
        """Place a ship on the board."""
        if horizontal:
            for j in range(col, col + size):
                self.board[row][j] = SHIP
        else:
            for i in range(row, row + size):
                self.board[i][col] = SHIP
    
    def place_ships_randomly(self):
        """Randomly place all ships on the board."""
        for size in SHIP_SIZES:
            placed = False
            attempts = 0
            while not placed and attempts < 100:
                row = random.randint(0, BOARD_SIZE - 1)
                col = random.randint(0, BOARD_SIZE - 1)
                horizontal = random.choice([True, False])
                
                if self.is_valid_placement(row, col, size, horizontal):
                    self.place_ship(row, col, size, horizontal)
                    placed = True
                    self.ships_placed += 1
                attempts += 1
            
            if not placed:
                print(f"Warning: Could not place ship of size {size}")
    
    def parse_coordinate(self, coord_str):
        """Parse a coordinate string (e.g., 'A5' or 'a5') into row and column indices."""
        coord_str = coord_str.strip().upper()
        
        if len(coord_str) < 2:
            return None, None
        
        # Try format like "A5" or "A10"
        if coord_str[0].isalpha() and coord_str[1:].isdigit():
            col = ord(coord_str[0]) - ord('A')
            row = int(coord_str[1:])
            if 0 <= col < BOARD_SIZE and 0 <= row < BOARD_SIZE:
                return row, col
        
        # Try format like "5,2" or "5, 2"
        if ',' in coord_str:
            parts = coord_str.split(',')
            if len(parts) == 2:
                try:
                    row = int(parts[0].strip())
                    col = int(parts[1].strip())
                    if 0 <= row < BOARD_SIZE and 0 <= col < BOARD_SIZE:
                        return row, col
                except ValueError:
                    pass
        
        return None, None
    
    def fire_shot(self, row, col):
        """Fire a shot at the given coordinates."""
        if self.game_over:
            return False, "Game is already over!"
        
        if row is None or col is None:
            return False, "Invalid coordinates!"
        
        if row < 0 or row >= BOARD_SIZE or col < 0 or col >= BOARD_SIZE:
            return False, "Coordinates out of bounds!"
        
        cell = self.board[row][col]
        
        if cell == HIT or cell == MISS:
            return False, "You already fired at this location!"
        
        if cell == SHIP:
            self.board[row][col] = HIT
            self.hits += 1
            if self.hits >= self.total_hits_needed:
                self.game_over = True
                return True, "HIT! You sunk all ships! You win! 🎉"
            return True, "HIT! 💥"
        else:
            self.board[row][col] = MISS
            return True, "MISS! 💧"
    
    def play(self):
        """Main game loop."""
        print("=" * 50)
        print("Welcome to BATTLESHIP!")
        print("=" * 50)
        print(f"\nBoard size: {BOARD_SIZE}x{BOARD_SIZE}")
        print(f"Ships to find: {len(SHIP_SIZES)} ships with sizes {SHIP_SIZES}")
        print(f"Total hits needed: {self.total_hits_needed}")
        print("\nEnter coordinates to fire (e.g., A5, B3, or 5,2):")
        print("Type 'quit' to exit the game.")
        print("Type 'show' to reveal ships (cheat mode).")
        
        # Place ships randomly
        print("\nPlacing ships on the board...")
        self.place_ships_randomly()
        print(f"All {self.ships_placed} ships have been placed!\n")
        
        shots_fired = 0
        
        while not self.game_over:
            self.print_board()
            print(f"Shots fired: {shots_fired} | Hits: {self.hits}/{self.total_hits_needed}")
            
            coord_str = input("\nEnter coordinates: ").strip()
            
            if coord_str.lower() == 'quit':
                print("Thanks for playing! Goodbye!")
                break
            
            if coord_str.lower() == 'show':
                print("\n[CHEAT MODE - Showing ships]")
                self.print_board(show_ships=True)
                continue
            
            row, col = self.parse_coordinate(coord_str)
            success, message = self.fire_shot(row, col)
            
            if success:
                shots_fired += 1
                print(f"\n{message}")
            else:
                print(f"\nError: {message}")
        
        if self.game_over:
            print("\n" + "=" * 50)
            print("CONGRATULATIONS! You won!")
            print(f"Total shots fired: {shots_fired}")
            print(f"Total hits: {self.hits}")
            print("=" * 50)
            self.print_board(show_ships=True)

def main():
    """Main function to start the game."""
    game = BattleshipGame()
    game.play()

if __name__ == "__main__":
    main()

