class View {
  constructor(game, $el) {
    this.setupBoard();
    this.bindEvents();
    this.game = game;
  }

  highlightWinnerTiles() {
    $('li').each((i, el) => {
      let $li = $(el);
      // console.log($li.text());
      if ($li.text() === this.game.currentPlayer) {
        $li.addClass('winner');
        console.log($li.text());
      }
    });
  }

  bindEvents() {
    $('li').on('click', (e) => {
      let $li = $(e.currentTarget);
      this.makeMove($li);
      if (this.game.isOver() === true) {
        console.log(this.game.currentPlayer);
        window.setTimeout(() => {
          alert(`${this.game.currentPlayer} won!`);
        }, 1000);
        this.highlightWinnerTiles();
      }
    });
  }

  makeMove($square) {
    $('.ttt > span').remove();
    $square.addClass('clicked');
    try {
      this.game.playMove([$square.data('row'), $square.data('col')]);
      $square.html(`<h2>${this.game.currentPlayer}</h2>`);
      if (this.game.currentPlayer === 'o') {
        $square.addClass('o');
      } else {
        $square.addClass('x');
      }
    } catch(MoveError) {
      $('.ttt').append($('<span style="color:red;">Invalid Move</span>'));
    }

  }

  setupBoard() {
    let $li = $('li');
    let start = 1;
    $li.each((i, el) => {

      if (i % 3 === 0) {
        start++;
      }
      $(el).data({row: start-2, col: i%3});
    });
  }
}

module.exports = View;
