"""
Hangman Game (CLI) - Python Implementation
A word guessing game where you try to guess the secret word letter by letter.
"""

import random

# Word lists by difficulty
EASY_WORDS = [
    'cat', 'dog', 'sun', 'moon', 'star', 'tree', 'book', 'ball', 'fish', 'bird',
    'cake', 'rain', 'snow', 'wind', 'fire', 'water', 'earth', 'apple', 'banana', 'orange'
]

MEDIUM_WORDS = [
    'python', 'computer', 'keyboard', 'monitor', 'internet', 'website', 'browser',
    'program', 'function', 'variable', 'string', 'number', 'boolean', 'array',
    'dictionary', 'library', 'module', 'package', 'class', 'object'
]

HARD_WORDS = [
    'algorithm', 'recursion', 'iteration', 'abstraction', 'encapsulation',
    'polymorphism', 'inheritance', 'decomposition', 'optimization', 'debugging',
    'refactoring', 'framework', 'architecture', 'implementation', 'documentation'
]

# ASCII art for hangman (7 stages)
HANGMAN_ART = [
    """
    
    


    """,
    """
    
    


    =====
    """,
    """
    
    |
    |
    |
    |
    =====
    """,
    """
    +---+
    |
    |
    |
    |
    =====
    """,
    """
    +---+
    |   |
    |
    |
    |
    =====
    """,
    """
    +---+
    |   |
    |   O
    |
    |
    =====
    """,
    """
    +---+
    |   |
    |   O
    |   |
    |
    =====
    """,
    """
    +---+
    |   |
    |   O
    |  /|
    |
    =====
    """,
    """
    +---+
    |   |
    |   O
    |  /|\\
    |
    =====
    """,
    """
    +---+
    |   |
    |   O
    |  /|\\
    |  /
    =====
    """,
    """
    +---+
    |   |
    |   O
    |  /|\\
    |  / \\
    =====
    """
]

class HangmanGame:
    def __init__(self, difficulty='medium'):
        """Initialize the game."""
        self.difficulty = difficulty
        self.word_list = {
            'easy': EASY_WORDS,
            'medium': MEDIUM_WORDS,
            'hard': HARD_WORDS
        }.get(difficulty, MEDIUM_WORDS)
        
        self.secret_word = random.choice(self.word_list).upper()
        self.display_word = ['_' for _ in self.secret_word]
        self.guessed_letters = set()
        self.wrong_guesses = []
        self.max_tries = 10
        self.tries_left = self.max_tries
        self.game_over = False
        self.won = False
    
    def print_game_state(self):
        """Print the current game state."""
        print("\n" + "=" * 50)
        print("HANGMAN GAME")
        print("=" * 50)
        print(f"\nDifficulty: {self.difficulty.upper()}")
        print(f"Tries left: {self.tries_left}")
        print("\n" + HANGMAN_ART[self.max_tries - self.tries_left])
        print("\nWord: " + " ".join(self.display_word))
        
        if self.wrong_guesses:
            print(f"\nWrong guesses: {', '.join(sorted(self.wrong_guesses))}")
        
        if self.game_over:
            if self.won:
                print("\n🎉 CONGRATULATIONS! You guessed the word!")
                print(f"The word was: {self.secret_word}")
            else:
                print("\n💀 GAME OVER! You ran out of tries.")
                print(f"The word was: {self.secret_word}")
        else:
            print("\nGuess a letter (or type 'quit' to exit):")
    
    def guess_letter(self, letter):
        """Process a letter guess."""
        if self.game_over:
            return False
        
        letter = letter.upper().strip()
        
        # Validate input
        if len(letter) != 1 or not letter.isalpha():
            print("Please enter a single letter!")
            return False
        
        # Check if already guessed
        if letter in self.guessed_letters:
            print(f"You already guessed '{letter}'!")
            return False
        
        self.guessed_letters.add(letter)
        
        # Check if letter is in word
        if letter in self.secret_word:
            # Update display
            for i, char in enumerate(self.secret_word):
                if char == letter:
                    self.display_word[i] = letter
            print(f"✅ Good guess! '{letter}' is in the word!")
            
            # Check win condition
            if '_' not in self.display_word:
                self.won = True
                self.game_over = True
        else:
            self.wrong_guesses.append(letter)
            self.tries_left -= 1
            print(f"❌ Wrong! '{letter}' is not in the word.")
            
            # Check loss condition
            if self.tries_left <= 0:
                self.game_over = True
        
        return True
    
    def play(self):
        """Main game loop."""
        while not self.game_over:
            self.print_game_state()
            
            guess = input().strip()
            
            if guess.lower() == 'quit':
                print("\nThanks for playing!")
                break
            
            self.guess_letter(guess)
        
        if self.game_over:
            self.print_game_state()

def main():
    """Main function to start the game."""
    print("=" * 50)
    print("Welcome to HANGMAN!")
    print("=" * 50)
    print("\nSelect difficulty:")
    print("1. Easy")
    print("2. Medium")
    print("3. Hard")
    
    choice = input("\nEnter choice (1-3, default 2): ").strip()
    
    difficulty_map = {'1': 'easy', '2': 'medium', '3': 'hard'}
    difficulty = difficulty_map.get(choice, 'medium')
    
    game = HangmanGame(difficulty)
    game.play()
    
    # Ask to play again
    while True:
        play_again = input("\nPlay again? (y/n): ").strip().lower()
        if play_again == 'y':
            choice = input("Enter difficulty (1-3, default 2): ").strip()
            difficulty = difficulty_map.get(choice, 'medium')
            game = HangmanGame(difficulty)
            game.play()
        else:
            print("Thanks for playing!")
            break

if __name__ == "__main__":
    main()

