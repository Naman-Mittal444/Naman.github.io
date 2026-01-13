import pygame, random, time
from pygame.locals import *

# --- GLOBAL VARIABLES ---
SCREEN_WIDHT = 400
SCREEN_HEIGHT = 600
SPEED = 15      # DECREASED: Jump strength lowered from 20 to 15
GRAVITY = 0.8    # DECREASED: Gravity lowered from 2.5 to 2.0
GAME_SPEED = 30
# Note: Jump power (SPEED) and Gravity were decreased.

GROUND_WIDHT = 2 * SCREEN_WIDHT
GROUND_HEIGHT= 100

PIPE_WIDHT = 80
PIPE_HEIGHT = 500
PIPE_GAP = 150

# --- ASSET PATHS ---
wing = 'assets/audio/wing.wav'
hit = 'assets/audio/hit.wav'
suiii_sound = 'assets/audio/suiii.wav' 

# --- GAME STATE ---
score = 0
passed_pipes = set() 

pygame.mixer.init()
score_font = None 
credit_font = None # Font for the credit text


class Bird(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)

        # LOAD RONALDO'S FACE (or placeholder if file missing)
        try:
            self.image_base = pygame.image.load('assets/sprites/ronaldo_face.png').convert_alpha()
            self.image_base = pygame.transform.scale(self.image_base, (40, 40))
        except pygame.error:
            print("ERROR: Ronaldo image missing! Using default circle.")
            self.image_base = pygame.Surface([40, 40])
            self.image_base.fill((255, 223, 0))

        self.images = [
            self.image_base,
            pygame.transform.rotate(self.image_base, -15),
            pygame.transform.rotate(self.image_base, 15)
        ]

        self.speed = SPEED
        self.current_image = 0
        self.image = self.images[0]
        self.mask = pygame.mask.from_surface(self.image)

        self.rect = self.image.get_rect()
        self.rect[0] = SCREEN_WIDHT / 6
        self.rect[1] = SCREEN_HEIGHT / 2

    def update(self):
        self.current_image = (self.current_image + 1) % 3
        self.image = self.images[self.current_image]
        
        self.speed += GRAVITY
        self.rect[1] += self.speed

    def bump(self):
        self.speed = -SPEED

    def begin(self):
        self.current_image = (self.current_image + 1) % 3
        self.image = self.images[self.current_image]


class Pipe(pygame.sprite.Sprite):
    def __init__(self, inverted, xpos, ysize, id_num):
        pygame.sprite.Sprite.__init__(self)

        self. image = pygame.image.load('assets/sprites/pipe-green.png').convert_alpha()
        self.image = pygame.transform.scale(self.image, (PIPE_WIDHT, PIPE_HEIGHT))

        self.rect = self.image.get_rect()
        self.rect[0] = xpos

        if inverted:
            self.image = pygame.transform.flip(self.image, False, True)
            self.rect[1] = - (self.rect[3] - ysize)
        else:
            self.rect[1] = SCREEN_HEIGHT - ysize

        self.mask = pygame.mask.from_surface(self.image)
        self.id_num = id_num 

    def update(self):
        self.rect[0] -= GAME_SPEED


class Ground(pygame.sprite.Sprite):
    def __init__(self, xpos):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load('assets/sprites/base.png').convert_alpha()
        self.image = pygame.transform.scale(self.image, (GROUND_WIDHT, GROUND_HEIGHT))

        self.mask = pygame.mask.from_surface(self.image)

        self.rect = self.image.get_rect()
        self.rect[0] = xpos
        self.rect[1] = SCREEN_HEIGHT - GROUND_HEIGHT

    def update(self):
        self.rect[0] -= GAME_SPEED


def is_off_screen(sprite):
    return sprite.rect[0] < -(sprite.rect[2])

# Global counter for unique pipe IDs
pipe_id_counter = 0

def get_random_pipes(xpos):
    global pipe_id_counter
    
    size = random.randint(100, 300)
    
    pipe_id_counter += 1
    
    pipe = Pipe(False, xpos, size, pipe_id_counter)
    pipe_inverted = Pipe(True, xpos, SCREEN_HEIGHT - size - PIPE_GAP, pipe_id_counter)
    return pipe, pipe_inverted

