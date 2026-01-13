"""
2048 Game (CLI) - Python Implementation
A sliding tile puzzle game where you combine tiles to reach 2048.
"""

import random
import os
import sys

BOARD_SIZE = 4

class Game2048:
    def __init__(self):
        """Initialize the game with an empty board."""
        self.board = [[0 for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]
        self.score = 0
        self.game_over = False
        self.won = False
        
    def print_board(self):
        """Print the current state of the board."""
        os.system('clear' if os.name == 'posix' else 'cls')
        print("=" * 50)
        print("2048 GAME")
        print("=" * 50)
        print(f"Score: {self.score}\n")
        
        for row in self.board:
            print("|", end="")
            for cell in row:
                if cell == 0:
                    print(f"{' ' * 4:^6}|", end="")
                else:
                    print(f"{cell:^6}|", end="")
            print()
            print("-" * 31)
        
        print("\nUse arrow keys or WASD to move")
        print("Press 'q' to quit")
        
        if self.won:
            print("\n🎉 CONGRATULATIONS! You reached 2048!")
        if self.game_over:
            print("\n💀 GAME OVER! No more moves available.")
    
    def add_random_tile(self):
        """Add a random tile (2 or 4) to an empty cell."""
        empty_cells = []
        for i in range(BOARD_SIZE):
            for j in range(BOARD_SIZE):
                if self.board[i][j] == 0:
                    empty_cells.append((i, j))
        
        if empty_cells:
            row, col = random.choice(empty_cells)
            self.board[row][col] = 2 if random.random() < 0.9 else 4
    
    def move_left(self):
        """Move all tiles to the left and merge."""
        moved = False
        for i in range(BOARD_SIZE):
            # Remove zeros
            row = [cell for cell in self.board[i] if cell != 0]
            
            # Merge adjacent identical tiles
            merged = []
            j = 0
            while j < len(row):
                if j < len(row) - 1 and row[j] == row[j + 1]:
                    merged.append(row[j] * 2)
                    self.score += row[j] * 2
                    if row[j] * 2 == 2048 and not self.won:
                        self.won = True
                    j += 2
                else:
                    merged.append(row[j])
                    j += 1
            
            # Pad with zeros
            while len(merged) < BOARD_SIZE:
                merged.append(0)
            
            # Check if moved
            if self.board[i] != merged:
                moved = True
                self.board[i] = merged
        
        return moved
    
    def move_right(self):
        """Move all tiles to the right and merge."""
        moved = False
        for i in range(BOARD_SIZE):
            # Remove zeros
            row = [cell for cell in self.board[i] if cell != 0]
            
            # Merge adjacent identical tiles (from right)
            merged = []
            j = len(row) - 1
            while j >= 0:
                if j > 0 and row[j] == row[j - 1]:
                    merged.insert(0, row[j] * 2)
                    self.score += row[j] * 2
                    if row[j] * 2 == 2048 and not self.won:
                        self.won = True
                    j -= 2
                else:
                    merged.insert(0, row[j])
                    j -= 1
            
            # Pad with zeros on left
            while len(merged) < BOARD_SIZE:
                merged.insert(0, 0)
            
            # Check if moved
            if self.board[i] != merged:
                moved = True
                self.board[i] = merged
        
        return moved
    
    def move_up(self):
        """Move all tiles up and merge."""
        moved = False
        for j in range(BOARD_SIZE):
            # Get column
            col = [self.board[i][j] for i in range(BOARD_SIZE)]
            
            # Remove zeros
            col = [cell for cell in col if cell != 0]
            
            # Merge adjacent identical tiles
            merged = []
            i = 0
            while i < len(col):
                if i < len(col) - 1 and col[i] == col[i + 1]:
                    merged.append(col[i] * 2)
                    self.score += col[i] * 2
                    if col[i] * 2 == 2048 and not self.won:
                        self.won = True
                    i += 2
                else:
                    merged.append(col[i])
                    i += 1
            
            # Pad with zeros
            while len(merged) < BOARD_SIZE:
                merged.append(0)
            
            # Update column
            new_col = merged.copy()
            old_col = [self.board[i][j] for i in range(BOARD_SIZE)]
            if old_col != new_col:
                moved = True
                for i in range(BOARD_SIZE):
                    self.board[i][j] = new_col[i]
        
        return moved
    
    def move_down(self):
        """Move all tiles down and merge."""
        moved = False
        for j in range(BOARD_SIZE):
            # Get column
            col = [self.board[i][j] for i in range(BOARD_SIZE)]
            
            # Remove zeros
            col = [cell for cell in col if cell != 0]
            
            # Merge adjacent identical tiles (from bottom)
            merged = []
            i = len(col) - 1
            while i >= 0:
                if i > 0 and col[i] == col[i - 1]:
                    merged.insert(0, col[i] * 2)
                    self.score += col[i] * 2
                    if col[i] * 2 == 2048 and not self.won:
                        self.won = True
                    i -= 2
                else:
                    merged.insert(0, col[i])
                    i -= 1
            
            # Pad with zeros on top
            while len(merged) < BOARD_SIZE:
                merged.insert(0, 0)
            
            # Update column
            new_col = merged.copy()
            old_col = [self.board[i][j] for i in range(BOARD_SIZE)]
            if old_col != new_col:
                moved = True
                for i in range(BOARD_SIZE):
                    self.board[i][j] = new_col[i]
        
        return moved
    
    def can_move(self):
        """Check if any moves are possible."""
        # Check for empty cells
        for i in range(BOARD_SIZE):
            for j in range(BOARD_SIZE):
                if self.board[i][j] == 0:
                    return True
        
        # Check for possible merges
        for i in range(BOARD_SIZE):
            for j in range(BOARD_SIZE):
                current = self.board[i][j]
                # Check right
                if j < BOARD_SIZE - 1 and self.board[i][j + 1] == current:
                    return True
                # Check down
                if i < BOARD_SIZE - 1 and self.board[i + 1][j] == current:
                    return True
        
        return False
    
    def play(self):
        """Main game loop."""
        # Add two initial tiles
        self.add_random_tile()
        self.add_random_tile()
        
        try:
            import tty
            import termios
            
            def get_key():
                """Get a single keypress."""
                fd = sys.stdin.fileno()
                old_settings = termios.tcgetattr(fd)
                try:
                    tty.setraw(sys.stdin.fileno())
                    ch = sys.stdin.read(1)
                finally:
                    termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
                return ch
            
            while not self.game_over:
                self.print_board()
                
                key = get_key()
                
                if key == 'q':
                    print("\nThanks for playing!")
                    break
                
                moved = False
                if key == '\x1b':  # Escape sequence
                    key2 = get_key()
                    if key2 == '[':
                        key3 = get_key()
                        if key3 == 'A':  # Up arrow
                            moved = self.move_up()
                        elif key3 == 'B':  # Down arrow
                            moved = self.move_down()
                        elif key3 == 'C':  # Right arrow
                            moved = self.move_right()
                        elif key3 == 'D':  # Left arrow
                            moved = self.move_left()
                elif key.lower() == 'w':
                    moved = self.move_up()
                elif key.lower() == 's':
                    moved = self.move_down()
                elif key.lower() == 'a':
                    moved = self.move_left()
                elif key.lower() == 'd':
                    moved = self.move_right()
                
                if moved:
                    self.add_random_tile()
                    if not self.can_move():
                        self.game_over = True
                        self.print_board()
                        break
        except ImportError:
            # Fallback for Windows
            print("\nNote: Arrow keys may not work on Windows. Use WASD instead.")
            while not self.game_over:
                self.print_board()
                move = input("\nEnter move (w/a/s/d or q to quit): ").strip().lower()
                
                if move == 'q':
                    print("\nThanks for playing!")
                    break
                
                moved = False
                if move == 'w':
                    moved = self.move_up()
                elif move == 's':
                    moved = self.move_down()
                elif move == 'a':
                    moved = self.move_left()
                elif move == 'd':
                    moved = self.move_right()
                
                if moved:
                    self.add_random_tile()
                    if not self.can_move():
                        self.game_over = True
                        self.print_board()
                        break

def main():
    """Main function to start the game."""
    game = Game2048()
    game.play()

if __name__ == "__main__":
    main()

