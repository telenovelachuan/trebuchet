import sys
import curses
from reprint import output
import sched, time
from pynput import keyboard
import gnureadline


scheduler = sched.scheduler(time.time, time.sleep)
map = []
X, Y = 100, 20
snake_pos = [(1, 3), (2, 3), (3, 3), (4, 3)]
LOSE = False
PATTER_BG, PATTERN_SNAKE = "⬜", "⬛"
DIRECTION = "right"
speed = 0.5


class Cell:

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.in_snake = False
        self.head = None

    def display(self):
        if self.in_snake:
            return PATTERN_SNAKE
        return PATTER_BG

    def into_snake(self, head=None):
        self.head = head
        self.in_snake = True

    def leave_snake(self):
        self.head = None
        self.in_snake = False

    def __str__(self):
        return f"({self.x}, {self.y})->({'none' if self.head is None else str(self.x) + ',' + str(self.y)})"


class Snake:

    def __init__(self, pos=None):
        pos = pos or snake_pos
        self.cells = []
        for idx, (_x, _y) in enumerate(pos):
            cell = map[_y][_x]
            _next_cell = None
            if idx < len(pos) - 1:
                _next_x, _next_y = pos[idx + 1]
                _next_cell = map[_next_y][_next_x]
            cell.into_snake(head=_next_cell)
            self.cells.append(cell)

    def move(self, direction):
        last_idx = len(self.cells) - 1
        _x, _y = self.cells[last_idx].x, self.cells[last_idx].y
        next_cell, new_y, new_x = None, None, None
        if direction == "right":
            new_y, new_x = _y, _x + 1
        elif direction == "left":
            new_y, new_x = _y, _x - 1
        elif direction == "up":
            new_y, new_x = _y - 1, _x
        elif direction == "down":
            new_y, new_x = _y + 1, _x
        if new_y < 0 or new_y >= Y or new_x < 0 or new_x >= X:
            lose_game()
            return

        for idx, _cell in enumerate(self.cells):
            if idx == last_idx:
                next_cell = map[new_y][new_x]
                next_cell.into_snake()
                _cell.head = next_cell
            elif idx == 0:
                next_cell = _cell.head
                _cell.leave_snake()
            else:
                next_cell = _cell.head
            self.cells[idx] = next_cell

    def __str__(self):
        return ", ".join([str(_c) for _c in self.cells])


def init_map():
    for i in range(Y):
        _row = []
        for j in range(X):
            _row.append(Cell(j, i))
        map.append(_row)


def _render_row(row_idx):
    h_border = "----------------------------------------------------"
    global output_lines
    if row_idx == 0 or row_idx >= len(map):
        result = h_border
    else:
        _y = row_idx - 1
        if row_idx == len(map) / 2 and LOSE is True:
            result = "|" + PATTER_BG * (X // 2 - 3) + "YOU LOSE!!" + PATTER_BG * (X // 2 - 2) + "|"
        else:
            _row = map[_y]
            result = "|" + "".join([_cell.display() for _cell in _row]) + "|"
    output_lines[row_idx] = result

# import threading
# output_lines = []
# def draw_map():
#     print("\033[F" * (len(map) + 2))
#     with output(output_type='list', no_warning=True) as output_lines:
#         pool = []
#         t0 = threading.Thread(target=_render_row, args=(0,))
#         t0.start()
#         pool.append(t0)
#         for _y in range(len(map)):
#             _t = threading.Thread(target=_render_row, args=(_y,))
#             _t.start()
#             pool.append(_t)
#
#         t_last = threading.Thread(target=_render_row, args=(len(map) + 1,))
#         t_last.start()
#         pool.append(t_last)
#         [t.join() for t in pool]
#
#     if LOSE is True:
#         sys.exit(0)


def draw_map():
    print("\033[F" * (len(map) + 2))
    h_border = "----------------------------------------------------"
    with output(output_type='list', no_warning=True) as output_lines:
        output_lines.append(h_border)
        for _y in range(len(map)):
            if _y == len(map) / 2 and LOSE is True:
                mid_row = "|" + PATTER_BG * (X // 2 - 3) + "YOU LOSE!!" + PATTER_BG * (X // 2 - 2) + "|"
                output_lines.append(mid_row)

            _row = map[_y]
            _row_str = "|" + "".join([_cell.display() for _cell in _row]) + "|"
            #output_lines[f"{_y}"] = _row_str
            output_lines.append(_row_str)
        #output_lines[f"a"] = h_border
        output_lines.append(h_border)

    if LOSE is True:
        sys.exit(0)


init_map()
snake = Snake(snake_pos)
draw_map()


def lose_game():
    global LOSE
    LOSE = True
    for _cell in snake.cells:
        _cell.leave_snake()


def move_snake(sc):
    snake.move(DIRECTION)
    draw_map()
    sc.enter(speed, 1, move_snake, (sc,))


def on_press(key):
    global DIRECTION
    if key == keyboard.Key.up:
        DIRECTION = "up"
    elif key == keyboard.Key.down:
        DIRECTION = "down"
    elif key == keyboard.Key.left:
        DIRECTION = "left"
    elif key == keyboard.Key.right:
        DIRECTION = "right"
    else:
        pass


# with keyboard.Listener(on_press=on_press) as listener:
#     scheduler.enter(speed, 1, move_snake, (scheduler,))
#     scheduler.run()
#     listener.join()
scheduler.enter(speed, 1, move_snake, (scheduler,))
scheduler.run()



# import threading
# class KeyboardThread(threading.Thread):
#
#     def __init__(self, input_cbk = None, name='keyboard-input-thread'):
#         self.input_cbk = input_cbk
#         super(KeyboardThread, self).__init__(name=name)
#         self.start()
#
#     def run(self):
#         #while True:
#             #self.input_cbk(input()) #waits to get input + Return
#         with keyboard.Listener(on_press=on_press) as listener:
#             listener.join()
#
# def my_callback(inp, var):
#     #evaluate the keyboard input
#     print(f'You Entered: {inp}, direction:{var}')
#kthread = KeyboardThread(my_callback)