def display_score(screen, font, score):
    """Function to render and display the score."""
    text_surface = font.render(str(score), True, (255, 255, 255))
    text_rect = text_surface.get_rect(center=(SCREEN_WIDHT // 2, 50))
    screen.blit(text_surface, text_rect)

def display_credit(screen, font):
    """Function to render and display the credit."""
    text_surface = font.render("Made by Naman Mittal", True, (0, 0, 0)) # Black text
    # Positioned above the ground
    text_rect = text_surface.get_rect(center=(SCREEN_WIDHT // 2, SCREEN_HEIGHT - GROUND_HEIGHT / 2)) 
    screen.blit(text_surface, text_rect)


# --- INITIALIZATION ---
pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDHT, SCREEN_HEIGHT))
pygame.display.set_caption('RonaldoBirds') # CHANGED: Window Title

# Load Fonts
try:
    score_font = pygame.font.Font(pygame.font.get_default_font(), 48)
    credit_font = pygame.font.Font(pygame.font.get_default_font(), 20)
except:
    score_font = pygame.font.SysFont('Arial', 48)
    credit_font = pygame.font.SysFont('Arial', 20) 

# Load Background
BACKGROUND = pygame.image.load('assets/sprites/background-day.png')
BACKGROUND = pygame.transform.scale(BACKGROUND, (SCREEN_WIDHT, SCREEN_HEIGHT))
BEGIN_IMAGE = pygame.image.load('assets/sprites/message.png').convert_alpha()

# Load Sounds
try:
    suiii_sfx = pygame.mixer.Sound(suiii_sound)
    sound_enabled = True
except pygame.error:
    print(f"Warning: {suiii_sound} not found. Suiii sound disabled.")
    suiii_sfx = None
    sound_enabled = False


bird_group = pygame.sprite.Group()
bird = Bird()
bird_group.add(bird)

ground_group = pygame.sprite.Group()

for i in range (2):
    ground = Ground(GROUND_WIDHT * i)
    ground_group.add(ground)

pipe_group = pygame.sprite.Group()
for i in range (2):
    pipes = get_random_pipes(SCREEN_WIDHT * i + 800)
    pipe_group.add(pipes[0])
    pipe_group.add(pipes[1])


clock = pygame.time.Clock()

# --- START SCREEN LOOP (RESTORED) ---
begin = True
while begin:

    clock.tick(15)

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()
        if event.type == KEYDOWN:
            if event.key == K_SPACE or event.key == K_UP:
                bird.bump()
                pygame.mixer.music.load(wing)
                pygame.mixer.music.play()
                begin = False

    screen.blit(BACKGROUND, (0, 0))
    screen.blit(BEGIN_IMAGE, (120, 150)) # RESTORED: Default start message/logo

    if is_off_screen(ground_group.sprites()[0]):
        ground_group.remove(ground_group.sprites()[0])
        new_ground = Ground(GROUND_WIDHT - 20)
        ground_group.add(new_ground)

    bird.begin()
    ground_group.update()

    bird_group.draw(screen)
    ground_group.draw(screen)

    pygame.display.update()

# --- MAIN GAME LOOP ---
running = True
while running:

    clock.tick(60) 

    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()
        if event.type == KEYDOWN:
            if event.key == K_SPACE or event.key == K_UP:
                bird.bump()
                pygame.mixer.music.load(wing)
                pygame.mixer.music.play()

    screen.blit(BACKGROUND, (0, 0))

    # --- Pipe Management and Scoring ---
    
    if is_off_screen(pipe_group.sprites()[0]):
        pipe_group.remove(pipe_group.sprites()[0])
        pipe_group.remove(pipe_group.sprites()[0])

        pipes = get_random_pipes(SCREEN_WIDHT * 2)
        pipe_group.add(pipes[0])
        pipe_group.add(pipes[1])
    
    # --- SCORING LOGIC (Suiii!) ---
    if pipe_group.sprites():
        first_pipe = pipe_group.sprites()[0]
        
        if bird.rect.left > first_pipe.rect.right and first_pipe.id_num not in passed_pipes:
            
            score += 1
            passed_pipes.add(first_pipe.id_num) 
            
            if sound_enabled and suiii_sfx:
                suiii_sfx.play()

            if score >= 5000:
                running = False
                break 

    # Update groups
    bird_group.update()
    ground_group.update()
    pipe_group.update()

    # Draw elements
    bird_group.draw(screen)
    pipe_group.draw(screen)
    ground_group.draw(screen)
    
    display_score(screen, score_font, score) 
    display_credit(screen, credit_font) # ADDED: Display credit during gameplay

    pygame.display.update()

    # --- COLLISION CHECK (Game Over) ---
    if (pygame.sprite.groupcollide(bird_group, ground_group, False, False, pygame.sprite.collide_mask) or
            pygame.sprite.groupcollide(bird_group, pipe_group, False, False, pygame.sprite.collide_mask)):
        
        pygame.mixer.music.load(hit)
        pygame.mixer.music.play()
        running = False 

# --- GAME END SCREEN ---
end_text = ""
if score >= 5000:
    end_text = "CR7 WINS! Score: 5000+"
    text_color = (0, 0, 255) 
else:
    end_text = f"GAME OVER! Score: {score}"
    text_color = (255, 0, 0) 

end_surface = score_font.render(end_text, True, text_color)
end_rect = end_surface.get_rect(center=(SCREEN_WIDHT // 2, SCREEN_HEIGHT // 2))

time.sleep(1)
screen.blit(BACKGROUND, (0, 0)) 
ground_group.draw(screen) 
screen.blit(end_surface, end_rect)
pygame.display.update()

time.sleep(3) 
pygame.quit()
exit()