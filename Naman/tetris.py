"""
Tetris Game (CLI) - Python Implementation
A falling block puzzle game.
"""

import random
import time
import os
import sys

BOARD_WIDTH = 10
BOARD_HEIGHT = 20

# Tetromino shapes (I, J, L, O, S, T, Z)
TETROMINOES = {
    'I': [
        ['####']
    ],
    'J': [
        ['#  ',
         '###']
    ],
    'L': [
        ['  #',
         '###']
    ],
    'O': [
        ['##',
         '##']
    ],
    'S': [
        [' ##',
         '## ']
    ],
    'T': [
        [' # ',
         '###']
    ],
    'Z': [
        ['## ',
         ' ##']
    ]
}

class TetrisGame:
    def __init__(self):
        """Initialize the game."""
        self.board = [[0 for _ in range(BOARD_WIDTH)] for _ in range(BOARD_HEIGHT)]
        self.current_piece = None
        self.current_x = 0
        self.current_y = 0
        self.current_shape = None
        self.score = 0
        self.lines_cleared = 0
        self.level = 1
        self.game_over = False
        self.fall_time = 0
        self.fall_speed = 0.5  # seconds
    
    def print_board(self):
        """Print the current state of the board."""
        os.system('clear' if os.name == 'posix' else 'cls')
        print("=" * 50)
        print("TETRIS GAME")
        print("=" * 50)
        print(f"Score: {self.score} | Lines: {self.lines_cleared} | Level: {self.level}")
        print("\n" + "-" * (BOARD_WIDTH + 2))
        
        # Create display board with current piece
        display_board = [row[:] for row in self.board]
        
        if self.current_piece:
            shape = self.current_shape
            for i, row in enumerate(shape):
                for j, cell in enumerate(row):
                    if cell == '#':
                        board_y = self.current_y + i
                        board_x = self.current_x + j
                        if 0 <= board_y < BOARD_HEIGHT and 0 <= board_x < BOARD_WIDTH:
                            display_board[board_y][board_x] = 2
        
        # Print board
        for row in display_board:
            print("|", end="")
            for cell in row:
                if cell == 0:
                    print(" ", end="")
                elif cell == 1:
                    print("█", end="")
                elif cell == 2:
                    print("▓", end="")
            print("|")
        
        print("-" * (BOARD_WIDTH + 2))
        print("\nControls: A/D (left/right), S (down), W (rotate), Q (quit)")
    
    def spawn_piece(self):
        """Spawn a new random piece."""
        piece_type = random.choice(list(TETROMINOES.keys()))
        self.current_piece = piece_type
        self.current_shape = [list(row) for row in TETROMINOES[piece_type]]
        self.current_x = BOARD_WIDTH // 2 - len(self.current_shape[0]) // 2
        self.current_y = 0
        
        # Check game over
        if self.check_collision():
            self.game_over = True
    
    def check_collision(self, dx=0, dy=0, shape=None):
        """Check if current piece collides with board or boundaries."""
        if shape is None:
            shape = self.current_shape
        
        new_x = self.current_x + dx
        new_y = self.current_y + dy
        
        for i, row in enumerate(shape):
            for j, cell in enumerate(row):
                if cell == '#':
                    board_y = new_y + i
                    board_x = new_x + j
                    
                    # Check boundaries
                    if board_x < 0 or board_x >= BOARD_WIDTH or board_y >= BOARD_HEIGHT:
                        return True
                    
                    # Check collision with fixed blocks
                    if board_y >= 0 and self.board[board_y][board_x] == 1:
                        return True
        
        return False
    
    def rotate_piece(self):
        """Rotate the current piece 90 degrees clockwise."""
        if not self.current_shape:
            return
        
        # Transpose and reverse rows
        rotated = [list(row) for row in zip(*self.current_shape[::-1])]
        
        # Check if rotation is valid
        if not self.check_collision(shape=rotated):
            self.current_shape = rotated
    
    def move_piece(self, dx, dy):
        """Move the current piece."""
        if not self.check_collision(dx, dy):
            self.current_x += dx
            self.current_y += dy
            return True
        return False
    
    def lock_piece(self):
        """Lock the current piece to the board."""
        for i, row in enumerate(self.current_shape):
            for j, cell in enumerate(row):
                if cell == '#':
                    board_y = self.current_y + i
                    board_x = self.current_x + j
                    if 0 <= board_y < BOARD_HEIGHT and 0 <= board_x < BOARD_WIDTH:
                        self.board[board_y][board_x] = 1
        
        self.current_piece = None
        self.clear_lines()
        self.spawn_piece()
    
    def clear_lines(self):
        """Clear completed lines and shift blocks down."""
        lines_to_clear = []
        
        for i in range(BOARD_HEIGHT):
            if all(cell == 1 for cell in self.board[i]):
                lines_to_clear.append(i)
        
        for line in lines_to_clear:
            del self.board[line]
            self.board.insert(0, [0 for _ in range(BOARD_WIDTH)])
        
        if lines_to_clear:
            self.lines_cleared += len(lines_to_clear)
            # Score: 100 * lines^2 * level
            self.score += 100 * (len(lines_to_clear) ** 2) * self.level
            # Level up every 10 lines
            self.level = (self.lines_cleared // 10) + 1
            self.fall_speed = max(0.1, 0.5 - (self.level - 1) * 0.05)
    
    def play(self):
        """Main game loop."""
        self.spawn_piece()
        last_fall = time.time()
        
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
                
                # Auto-fall
                current_time = time.time()
                if current_time - last_fall >= self.fall_speed:
                    if not self.move_piece(0, 1):
                        self.lock_piece()
                    last_fall = current_time
                
                # Non-blocking input
                import select
                if select.select([sys.stdin], [], [], 0.1)[0]:
                    key = get_key()
                    
                    if key.lower() == 'q':
                        print("\nThanks for playing!")
                        break
                    elif key.lower() == 'a':
                        self.move_piece(-1, 0)
                    elif key.lower() == 'd':
                        self.move_piece(1, 0)
                    elif key.lower() == 's':
                        if not self.move_piece(0, 1):
                            self.lock_piece()
                            last_fall = time.time()
                    elif key.lower() == 'w':
                        self.rotate_piece()
        except ImportError:
            # Fallback for Windows
            print("\nNote: Real-time controls may not work on Windows.")
            print("Use A/D/S/W keys and press Enter after each move.")
            
            while not self.game_over:
                self.print_board()
                
                # Auto-fall
                current_time = time.time()
                if current_time - last_fall >= self.fall_speed:
                    if not self.move_piece(0, 1):
                        self.lock_piece()
                    last_fall = current_time
                
                move = input("\nMove (a/d/s/w/q): ").strip().lower()
                
                if move == 'q':
                    print("\nThanks for playing!")
                    break
                elif move == 'a':
                    self.move_piece(-1, 0)
                elif move == 'd':
                    self.move_piece(1, 0)
                elif move == 's':
                    if not self.move_piece(0, 1):
                        self.lock_piece()
                        last_fall = time.time()
                elif move == 'w':
                    self.rotate_piece()
        
        if self.game_over:
            self.print_board()
            print("\n💀 GAME OVER!")
            print(f"Final Score: {self.score}")
            print(f"Lines Cleared: {self.lines_cleared}")

def main():
    """Main function to start the game."""
    game = TetrisGame()
    game.play()

if __name__ == "__main__":
    main()

